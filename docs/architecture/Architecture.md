# Architecture

## Overview

PIZZEria is a Next.js 16 (App Router) site rendered as static pages at
build time. There is no authentication layer and no server session —
every page is public and stateless.

```text
┌─────────────────────────────┐
│  Next.js App Router (src/)  │
│  ┌─────────┐  ┌───────────┐ │
│  │  pages  │→│ components │ │
│  └────┬────┘  └───────────┘ │
│       │                     │
│       ▼                     │
│  src/lib/get-menu.ts        │
│       │                     │
│       ├── Turso configured? ──yes──▶ src/db (Drizzle + libsql)
│       └── no ───────────────────────▶ src/lib/menu-data.ts (static)
└─────────────────────────────┘
```

## Rendering strategy

All routes (`/`, `/menu`, `/about`, `/contact`, `/credits`) are
statically generated at build time. The menu is fetched server-side in
a React Server Component (`getMenu()`), so no client-side loading
state is needed for menu data — only category-tab switching happens
client-side, on data already in the page.

## Data layer

`src/lib/menu-data.ts` is the single source of truth for menu content.
It is:

- Served directly when no Turso database is configured (the default —
  see [Database.md](Database.md)).
- Written to Turso by `scripts/seed.ts` when a database **is**
  configured, after which `getMenu()` reads from Turso instead.

This means the site is fully functional with zero backend
configuration, and gains a real database only when one is deliberately
added.

## Animation layer

- **GSAP** drives the hero's cursor-follow spotlight and the floating
  topping icons (`src/components/hero.tsx`).
- **Framer Motion** drives section-level "metal shutter" reveals
  (`src/components/shutter-reveal.tsx`), the mobile nav drawer, and
  menu-tab transitions.
- All motion respects `prefers-reduced-motion` (disabled at the CSS
  level in `globals.css`, and the GSAP float loop is skipped entirely
  when the media query matches).

## No authentication / no authorization

There are no user accounts, sessions, or admin roles in this build.
The order form (`/contact`) opens a pre-filled `mailto:` link — no
data is transmitted to or stored by the app.

## Directory map

| Path                 | Purpose                                   |
| --------------------- | ------------------------------------------ |
| `src/app`              | Routes (App Router)                        |
| `src/components`       | Shared UI components                       |
| `src/lib`               | Static data + data-access helpers          |
| `src/db`                | Drizzle schema + Turso client              |
| `scripts`               | One-off scripts (DB seeding)                |
| `docs`                  | This documentation                          |
| `assets`                | Source design assets, not shipped to `public` |
