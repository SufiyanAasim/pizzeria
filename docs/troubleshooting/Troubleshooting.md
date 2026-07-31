# Troubleshooting

## `npm run <script>` fails with "is not recognized as an internal or external command" (Windows)

Your project path likely contains an `&` character (e.g.
`Fully Tested & Deployed`). `cmd.exe` treats an unescaped `&` as a
command separator, which breaks the `.cmd` shims npm generates in
`node_modules/.bin`.

**Fix:** run the underlying binary through `node` directly instead of
through the npm script:

```bash
node node_modules/next/dist/bin/next build
node node_modules/next/dist/bin/next dev
node node_modules/eslint/bin/eslint.js .
node node_modules/vitest/vitest.mjs run
```

This is purely a local Windows issue — Vercel builds in a Linux
container and is unaffected.

## Menu shows static data even though Turso is configured

- Confirm `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` are set in
  `.env.local` (or your deploy platform's env vars) and that the dev
  server / build was restarted after adding them.
- Confirm the database has been seeded: `npm run db:seed`.
- `getMenu()` silently falls back to static data on any query error —
  check the server logs for the underlying Turso error if the menu
  looks stale.

## Order form doesn't send anything

By design — see [API.md](../api/API.md). The Order page opens a
`mailto:` link with the visitor's default mail client; if no mail
client is configured on the device, nothing will visibly happen. A
real backend-driven flow is planned for v2.0.0 (Knead).

## Animations don't play

- Check `prefers-reduced-motion` isn't enabled in your OS — the site
  intentionally disables the hero float and shutter reveals for users
  who've requested reduced motion.
- GSAP tweens are set up in a `useEffect` in `src/components/hero.tsx`;
  if you've modified that component, confirm the cleanup function
  isn't killing tweens before they run.

## Build fails on a fresh clone

```bash
rm -rf node_modules .next
npm install
npm run build
```

If it still fails, confirm your Node version is 20+.
