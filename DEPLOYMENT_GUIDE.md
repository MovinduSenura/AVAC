# Deploying the AVA website with the new backend

This guide covers everything needed to put the new backend and admin panel live on Vercel at **www.avaconsultants.org**. The Supabase side is already set up and tested, so the work is mostly Vercel settings and DNS.

## What changed

The site now has a backend built on **Supabase** (database, file storage, login, email). There is still no separate server. The React app talks to Supabase directly, and row-level security rules in the database control who can read or change what.

**What the website now does:**

| Feature | Where |
|---|---|
| Application form saves to the database, and emails AVA and the applicant | Home and About Us contact forms (`FourthPart.jsx`, `AboutUsContactInfo.jsx`) |
| Optional passport number and expiry fields on the application form | Same forms |
| Newsletter sign-up with country choices | `SecondPart.jsx`, `Footer.jsx` |
| Blog posts load from the database | `pages/Blog.jsx`, `BlogSecondPart.jsx`, `BlogThirdPart.jsx`, `BlogFourthPart.jsx` |
| Blog comments, which appear after staff approve them | `components/BlogComments.jsx` (new) |
| Testimonials load from the database, and visitors can submit their story | `ThirdPart.jsx` |
| Admin panel at **`/admin`** | `src/admin/` (new) |

The existing designs were not changed, only wired up. Until real blog posts or testimonials are published, the original sample content still shows.

**New files and folders:**

```
frontend/src/lib/            Supabase client and API helpers
frontend/src/admin/          Admin panel (lazy-loaded, so it doesn't slow down the public site)
frontend/vercel.json         Sends every URL to index.html, so /admin/... works on refresh
frontend/.env.example        Template for the environment variables
supabase/schema.sql          Database tables, security rules, storage buckets
supabase/functions/          Two Edge Functions (emails, staff accounts)
supabase/README.md           Supabase setup notes
```

## Already done (no action needed)

- The Supabase project `ava-consultants` (ref `xjmsdlxawyggvbnpznqp`) has been created and `schema.sql` has been run.
- Both Edge Functions are deployed:
  - `send-application-email`: JWT verification **off**, because visitors aren't logged in.
  - `manage-staff`: JWT verification **on**.
- The email secrets (`GMAIL_USER`, `GMAIL_APP_PASSWORD`, `NOTIFY_EMAIL`) are set in Supabase. Emails go out from **info@avaconsultants.org**, which is a Google Workspace mailbox.
- Application emails were tested end to end and work.

You don't need access to the Supabase dashboard for the steps below, except step 6.

---

## Step 1: Merge `dev-oshan` into `main`

Oshan will open a PR from `dev-oshan` to `main`. Once it's merged, Vercel builds from `main` as it does now.

`frontend/.env` is git-ignored on purpose. The real values go into Vercel (step 3), not the repo.

## Step 2: Check the Vercel project settings

Vercel → the AVA project → **Settings → Build and Deployment**:

| Setting | Value |
|---|---|
| Root Directory | `frontend` |
| Framework Preset | Vite |
| Build Command | `npm run build` (default) |
| Output Directory | `dist` (default) |
| Install Command | `npm install` (default) |

The Root Directory must be `frontend`. That's where `package.json` and `vercel.json` are. If it's set to the repo root, `vercel.json` is ignored and `/admin` pages return 404 when refreshed.

## Step 3: Add the environment variables

Vite builds these into the JavaScript **at build time**. If they're missing during the build, the public site still loads with sample content, but forms don't save and `/admin` shows "Supabase is not configured".

**Values:**

