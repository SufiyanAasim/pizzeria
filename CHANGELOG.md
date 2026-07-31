# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/SufiyanAasim/pizzeria/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/SufiyanAasim/pizzeria/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/SufiyanAasim/pizzeria/releases/tag/v1.0.0
