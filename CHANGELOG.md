# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.0.0] - 2026-07-31

### Added

- Password-gated admin panel (`/admin`) to add/edit/delete categories
  and menu items, live against the Turso database (`ADMIN_PASSWORD`
  env var; see `docs/api/API.md` for the `/api/admin/*` routes and
  `docs/architecture/Architecture.md` for the auth model).
- "Admin" login entry in the header — desktop (subtle, next to the
  cart icon) and in the mobile hamburger menu, kept visually separate
  from customer-facing nav.
- Illustrated category icon on every menu card (matches the `/gallery`
  motif), not just in the gallery.
- GSAP-driven category marquee on the homepage, linking into `/menu`
  pre-filtered to that category (`/menu?cat=<slug>`).
- Restructured footer: brand column, Explore/Visit link columns, and
  the active location's address/hours/phone.

### Changed

- `/menu` now reads a `?cat=` query param to open on a specific
  category (used by the new homepage marquee).

### Documentation

- `docs/api/API.md` now documents the `/api/admin/*` routes (previously
  said the site had no API routes at all).

### Breaking changes

None for site visitors or existing deployments — everything above is
additive. Tagged v5.0.0 rather than v4.1.0 because the admin panel
turns the database from a passive read-only source into something the
project actively edits through, which is a bigger step than a typical
minor release.

## [4.0.0] - 2026-07-31

### Added

- `/locations` — multiple locations with address, phone, and hours;
  visitors can set an active location, persisted in `localStorage`.
- Footer now shows the active location's name, address, and hours
  instead of one hardcoded set.

### Changed

- `CartDrawer` and `ToppingPicker` are now `next/dynamic` imports with
  `ssr: false`, loaded only once a visitor actually opens the cart or
  the pizza topping picker, rather than being part of every page's
  initial JS.

### Breaking changes

None.

## [3.0.0] - 2026-07-31

### Added

- `/reserve` — table reservation request form (name, date, time,
  party size, notes), sent via `mailto:` like the order flow.
- `/gallery` — every menu item across all six categories, illustrated
  (real photography not shot yet — see `assets/README.md`).

### Changed

- Header nav's Reserve and Gallery links are now live.

## [2.0.0] - 2026-07-31

### Added

- Order builder: "Add to Order" on every menu item, with a topping
  picker (10 add-ons, priced individually) for pizza specifically.
- Persistent cart (localStorage-backed) with a slide-in cart drawer,
  quantity controls, and line removal.
- `/checkout` — reviews the cart and total, then sends the itemized
  order via a pre-filled `mailto:` link. No payment is collected or
  processed anywhere in this flow.
- PIZZEria wordmark logo (`assets/brand/logo.svg`) in the README.

### Changed

- Site nav now includes Gallery, Reserve, and Locations entries ahead
  of those pages shipping in v3.0.0 / v4.0.0.
- `docker/Dockerfile` rebuilt around Next's standalone output on a
  glibc base image (was alpine + full `node_modules` copy).

### Fixed

- CI security audit: production dependency tree is now clean; noisy,
  non-shippable ESLint-toolchain advisories are surfaced as
  advisory-only instead of blocking (see `SECURITY.md`).
- CI Docker build: added `.dockerignore` so the build context no
  longer drags in `.git` / `node_modules`.

### Breaking changes

None for site visitors. `docker/Dockerfile`'s runtime `CMD` changed
from `npm run start` to `node server.js` (standalone output) — only
relevant if you were building the image directly.

## [1.0.0] - 2026-07-31

### Added

- Initial public build of PIZZEria: home, full menu, about, order, and
  credits pages.
- Category-tabbed menu (Pizza, Pasta, Ramen, Sides, Dessert, Drinks)
  backed by an optional Turso/Drizzle database with a static fallback.
- GSAP-driven hero spotlight and floating-ingredient animation.
- Framer Motion "metal shutter" section reveals and mobile nav
  transitions.
- Mobile- and desktop-responsive layout across all pages.

### Documentation

- README, architecture, deployment, development, and troubleshooting
  guides under `docs/`.
- Governance files: `CONTRIBUTING.md`, `SECURITY.md`,
  `CODE_OF_CONDUCT.md`, `SUPPORT.md`, `RELEASE.md`, `ROADMAP.md`.

[Unreleased]: https://github.com/SufiyanAasim/pizzeria/compare/v5.0.0...HEAD
[5.0.0]: https://github.com/SufiyanAasim/pizzeria/compare/v4.0.0...v5.0.0
[4.0.0]: https://github.com/SufiyanAasim/pizzeria/compare/v3.0.0...v4.0.0
[3.0.0]: https://github.com/SufiyanAasim/pizzeria/compare/v2.0.0...v3.0.0
[2.0.0]: https://github.com/SufiyanAasim/pizzeria/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/SufiyanAasim/pizzeria/releases/tag/v1.0.0
