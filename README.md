# Explore Together

A mobile-first travel planning app built with Next.js App Router, React, TypeScript, Tailwind CSS, and Supabase. Deployable on Netlify.

## Local development

Use Node.js 24 and npm. From the repository root:

```sh
npm ci
cp .env.example .env.local
npm run dev
```

The initial app runs without Supabase in a clearly labeled sample mode. No real account, saved trip, or upload is simulated. The homepage, destination guides, sample itinerary and budget, and community roadmap are available immediately.

## Connect Supabase

1. Create a Supabase project. Copy its project URL and **publishable** key into `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `.env.local`. Never put a service-role/secret key in a public variable.
2. Apply `supabase/migrations/202610260001_initial.sql` once using the SQL editor or the Supabase CLI migration workflow. It creates owner-protected trips and a private photo bucket with owner-folder policies.
3. Enable email authentication. Set Site URL to your app origin and allow `/auth/confirm` on your local and deployed origins in Authentication → URL Configuration. The default magic-link email template supports the PKCE redirect flow used here.
4. Restart the development server. Request a sign-in link, follow it in the same browser, then create a trip. Browser storage preserves the session. Database row-level security enforces ownership; the public key is intentionally browser-safe.

Photo storage is provisioned; upload UI is a later increment. Do not disable RLS. Before production, verify isolation with two distinct accounts and confirm one account cannot access the other's trip rows or photo paths. Authentication, database, and storage integration checks require a real Supabase project and are not covered by the offline build.

## Current scope

- Responsive home, destination list and detail pages, sample trip/budget, and explicit community roadmap.
- Email-link authentication and authenticated trip creation and saved-trip listing through Supabase.
- Saved trip detail management, detailed itinerary editing, budget expense tracking, hotels, restaurants, activities, local guide profiles, social connections, and invitations are subsequent increments.
- External map/provider links only. No payments, direct reservations, or booking transactions.

## Validation

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

No automated behavior test suite is included yet. Build and type checks do not establish live Supabase readiness.

## Netlify

Import this GitHub repository into Netlify. `netlify.toml` sets the build command and output; Netlify provides its Next.js adapter. Add both public Supabase variables in Netlify before building, then configure the deployed origin and `/auth/confirm` in Supabase. Public variables are embedded at build time, so redeploy after changing them. Keep `.env.local` out of Git. No static-export configuration is used.

## Project map

- `src/app`: routes, layouts, and forms
- `src/components`: shared destination cards
- `src/lib`: Supabase browser client and sample content
- `supabase/migrations`: database and private storage policies

## GitHub

Review changes, then create your initial commit and push the branch to GitHub. No commits or pushes are performed automatically. Use a pull request when adding later feature increments.
