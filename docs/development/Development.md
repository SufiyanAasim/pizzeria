# Development Guide

## Prerequisites

- Node.js 20+
- npm 10+
- (Optional) [Turso CLI](https://docs.turso.tech/cli/installation) if
  you want a real database locally.

## Setup

```bash
git clone <this-repo>
cd pizzeria
npm install
cp .env.example .env.local   # optional — see Configuration.md
npm run dev
```

Visit `http://localhost:3000`.

## Windows note

If your project path contains an `&` character (e.g. a folder named
`Fully Tested & Deployed`), `npm run <script>` may fail on Windows
because `cmd.exe` treats unescaped `&` as a command separator inside
the generated `.cmd` shims in `node_modules/.bin`. If you hit
`'X' is not recognized as an internal or external command`, run the
underlying binary directly instead, e.g.:

```bash
node node_modules/next/dist/bin/next build
node node_modules/eslint/bin/eslint.js .
```

This does not affect Vercel deployments, which build in a Linux
container.

## Scripts

| Command             | What it does                            |
| -------------------- | ----------------------------------------- |
| `npm run dev`          | Start the dev server                      |
| `npm run build`        | Production build                          |
| `npm run start`        | Serve the production build                |
| `npm run lint`         | Run ESLint                                |
| `npm run test`         | Run the test suite (Vitest)               |
| `npm run db:seed`      | Seed Turso from the static menu           |

## Project conventions

- Server Components by default; add `"use client"` only where
  interactivity (state, effects, animation) requires it.
- Styling via Tailwind utility classes, using the tokens defined in
  `src/app/globals.css` (`bg`, `surface`, `surface-2`, `line`, `gold`,
  `tomato`, `tomato-2`, `cream`, `steel`) rather than raw hex values.
- Menu content lives in one place: `src/lib/menu-data.ts`. Edit it
  there, then re-run `npm run db:seed` if you're using Turso.

See also: [Configuration.md](Configuration.md),
[Testing.md](Testing.md), [Troubleshooting.md](../troubleshooting/Troubleshooting.md).
