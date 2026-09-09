# LaunchPad Waitlist

A minimal SaaS waitlist landing page. Visitors enter their email,
it's saved server-side, and they see how many people are on the list.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 — you should see the landing page.
Submit an email and it gets saved to a temp JSON file on the server.

## Deploy to Vercel

1. Push this folder to a new GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/waitlist-app.git
   git branch -M main
   git push -u origin main
   ```
2. Go to https://vercel.com → "Add New" → "Project"
3. Import the GitHub repo you just pushed
4. Leave the default settings (Vercel auto-detects Next.js) → click "Deploy"
5. Wait ~1 minute — you'll get a live URL like `waitlist-app.vercel.app`

## Going to production (important)

This demo saves emails to a temporary file (`/tmp/waitlist.json`), which
works locally but gets wiped between requests on Vercel's servers. Before
a real launch, swap the `readEmails`/`writeEmails` functions in
`app/api/waitlist/route.js` for a real database, e.g.:

- **Vercel Postgres** or **Supabase** (free tiers available) — swap the
  file read/write for SQL insert/select
- **Vercel KV** (Redis) — good for simple key-value data like this

## How it's structured

- `app/page.js` — the landing page UI (React component)
- `app/api/waitlist/route.js` — the backend API endpoint that saves emails
- `app/layout.js` — required wrapper Next.js uses for every page
- `package.json` — lists the dependencies needed to run the app

## Debugging tips

- Frontend not updating? Check the browser console (F12 → Console tab)
  for JS errors.
- Form submits but nothing happens? Check the Network tab — click the
  `/api/waitlist` request to see its response and status code.
- Deployed but broken on Vercel? Vercel → your project → "Deployments" →
  click the deployment → "Functions" tab shows server-side logs/errors.
