# M&G Wedding Website

## Tech Stack

- **Framework**: SvelteKit 2 + Svelte 5
- **Database**: Supabase (Postgres) — falls back to local JSON file in dev
- **Email**: Resend (production only)
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

| Variable | Description | Required locally? |
|---|---|---|
| `ADMIN_PASSWORD` | Password for the admin panel | Yes |
| `SUPABASE_URL` | Supabase project URL | No — falls back to local JSON |
| `SUPABASE_SERVICE_KEY` | Supabase service role key (secret) | No — falls back to local JSON |
| `RESEND_API_KEY` | Resend API key for email notifications | No — skipped in dev |

Everything works locally without Supabase or Resend configured. RSVP data saves to `data/rsvps.json` and emails are skipped.

## Run

```bash
npm run dev
```

## Admin Panel

- **Desktop**: Press `Cmd+Shift+P` (or `Ctrl+Shift+P`)
- **Mobile**: Tap the hero image 3 times

Enter the admin password to access the guest list and manage notification emails.

## Deploy

Pushes to `main` auto-deploy to Vercel. Set all env vars in **Vercel → Settings → Environment Variables**.
