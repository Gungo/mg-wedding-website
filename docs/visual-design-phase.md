# Visual Design & Layout Phase

Planning doc for upgrading the M&G wedding site look, structure, and content — while keeping all existing functionality (RSVP backend, admin, easter egg game, device/cookie flow).

**Stack (do not change):** SvelteKit 2 + Svelte 5, custom CSS tokens in `src/app.css`, scoped component styles, static assets in `static/`, Supabase/JSON RSVP storage, Resend email, Vercel deploy.

---

## Goals

1. **Unified look and feel** — consistent typography, colors, spacing, and section styling across the site, informed by a bought template or design pack (not by importing third-party HTML/WordPress code).

2. **Editable wedding content** — names, date, venue, story, photos, schedule, travel, etc. live in one content config so details can be updated without touching component logic.

3. **Personal photos** — couple/trip photos integrated into hero, story, and gallery sections; template supplies structure and decorative assets, not all imagery.

4. **Preserve existing functionality** — RSVP form (`/rsvp`), server actions, device-based edit flow, admin panel, BrickBreaker easter egg, email notifications. Visual changes only unless explicitly scoped.

5. **Site state drives what guests see** — the site is not one static layout. State controls which sections and flows are visible (see Site States below).

6. **Lace border is optional** — `LaceBorder.svelte` remains available for specific images/sections; not required site-wide.

---

## Site States (TBD — define before implementation)

`src/lib/config.js` currently has `SITE_STATE = 'coming_soon' | 'live'` but is **not wired up**. The real model needs at least two phases:

| State | Working name | Guest experience (draft) |
|-------|--------------|--------------------------|
| RSVP phase | `rsvp` | Hero → invitation/envelope CTA → `/rsvp` form. After submit: thank-you + BrickBreaker. **No** info sections (story, schedule, travel, etc.). |
| Full site | `live` | Hero → all enabled info sections → RSVP CTA (envelope or inline) → thank-you/game if submitted. |
| Coming soon | `coming_soon` | TBD — may be a subset of RSVP phase (e.g. hero + “details coming soon”, no form?) or a teaser with no RSVP. **Decide before build.** |

**Open decisions:**
- Exact state names and enum values
- What `coming_soon` shows vs `rsvp` (can RSVP be open during coming soon?)
- Whether section visibility is all-or-nothing per state, or per-section flags (e.g. `sections.story: true`)
- Whether nav appears in any state (TBD)

**Implementation note for agent:** Wire `SITE_STATE` (and any per-section flags) through `+page.server.js` load functions so home page and layout can branch server-side. Avoid hardcoding visibility only in client components.

---

## What to Buy / Gather (before coding)

### 1. Structure blueprint (required)

Buy or pick a **multi-section wedding website template** (Canva/Etsy multi-page, Figma UI kit, or invitation suite with details/accommodations cards). Use it only as a **layout and content map**, not as paste-in code.

From the template, extract:
- [ ] Section list and order
- [ ] Placeholder copy per section (headlines, body text, labels)
- [ ] Typography hierarchy (H1/H2/body/caption sizes and styles)
- [ ] Spacing rhythm (padding between sections, max content width feel)
- [ ] Mobile layout patterns per section

### 2. Visual assets from template pack (required)

Export and save to `static/images/` (organize subfolders: `decor/`, `gallery/`, `main/`):

| Asset | Format | Notes |
|-------|--------|-------|
| Color palette | hex values | Map to `:root` vars in `src/app.css` |
| Font pairing | Google Fonts names | Update `src/app.html` + `--font-body` / `--font-display` |
| Section dividers / florals | PNG or SVG, transparent where needed | Used in shared `Section` wrapper |
| Background textures (optional) | PNG/JPG | Subtle; don't fight readability |
| Favicon / monogram (optional) | SVG preferred | Replace `static/favicon.svg` |
| Hero media | JPG + MP4 | Desktop image ~16:9; mobile looping video if keeping current pattern |
| Envelope / invitation CTA | MP4 or PNG | Must work with absolutely positioned RSVP button in `RsvpEnvelope.svelte` (~`bottom: 22%`) or plan to reposition |