| Key | Value |
|---|---|
| `VITE_SUPABASE_URL` | `https://xjmsdlxawyggvbnpznqp.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `sb_publishable_EVjK2wCEIkmCl_LzZqq0rw_rCSYAW9Q` |

The key above is Supabase's **publishable** key. It's designed to be public, since it ends up in the browser anyway, and the database security rules protect the data. **Never** put the `service_role` or secret key in Vercel or the frontend.

**How to add them:**

1. Vercel → project → **Settings → Environment Variables**.
2. Click **Add New**.
3. **Key:** `VITE_SUPABASE_URL`, **Value:** the URL above.
4. **Environments:** tick **Production** and **Preview**. Also tick **Development** if you use `vercel dev`.
5. Click **Save**.
6. Repeat for `VITE_SUPABASE_ANON_KEY`.
7. **Redeploy.** Changing variables doesn't rebuild existing deployments. Go to **Deployments** → latest Production deployment → **⋯** → **Redeploy**.

The names must be exact, including the `VITE_` prefix. Vite only exposes variables that start with `VITE_`.

**For local development:**

```bash
cd frontend
cp .env.example .env     # then put the two values above into .env
npm install
npm run dev
```

## Step 4: Check the deployment

On the Vercel URL (`*.vercel.app`), before the domain is connected:

- [ ] The home page loads, and the blog and testimonial sections show content.
- [ ] `/admin` shows the **login page**, not "Supabase is not configured".
- [ ] Open `/admin/applications` directly and press **refresh**. It must not show a Vercel 404. This is what `vercel.json` fixes.
- [ ] Submit the contact form with your own email. You should see "Thank you! Your message has been sent". Within about a minute you should get a "We received your application" email, and info@avaconsultants.org should get "New application: …".
- [ ] Ask Oshan to delete your test application in the admin panel afterwards.

## Step 5: Connect www.avaconsultants.org

### 5a. Add the domain in Vercel

1. Vercel → project → **Settings → Domains**.
2. Add `www.avaconsultants.org`. This is the main domain.
3. Add `avaconsultants.org` and choose **Redirect to www.avaconsultants.org** (308).
4. Vercel then shows the DNS records each domain needs. Keep that page open.

### 5b. Add the DNS records

The domain's DNS is on Google's name servers (`ns-cloud-b1…b4.googledomains.com`). That's probably **Squarespace Domains**, where old Google Domains accounts were moved, or **Google Cloud DNS**. The client has the login. Ask them for access, or do it together.

Add the records **exactly as Vercel shows them**. They usually look like this:

| Type | Name / Host | Value |
|---|---|---|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

> ⚠️ **Do not delete or change the existing MX or TXT records.** They run the info@avaconsultants.org Google Workspace email (MX → `aspmx.l.google.com` etc., TXT → `v=spf1 include:_spf.google.com ~all`). If they're removed, the client's email **and** the website's application emails stop working. Only **add** the two records above. If an old A or CNAME record already exists for `@` or `www` and points somewhere else, replace just that one.

### 5c. Wait for it to go green

- Vercel → Domains shows **Valid Configuration** once DNS has updated. This usually takes a few minutes, and can take up to 24–48 hours.
- HTTPS certificates are issued automatically.
- Then repeat the checks from step 4 on `https://www.avaconsultants.org`.

## Step 6: Update the Supabase Site URL

Supabase dashboard → **Authentication → URL Configuration**:

- **Site URL:** `https://www.avaconsultants.org`
- **Redirect URLs:** add `https://www.avaconsultants.org/**`, and `http://localhost:5173/**` for local development.

Oshan can do this if you don't have Supabase access.

---

## Troubleshooting

| What you see | Cause and fix |
|---|---|
| `/admin` says "Supabase is not configured" | The env vars were missing at build time. Check step 3 (exact names, Production ticked), then **Redeploy**. |
| Forms say "Thank you", but nothing appears in the admin panel | Same as above, or the Supabase project is paused (see below). |
| Vercel 404 when refreshing `/admin/...` or `/blog/...` | `vercel.json` isn't being used. Check that Root Directory is `frontend` (step 2). |
| Whole site down, and the Supabase dashboard says "Project is paused" / "inactive" | The Supabase Free plan pauses after 7 days with no activity. Dashboard → project → **Restore project**, then wait a few minutes. This is fixed for good by upgrading to Pro. |
| Blank white page on `localhost` in **Brave**, with console error `ERR_BLOCKED_BY_CLIENT` on `PrivacyPolicy.jsx` | Brave Shields blocks file names containing "privacy". Turn Shields off for localhost. Production isn't affected, because the file is bundled. |
| Application saved but no emails | Supabase → Edge Functions → `send-application-email` → **Logs**. "Invalid login" means the Gmail app password changed. Oshan can update the `GMAIL_APP_PASSWORD` secret. |
| `npx supabase …` fails with `spawn UNKNOWN` on Windows | Windows Smart App Control blocks the unsigned Supabase CLI. Deploy functions from the Supabase dashboard instead (Edge Functions → Deploy a new function → Via Editor). **Type the function name in the name box before deploying.** Otherwise it gets a random URL like `quick-processor`, and renaming later only changes the label. |

## Lint note

`npm run lint` currently reports 3 errors in `NavBar.jsx` (setState inside an effect) and `AboutUs.jsx` (two unused imports). They come from earlier commits, not from this work. Vercel doesn't run lint, so they don't block the deploy, but they're worth cleaning up.

## Plans and costs

We're starting on free plans and will upgrade later:

| Service | Now | Later | Why upgrade |
|---|---|---|---|
| Vercel | Hobby (free) | Pro, about $20/month | Hobby is for non-commercial use only. Upgrade from Settings → Billing, with no redeploy or downtime. |
| Supabase | Free | Pro, about $25/month | The Free plan pauses after 7 quiet days, which takes the site down, and has no backups. Upgrade this one first. |

Before handover, both projects should be in accounts **the client owns**, so the bills and ownership are theirs. Vercel: Project → Settings → General → **Transfer Project**. Supabase: invite the client to the organization as Owner.

## Questions

Ask Oshan for anything to do with Supabase, the admin panel or the emails. Database setup details are in [`supabase/README.md`](supabase/README.md), and the client-facing guide is `AVA_Admin_Panel_User_Manual.docx`.
