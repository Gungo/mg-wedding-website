# M&G Wedding Website

## Tech Stack

- **Framework**: SvelteKit 2 + Svelte 5
- **Database**: Supabase (Postgres) — falls back to local JSON file if no Supabase vars set
- **Hosting**: Vercel (auto-deploys from `main`)
- **Node**: 20.x

## Local Setup

```bash
npm install
```

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `ADMIN_PASSWORD` | Password for the admin panel |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_KEY` | Supabase service role key (secret) |

Without the Supabase vars, RSVP data saves to a local `data/rsvps.json` file instead.

## Run

```bash
npm run dev
```

## Admin Panel

Press `Cmd+Shift+P` (or `Ctrl+Shift+P`) on the home page to open the admin login.

## Deploy

Pushes to `main` auto-deploy to Vercel. Make sure the same env vars are set in **Vercel → Settings → Environment Variables**.
