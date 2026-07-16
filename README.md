# Polyrhythm - Community Drum Events Platform

A front-end-only React app for a **user-maintained directory of drum events** (circles, festivals, workshops, jams). It combines a *simulated scraping feed* with *user-generated content* governed by a Wikipedia-style trust model, community verification, reputation tiers, and auto-expiration.

> Everything runs on seeded dummy data persisted to `localStorage`. There is **no backend and no external API** - auth and data are fake, for demo purposes only.

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS** (custom dark theme)
- **React Router** for routing
- React Context for state (`DataContext`, `AuthContext`, `ToastContext`)

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (default http://localhost:5173).

Other scripts:

```bash
npm run build     # type-check + production build
npm run preview   # preview the production build
npm run lint      # type-check only
```

## Demo accounts

Use the one-click buttons on the login page, or these credentials:

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@polyrhythm.test` | `admin123` |
| Moderator | `mod@polyrhythm.test` | `mod123` |
| Trusted | `trusted@polyrhythm.test` | `trusted123` |
| Newcomer | `new@polyrhythm.test` | `new123` |

New signups start as **Newcomers**. Reach **100 reputation** to become a **Trusted Contributor** automatically.

## How accuracy is maintained (the "smart hybrid")

- **Organizers** create and maintain their own listings.
- **Community** suggests edits and confirms recurring events.
- **Automation** scrapes new candidates and flags stale events for renewal.

### 1. Wikipedia-style edits
Anyone can add or edit an event. Trusted users' edits go **live instantly**; newcomers' edits enter an **approval queue** (visible in the moderator dashboard) until they build a track record. Every change is logged in the event's edit history with a readable diff.

### 2. Community verification
On each event, logged-in users can report: **It happened**, **Still recurring**, **Time changed**, or **Canceled**. When **3 distinct users** agree on the same signal, the listing updates itself:
- 3x *Canceled* -> status becomes `canceled`
- 3x *Still recurring* -> expiry renewed
- 3x *It happened* -> status becomes `verified`
- 3x *Time changed* -> flagged `unverified` pending an edit

### 3. Reputation system
Points are earned for adding events (+10), approved edits (+5), verifications (+2), renewals (+4), and importing scraped events (+6). Reputation unlocks privileges (instant edits at Trusted tier).

### 4. Auto-expiration
Every event has an expiry. On load, events past expiry flip to `expired`/unverified (never deleted). Recurring events nearing expiry show a **"Still happening?"** renewal prompt to the organizer/trusted users, and stale listings surface in the moderator dashboard.

### 5. Simulated scraping
The **Scrape feed** page has a "Run scrape" button that generates mock candidates with a match-confidence score. Moderators review and **import** them (as `unverified`) or **dismiss** them.

## Project structure

```
src/
  components/
    event/        EventCard, EventForm, VerificationPanel, RevisionList, StatusBadge, SourceBadge
    layout/       Navbar, Footer, Layout
    ui/           Button, Input, Select, Modal, Tag, EmptyState, Avatar, Icon
    ProtectedRoute.tsx, RoleGate.tsx, RoleChip.tsx
  context/        DataContext, AuthContext, ToastContext
  data/           seed.ts (dummy users, events, scraped items)
  lib/            storage, reputation, verification, expiration, format
  pages/          Home, Browse, EventDetail, EventNew, EventEdit,
                  Login, Signup, Profile, Dashboard, Import, NotFound
  types.ts
```

## Notes

- All authentication is fake (plaintext passwords in seed data) and exists only to demonstrate role-based behavior.
- Use **Reset demo data** in the footer to restore the original seed state at any time.
