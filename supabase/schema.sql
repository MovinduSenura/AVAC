-- AVA Consultants: Supabase schema
-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- It is safe to re-run: every object is created with "if not exists" / "or replace".

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Staff profiles (admin panel users)
-- A row here is what makes a Supabase Auth user a member of staff.
-- Rows are created by the manage-staff Edge Function (or by hand for the
-- first admin), never by public sign-up.
-- ---------------------------------------------------------------------------

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text not null default '',
  role text not null default 'staff' check (role in ('admin', 'staff')),
  created_at timestamptz not null default now()
);

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.profiles where id = (select auth.uid()));
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
revoke all on public.profiles from anon;

drop policy if exists "Staff can read profiles" on public.profiles;
create policy "Staff can read profiles" on public.profiles
  for select to authenticated using (public.is_staff());

drop policy if exists "Admins can update profiles" on public.profiles;
create policy "Admins can update profiles" on public.profiles
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Job applications (Home + About Us contact form)
-- ---------------------------------------------------------------------------

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 1 and 150),
  email text not null check (
    char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  ),
  phone text not null check (char_length(phone) between 5 and 30),
  address text check (char_length(address) <= 500),
  message text check (char_length(message) <= 5000),
  passport_number text check (char_length(passport_number) <= 30),
  passport_expiry date,
  source_page text check (char_length(source_page) <= 50),
  status text not null default 'new'
    check (status in ('new', 'contacted', 'rejected', 'selected')),
  notes text,
  emails_sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists applications_created_at_idx on public.applications (created_at desc);
create index if not exists applications_status_idx on public.applications (status);

drop trigger if exists applications_updated_at on public.applications;
create trigger applications_updated_at before update on public.applications
  for each row execute function public.set_updated_at();

alter table public.applications enable row level security;

-- Visitors may only insert, and only into the form's own columns
-- (status, notes and emails_sent_at always start at their defaults).
revoke all on public.applications from anon;
grant insert (
  id, full_name, email, phone, address, message,
  passport_number, passport_expiry, source_page
) on public.applications to anon;

drop policy if exists "Public can submit applications" on public.applications;
create policy "Public can submit applications" on public.applications
  for insert to anon with check (true);

drop policy if exists "Staff can submit applications" on public.applications;
create policy "Staff can submit applications" on public.applications
  for insert to authenticated with check (public.is_staff());

drop policy if exists "Staff can read applications" on public.applications;
create policy "Staff can read applications" on public.applications
  for select to authenticated using (public.is_staff());

drop policy if exists "Staff can update applications" on public.applications;
create policy "Staff can update applications" on public.applications
  for update to authenticated using (public.is_staff()) with check (public.is_staff());

drop policy if exists "Admins can delete applications" on public.applications;
create policy "Admins can delete applications" on public.applications
  for delete to authenticated using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Subscribers (footer newsletter + "Are You Ready To Fly?" countries form)
-- One row per email. Visitors write through the subscribe() function only.
-- ---------------------------------------------------------------------------

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  preferred_countries text[] not null default '{}',
  sources text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists subscribers_updated_at on public.subscribers;
create trigger subscribers_updated_at before update on public.subscribers
  for each row execute function public.set_updated_at();

alter table public.subscribers enable row level security;
revoke all on public.subscribers from anon;

drop policy if exists "Staff can read subscribers" on public.subscribers;
create policy "Staff can read subscribers" on public.subscribers
  for select to authenticated using (public.is_staff());

drop policy if exists "Admins can delete subscribers" on public.subscribers;
create policy "Admins can delete subscribers" on public.subscribers
  for delete to authenticated using (public.is_admin());

