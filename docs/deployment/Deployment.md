# Deployment

PIZZEria is built for [Vercel](https://vercel.com), the natural fit
for a Next.js App Router project.

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, **Add New Project** and import the repository.
   Framework preset is auto-detected as Next.js — no build command
   overrides are needed.
3. Add environment variables under **Settings → Environment
   Variables** (optional — omit both to run static-only):

   | Variable             | Required | Description                     |
   | --------------------- | -------- | -------------------------------- |
   | `TURSO_DATABASE_URL`   | No       | Turso database connection URL    |
   | `TURSO_AUTH_TOKEN`     | No       | Turso auth token                 |

4. Deploy. Every push to `main` deploys to production; every other
   branch/PR gets a preview deployment.

## Why not SQLite directly on Vercel

Vercel's serverless functions run on a read-only, ephemeral
filesystem — a local SQLite file cannot durably persist writes, and
different invocations may not share the same disk. Turso solves this
by being SQLite-compatible but network-accessible; see
[Database.md](../architecture/Database.md) for details.

## Environment parity

| Environment | Menu source                                   |
| ----------- | ---------------------------------------------- |
| Local, no `.env.local`     | Static (`src/lib/menu-data.ts`)   |
| Local, with Turso vars     | Turso                             |
| Vercel, no env vars set    | Static                            |
| Vercel, with Turso vars set | Turso                            |

## Other hosts

Because the app has no server-only APIs beyond the optional Turso
call, it also builds as a static export if needed
(`next build && next export`-equivalent via `output: "export"` in
`next.config.ts`) — useful for static hosts that aren't Vercel. This
is not enabled by default since Vercel's standard Next.js runtime is
the primary target.
