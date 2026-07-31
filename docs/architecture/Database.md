# Database

PIZZEria's database is **optional**. Without it, the site serves the
static menu from `src/lib/menu-data.ts`.

## Why Turso

The project originally considered plain SQLite, but Vercel's
filesystem is read-only and ephemeral at runtime — a SQLite file
written during a request would not persist, and separate serverless
instances would each see a different copy. [Turso](https://turso.tech)
is SQLite-compatible (via `libsql`) but runs as a real hosted service,
so the same schema and query patterns work locally and in production.

## Schema

Defined in `src/db/schema.ts` using Drizzle ORM:

- **`categories`** — `slug` (PK), `name`, `sort_order`.
- **`menu_items`** — `id` (PK), `category_slug` (FK →
  `categories.slug`), `name`, `description`, `price_cents`,
  `sort_order`.

Prices are stored as integer cents to avoid floating-point rounding;
`formatPrice()` in `src/lib/menu-data.ts` handles display formatting.

## Setting up Turso

```bash
turso db create pizzeria
turso db show pizzeria           # copy the URL
turso db tokens create pizzeria  # generate an auth token
```

Add both values to `.env.local` (see `.env.example`):

```bash
TURSO_DATABASE_URL=libsql://your-db-name.turso.io
TURSO_AUTH_TOKEN=your-token
```

Then seed the database from the static menu:

```bash
npm run db:seed
```

`getMenu()` (`src/lib/get-menu.ts`) automatically prefers Turso once
`TURSO_DATABASE_URL` is set, and falls back to the static menu on any
query error.

## Migrations

Schema changes go through [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview):

```bash
npx drizzle-kit push
```

`drizzle.config.ts` points at `src/db/schema.ts` and reads the same
Turso environment variables.