create or replace function public.subscribe(
  p_email text,
  p_countries text[] default '{}',
  p_source text default 'newsletter'
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_email text := lower(trim(p_email));
  v_countries text[] := coalesce(p_countries, '{}');
begin
  if v_email is null
    or char_length(v_email) > 254
    or v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'Invalid email address' using errcode = '22023';
  end if;

  if p_source not in ('newsletter', 'preferred_countries') then
    raise exception 'Invalid source' using errcode = '22023';
  end if;

  -- Keep in sync with the country list in frontend/src/components/SecondPart.jsx
  if cardinality(v_countries) > 2
    or not v_countries <@ array[
      'Poland', 'Latvia', 'Lithuania', 'Czech Republic',
      'Slovakia', 'Slovenia', 'Hungary', 'Serbia'
    ] then
    raise exception 'Invalid countries' using errcode = '22023';
  end if;

  insert into public.subscribers as s (email, preferred_countries, sources)
  values (v_email, v_countries, array[p_source])
  on conflict (email) do update set
    preferred_countries = case
      when cardinality(excluded.preferred_countries) > 0 then excluded.preferred_countries
      else s.preferred_countries
    end,
    sources = array(select distinct unnest(s.sources || excluded.sources));
end;
$$;

revoke execute on function public.subscribe(text, text[], text) from public;
grant execute on function public.subscribe(text, text[], text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Testimonials (Blog "Share your testimonial" form + admin)
-- Public submissions start as 'pending' and appear after approval.
-- ---------------------------------------------------------------------------

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  role text not null check (char_length(role) between 1 and 120),
  story text not null check (char_length(story) between 1 and 3000),
  photo_url text check (char_length(photo_url) <= 1000),
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists testimonials_status_idx on public.testimonials (status, created_at desc);

drop trigger if exists testimonials_updated_at on public.testimonials;
create trigger testimonials_updated_at before update on public.testimonials
  for each row execute function public.set_updated_at();

alter table public.testimonials enable row level security;

revoke all on public.testimonials from anon;
grant insert (name, role, story, photo_url) on public.testimonials to anon;

drop policy if exists "Public can submit testimonials" on public.testimonials;
create policy "Public can submit testimonials" on public.testimonials
  for insert to anon with check (true);

drop policy if exists "Staff can manage testimonials" on public.testimonials;
create policy "Staff can manage testimonials" on public.testimonials
  for all to authenticated using (public.is_staff()) with check (public.is_staff());

-- ---------------------------------------------------------------------------
-- Blog posts
-- ---------------------------------------------------------------------------

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 200),
  content text not null default '',
  cover_image_url text,
  category text,
  tags text[] not null default '{}',
  author_name text not null default 'admin',
  is_popular boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_status_idx on public.blog_posts (status, published_at desc);

drop trigger if exists blog_posts_updated_at on public.blog_posts;
create trigger blog_posts_updated_at before update on public.blog_posts
  for each row execute function public.set_updated_at();

alter table public.blog_posts enable row level security;
revoke all on public.blog_posts from anon;

drop policy if exists "Staff can manage blog posts" on public.blog_posts;
create policy "Staff can manage blog posts" on public.blog_posts
  for all to authenticated using (public.is_staff()) with check (public.is_staff());

-- ---------------------------------------------------------------------------
-- Blog comments (approved by staff before they appear)
-- ---------------------------------------------------------------------------

create table if not exists public.blog_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.blog_posts (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (
    char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  ),
  comment text not null check (char_length(comment) between 1 and 2000),
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create index if not exists blog_comments_post_idx on public.blog_comments (post_id, status);

create or replace function public.is_published_post(p_post_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.blog_posts where id = p_post_id and status = 'published'
  );
$$;

alter table public.blog_comments enable row level security;

revoke all on public.blog_comments from anon;
grant insert (post_id, name, email, comment) on public.blog_comments to anon;

drop policy if exists "Public can comment on published posts" on public.blog_comments;
create policy "Public can comment on published posts" on public.blog_comments
  for insert to anon with check (public.is_published_post(post_id));

drop policy if exists "Staff can manage comments" on public.blog_comments;
create policy "Staff can manage comments" on public.blog_comments
  for all to authenticated using (public.is_staff()) with check (public.is_staff());

-- ---------------------------------------------------------------------------
-- Public read-only views used by the website.
-- They expose only approved / published rows and never private columns
-- (e.g. commenter emails), for both visitors and logged-in staff.
-- ---------------------------------------------------------------------------

create or replace view public.published_posts as
  select id, title, content, cover_image_url, category, tags,
         author_name, is_popular, published_at
  from public.blog_posts
  where status = 'published';

create or replace view public.approved_testimonials as
  select id, name, role, story, photo_url, created_at
  from public.testimonials
  where status = 'approved';

create or replace view public.approved_comments as
  select c.id, c.post_id, c.name, c.comment, c.created_at
  from public.blog_comments c
  join public.blog_posts p on p.id = c.post_id
  where c.status = 'approved' and p.status = 'published';

grant select on public.published_posts, public.approved_testimonials, public.approved_comments
  to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Storage buckets (public read; uploads restricted below)
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('testimonial-photos', 'testimonial-photos', true, 2097152,
    array['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('blog-images', 'blog-images', true, 5242880,
    array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do nothing;

drop policy if exists "Public can upload testimonial photos" on storage.objects;
create policy "Public can upload testimonial photos" on storage.objects
  for insert to anon, authenticated
  with check (
    bucket_id = 'testimonial-photos'
    and (storage.foldername(name))[1] = 'submissions'
  );

drop policy if exists "Staff can manage website images" on storage.objects;
create policy "Staff can manage website images" on storage.objects
  for all to authenticated
  using (bucket_id in ('testimonial-photos', 'blog-images') and public.is_staff())
  with check (bucket_id in ('testimonial-photos', 'blog-images') and public.is_staff());
