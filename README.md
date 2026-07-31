<p align="center">
  <img src="assets/brand/logo.svg" alt="PIZZEria" width="360">
</p>

[![Lint](https://github.com/SufiyanAasim/pizzeria/actions/workflows/lint.yml/badge.svg)](.github/workflows/lint.yml)
[![Build](https://github.com/SufiyanAasim/pizzeria/actions/workflows/build.yml/badge.svg)](.github/workflows/build.yml)
[![Test](https://github.com/SufiyanAasim/pizzeria/actions/workflows/test.yml/badge.svg)](.github/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-3.0.0--Proof-d1502f)](CHANGELOG.md)

A wood-fired kitchen showcase — pizza, pasta, ramen, sides, dessert,
and drinks — built with Next.js, Tailwind, GSAP, and Framer Motion.
Ships fully static; gains a live menu database only if you plug in
Turso.

## Overview

PIZZEria is a single-owner, high-craft brand site: one dark, single-
theme visual identity ("Torrefatto" — industrial dark shell, trattoria
warmth), a cinematic hero, and a category-tabbed menu covering the
kitchen's full range rather than just pizza.

## Features

- Cursor-follow ember spotlight and GSAP floating-ingredient hero
- "Metal shutter" scroll reveals between sections (Framer Motion)
- Category-tabbed menu: Pizza, Pasta, Ramen, Sides, Dessert, Drinks
- Fully responsive — same codebase serves mobile and desktop
- Zero-config static menu, with an optional Turso/Drizzle database
- Order builder: pizza topping picker, persistent cart, checkout flow
  that sends the order via a pre-filled email — no backend required
- Table reservation request (`/reserve`) and a full illustrated menu
  gallery (`/gallery`)

## Screenshots

See [docs/images/](docs/images/) once photography/screenshots are
added — see [assets/README.md](assets/README.md) for the shot list.

## Architecture

See [docs/architecture/Architecture.md](docs/architecture/Architecture.md)
and [docs/architecture/Database.md](docs/architecture/Database.md).

## Technology stack

| Layer      | Choice                          |
| ---------- | -------------------------------- |
| Framework  | Next.js 16 (App Router)          |
| Styling    | Tailwind CSS 4                   |
| Animation  | Framer Motion, GSAP              |
| Database   | Turso (libSQL) via Drizzle ORM — optional |
| Testing    | Vitest                           |
| Hosting    | Vercel                           |

## Requirements

- Node.js 20+
- npm 10+

## Installation

```bash
git clone <this-repo>
cd pizzeria
npm install
```

## Quick start

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

See [docs/development/Configuration.md](docs/development/Configuration.md).

## Environment variables

| Variable             | Required | Default | Description                          |
| --------------------- | -------- | ------- | -------------------------------------- |
| `TURSO_DATABASE_URL`   | No       | —       | Turso connection URL — omit for static menu |
| `TURSO_AUTH_TOKEN`     | No       | —       | Turso auth token                       |

## Running locally

```bash
npm run dev     # dev server
npm run build   # production build
npm run start   # serve the production build
```

> **Windows:** if your project path contains `&`, `npm run <script>`
> may fail — see [docs/troubleshooting/Troubleshooting.md](docs/troubleshooting/Troubleshooting.md).

## Docker

```bash
docker compose -f docker/docker-compose.yml up --build
```

Or via `make`: `make docker-up`.

## Cloud deployment

Deploys to Vercel with zero configuration. See
[docs/deployment/Deployment.md](docs/deployment/Deployment.md).

## API documentation

See [docs/api/API.md](docs/api/API.md) — there is still no HTTP API
surface; the cart and checkout run entirely client-side.

## Project structure

```text
pizzeria/
├── .github/           CI workflows, issue/PR templates
├── docs/              Architecture, deployment, API, guides, releases
├── src/
│   ├── app/           Routes (App Router)
│   ├── components/    Shared UI
│   ├── db/            Drizzle schema + Turso client
│   └── lib/           Static menu data + data access
├── tests/             Vitest unit tests
├── scripts/           DB seed script
├── docker/            Dockerfile + compose for local/self-hosting
├── config/            Non-secret site metadata
├── assets/            Source design assets, image shot list
└── examples/          Sample data payloads
```

## Testing

```bash
npm run test
```

See [docs/development/Testing.md](docs/development/Testing.md).

## Performance

Every route is statically generated at build time; the menu is read
server-side with no client-side fetch on first paint. Animations skip
entirely under `prefers-reduced-motion`.

## Security

See [SECURITY.md](SECURITY.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Roadmap

See [ROADMAP.md](ROADMAP.md).

## FAQ

**Why no database by default?**
So the site works with zero setup. See
[docs/architecture/Database.md](docs/architecture/Database.md).

**Why not plain SQLite on Vercel?**
Vercel's filesystem is read-only and ephemeral at runtime — see the
same doc for why Turso is used instead.

## Troubleshooting

See [docs/troubleshooting/Troubleshooting.md](docs/troubleshooting/Troubleshooting.md).

## License

[MIT](LICENSE) &copy; Mohammad Sufiyan Aasim

## Acknowledgements

Built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com),
[Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com),
and [Turso](https://turso.tech). Full credits at `/credits` on the
live site, or [src/app/credits/page.tsx](src/app/credits/page.tsx).

## Support

See [SUPPORT.md](SUPPORT.md).
