# Supabase setup

The website has no separate backend server. The React app talks to Supabase directly, and access is controlled by row-level security in [`schema.sql`](schema.sql). Two Edge Functions handle the work that can't run in the browser.

| Piece | What it does |
|---|---|
| `schema.sql` | Tables, security rules, public read-only views, storage buckets |
| `functions/send-application-email` | Emails new applications to AVA and sends the applicant a thank-you email (Gmail SMTP) |
| `functions/manage-staff` | Lets admins add or remove staff and reset passwords from the admin panel |

## 1. Create the project

1. Create a project at [supabase.com](https://supabase.com) (the Free plan is fine to start).
2. **SQL Editor → New query**: paste all of `schema.sql` and click **Run**. It's safe to run again after changes.
3. **Authentication → Sign In / Providers**: turn **off** "Allow new users to sign up". Staff accounts are only created from the admin panel.

## 2. Connect the frontend

```bash
cd frontend
cp .env.example .env
```

Fill in both values from **Project Settings → API**: the Project URL, and the `anon` / publishable key. Restart `npm run dev` after editing `.env`. On the hosting provider, add the same two variables to the build environment.

## 3. Create the first admin

1. **Authentication → Users → Add user**: enter an email and password, and tick "Auto Confirm User".
2. In the **SQL Editor**, run (with that email):

```sql
insert into public.profiles (id, email, full_name, role)
select id, email, 'Your Name', 'admin' from auth.users where email = 'admin@example.com';
```

3. Sign in at `/admin`. From then on, add other staff on the **Staff** page.

Roles:

- **Admin**: everything, including deleting applications and subscribers, and managing staff.
- **Staff**: view applications and change their status, manage blog posts, comments and testimonials, view subscribers.

## 4. Emails (Gmail SMTP, free)

On the Gmail account that sends the emails (currently `ashaallang@gmail.com`):

1. Turn on **2-Step Verification** (Google Account → Security).
2. Create an **App Password** (Google Account → Security → App passwords). This gives a 16-character password.

Then deploy the functions with the [Supabase CLI](https://supabase.com/docs/guides/cli), from the project root:

```bash
npx supabase login
npx supabase link --project-ref <your-project-ref>

npx supabase secrets set GMAIL_USER=ashaallang@gmail.com GMAIL_APP_PASSWORD=<16-char app password>
# Optional: who receives new-application emails (comma-separated). Defaults to GMAIL_USER.
npx supabase secrets set NOTIFY_EMAIL=ashaallang@gmail.com

npx supabase functions deploy send-application-email --no-verify-jwt
npx supabase functions deploy manage-staff
```

`send-application-email` must be deployed with `--no-verify-jwt` because website visitors aren't logged in. It protects itself instead: each application can trigger emails only once, and only within 15 minutes of being submitted.

Gmail allows about 500 emails a day. If the business outgrows that, switch the function to a sending service such as Resend (this needs DNS access for avaconsultants.org).

## Notes

- **Sample content:** until real data exists, the Blog posts and testimonials keep showing the design's sample content. It disappears automatically once at least one post is published, or one testimonial is approved, in the admin panel.
- **Free plan pausing:** Free projects pause after 1 week with no activity. Upgrade to Pro (about $25/month) before going live.
- **Country list:** the list in `subscribe()` (in `schema.sql`) must match `countryGroups` in `frontend/src/components/SecondPart.jsx`.
