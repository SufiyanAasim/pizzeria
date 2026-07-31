# Developer Guide

Start with [Development.md](../development/Development.md) for setup,
then [Architecture.md](../architecture/Architecture.md) for how the
pieces fit together.

## Common tasks

### Add or edit a menu item

Edit `src/lib/menu-data.ts`. If you're using Turso, re-run
`npm run db:seed` afterward to sync it.

### Add a new page

Create `src/app/<route>/page.tsx`. Reuse `SiteHeader` / `SiteFooter`
from `src/app/layout.tsx` automatically apply — you only need the
page content. Add the route to `NAV_LINKS` in
`src/components/site-header.tsx` if it should appear in navigation.

### Add a new color/token

Add it under `:root` in `src/app/globals.css` and re-expose it in the
`@theme inline` block so Tailwind picks it up as `bg-<token>` /
`text-<token>`.

### Add an animation

- Scroll-triggered section reveal → wrap the section in
  `<ShutterReveal>` (`src/components/shutter-reveal.tsx`).
- One-off interaction (hover, click) → Framer Motion `motion.*`
  components, colocated in the component that needs it.
- Continuous/cursor-driven motion → GSAP, following the pattern in
  `src/components/hero.tsx` (set up in a `useEffect`, always cleaned
  up, always gated behind a `prefers-reduced-motion` check).

## Code review checklist

- [ ] `npm run lint` passes
- [ ] `npm run test` passes
- [ ] `npm run build` succeeds
- [ ] New client components have a real reason for `"use client"`
- [ ] No hard-coded hex colors outside `globals.css`