### 3. Your photos (required)

- [ ] Hero candidate(s) — landscape, high-res
- [ ] Story section — 2–4 photos from trips together
- [ ] Gallery — batch of favorites, consistent orientation mix noted
- [ ] Optional: destination/travel photo

Place in `static/images/gallery/` (or paths referenced from content config). Compress for web (target &lt; 500KB per gallery image where possible).

### 4. Wedding copy (required — can start as template placeholders)

- [ ] Both names, wedding date (display + ISO), venue name/address, map link
- [ ] Short intro blurb (“We're getting married…”)
- [ ] Our story paragraphs
- [ ] Schedule / timeline items
- [ ] Travel: hotels, airport, shuttle notes, etc.
- [ ] Dress code, FAQ, registry URL (if applicable)
- [ ] RSVP-related copy (already partially in `RsvpEnvelope` / `rsvp/+page.svelte`)

### 5. Optional / later

- [ ] Lace strip source art (only if using `LaceBorder` on new sections — run through `scripts/process-lace.mjs`)
- [ ] Email notification HTML styling (`src/lib/server/email.js`) to match site look
- [ ] Top nav / sticky bar decision

### What NOT to buy

- WordPress / Wix / Squarespace themes
- ThemeForest HTML templates expecting paste-in integration
- Flattened-only JPEG invitation art with no layers (hard to adapt responsively)

---

## Must-Keep Flows (non-negotiable)

```
/ (home)
  ├─ Hero (admin triple-tap / Cmd+Shift+P)
  ├─ [state-dependent sections]
  ├─ If not submitted + RSVP state/live: RsvpEnvelope → link to /rsvp
  ├─ If submitted: ThankYou + BrickBreaker
  └─ AdminPasswordPrompt (hidden)

/rsvp
  ├─ Form (pre-filled if device cookie has existing RSVP)
  └─ POST → db + email → redirect / + has_submitted cookie

/admin — unchanged
```

---

## Section List (TBD — couple to finalize)

Rank and confirm must-haves before implementation. Candidate sections:

- [ ] Wedding intro (names + date + one-liner)
- [ ] Wedding details (venue, date, map)
- [ ] Our story
- [ ] Photo gallery
- [ ] Schedule / timeline
- [ ] Travel & accommodations
- [ ] Dress code
- [ ] Registry
- [ ] FAQ
- [ ] RSVP CTA (envelope block — already exists)

Each section should be individually enable/disable via config so TBD sections don't block launch.

---

## Architecture Targets (for implementation)

| Piece | Purpose |
|-------|---------|
| `src/lib/content/wedding.js` | Single source of truth: copy, image paths, links, section enable flags |
| `src/lib/config.js` | `SITE_STATE` + any global flags; expand enum per agreed states |
| `src/lib/components/Section.svelte` | Shared wrapper: title, subtitle, spacing, optional divider, optional `LaceBorder` |
| `src/lib/components/sections/*.svelte` | One component per info section; reads from `wedding.js` |
| `src/routes/+page.svelte` | Composes sections based on `SITE_STATE` + `hasSubmitted` |
| `src/routes/+page.server.js` | Pass `siteState`, section config, and existing `hasSubmitted` to page |
| `src/app.css` | Updated design tokens from template palette |

**Layout:** `src/routes/+layout.svelte` keeps `--content-max-width: 720px` and `--margin-vine` unless template blueprint dictates otherwise. Hero may continue full-bleed breakout pattern.

**Page structure:** Single scrollable home page is the default assumption; multi-route pages (`/story`, etc.) only if explicitly decided later.

**Nav:** Deferred TBD. Agent should not add sticky nav unless requested in a follow-up.

---

## Agent Implementation Plan

Run this checklist in order when the couple has gathered assets and confirmed section/state decisions.

### Phase 0 — Confirm inputs

- [ ] Read this doc and `README.md`
- [ ] Confirm final `SITE_STATE` enum and behavior per state (rsvp / live / coming_soon)
- [ ] Confirm must-have section list and which sections show in which state
- [ ] Confirm nav: yes/no
- [ ] Verify assets exist in `static/images/` and copy exists (or placeholders in `wedding.js`)

### Phase 1 — Design tokens

- [ ] Update `src/app.css` `:root` colors from template palette
- [ ] Update `src/app.html` Google Fonts link and `--font-*` variables
- [ ] Swap hero media in `Hero.svelte` if new assets provided
- [ ] Swap envelope/invitation media in `RsvpEnvelope.svelte` if provided; adjust RSVP button position if aspect ratio changed

### Phase 2 — Content config

- [ ] Create `src/lib/content/wedding.js` with all section data, image paths, and `enabled: boolean` per section
- [ ] Expand `src/lib/config.js` with agreed `SITE_STATE` values and document them in README

### Phase 3 — Shared layout primitives

- [ ] Create `Section.svelte` matching template hierarchy (display title, uppercase subtitle, consistent `clamp()` spacing, optional decor image from `static/images/decor/`)
- [ ] Do **not** wrap every section in `LaceBorder` by default; use only where config flag or design specifies

### Phase 4 — Section components

- [ ] Create one Svelte component per confirmed section under `src/lib/components/sections/`
- [ ] Each component imports from `wedding.js`; no hardcoded couple-specific strings
- [ ] Gallery: responsive grid or masonry; lazy-load images
- [ ] Schedule: simple timeline list (time, event, location)
- [ ] Travel: hotels list with links, freeform notes

### Phase 5 — Wire site state on home page

- [ ] Update `+page.server.js` to pass `siteState` and section visibility
- [ ] Refactor `+page.svelte`:
  - Always: `Hero`
  - If state is `live` (or equivalent): render enabled section components in template-defined order
  - If state is `rsvp`: skip info sections; show `RsvpEnvelope` or `ThankYou` + `BrickBreaker` per `hasSubmitted`
  - If state is `coming_soon`: implement agreed teaser behavior
- [ ] Remove unused imports (e.g. `LaceBorder` on `+page.svelte` if not used)

### Phase 6 — RSVP flow check

- [ ] `/rsvp` form unchanged functionally; optionally wrap in `Section` or add background decor for visual consistency
- [ ] Verify POST → cookie → redirect → thank-you + game still works
- [ ] Verify edit flow (`/rsvp` with pre-filled data, "Edit Response" link)

### Phase 7 — Polish & QA

- [ ] Mobile pass on every section (375px–768px)
- [ ] Confirm hero desktop image / mobile video swap at 768px breakpoint
- [ ] Image alt text from `wedding.js`
- [ ] Admin panel and easter egg still reachable
- [ ] `npm run build` passes
- [ ] Update README with `SITE_STATE` usage and how to edit `wedding.js`

### Out of scope (unless explicitly requested)

- Top/sticky navigation
- New backend features
- Replacing BrickBreaker or admin
- Print invitation PDF generation
- Migrating off SvelteKit

---

## Current Codebase Reference

| File | Role |
|------|------|
| `src/routes/+page.svelte` | Home composition (Hero + RSVP branch) |
| `src/routes/+layout.svelte` | Page shell, max-width, vine margins |
| `src/app.css` | Design tokens |
| `src/lib/components/Hero.svelte` | Full-bleed hero image/video |
| `src/lib/components/RsvpEnvelope.svelte` | Invitation CTA + lace (optional) |
| `src/lib/components/LaceBorder.svelte` | CSS-mask lace frame |
| `src/routes/rsvp/+page.svelte` | RSVP form UI |
| `src/routes/rsvp/+page.server.js` | Form action, db, email |
| `src/hooks.server.js` | `device_id` + `has_submitted` cookies |
| `src/lib/config.js` | `SITE_STATE` (unwired) |
| `scripts/process-lace.mjs` | Lace PNG strip pipeline |

---

## Open Questions (couple to answer before agent run)

1. Final site states: names, what each shows, can guests RSVP in `coming_soon`?
2. Must-have sections ranked
3. Single-page scroll vs multiple routes
4. Top nav / sticky bar: yes or no
5. Which bought template (link or screenshots) is the layout blueprint?
6. Keep animated envelope CTA or switch to static invitation card / photo collage?
