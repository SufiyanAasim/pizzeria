# Configuration

## Environment variables

| Variable             | Required | Default | Description                                                      |
| --------------------- | -------- | ------- | ------------------------------------------------------------------ |
| `TURSO_DATABASE_URL`   | No       | —       | Turso/libSQL connection URL. Omit to use the static menu.          |
| `TURSO_AUTH_TOKEN`     | No       | —       | Turso auth token, required alongside `TURSO_DATABASE_URL`.         |
| `ADMIN_PASSWORD`       | No       | —       | Enables `/admin`. Needs `TURSO_DATABASE_URL` set too to be useful. |

Copy `.env.example` to `.env.local` and fill in values only if you
want a live database. `.env.local` is git-ignored.

## Site config

Non-secret, editable site metadata lives in `config/site.json`
(name, tagline, description, social links) and is imported by
`src/app/layout.tsx` for page metadata. Edit that file to rebrand
copy without touching component code.

## Design tokens

Color and font tokens are defined once in `src/app/globals.css` under
`:root` and re-exposed to Tailwind via `@theme inline`. The site
commits to a single dark theme by design (see
`docs/architecture/Architecture.md`), so there is no light-mode
variant to configure.
