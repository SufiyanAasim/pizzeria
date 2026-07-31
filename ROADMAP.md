# Roadmap

## v1.0.0 — Leaven ✅ shipped

Pre-release. Static-first showcase: home, full menu, about, order
form, and credits, with an optional Turso-backed menu.

## v2.0.0 — Knead ✅ shipped

- Order builder: topping picker, persistent cart, `/checkout` review
  and send (via `mailto:` — no payment processor integrated; see
  `docs/api/API.md`).
- CI fixes: security audit scoping, Docker build.

Deferred to a later release: an admin view for editing menu items
without touching the database directly.

## v3.0.0 — Proof ✅ shipped

- Reservation/table-booking flow (`/reserve`).
- Image gallery for dishes (`/gallery`), shipped with illustrated
  placeholders — see `assets/README.md` for the real-photography shot
  list this is waiting on.

## v4.0.0 — Crust ✅ shipped

- Multi-location support (`/locations`, active-location-aware footer).
- Performance pass: `CartDrawer` and `ToppingPicker` deferred via
  `next/dynamic`.

## What's next

All four originally planned releases (Leaven → Knead → Proof → Crust)
have shipped. Candidates for a v4.1+ or v5.0.0, not yet scheduled:

- Wire `/contact`'s hours to the active location.
- Per-location menu/pricing, if locations ever actually differ.
- Admin view for editing menu items without touching the database
  directly (deferred from v2.0.0).
- Real dish photography to replace the `/gallery` illustrations.

## Not planned

- User accounts / authentication — out of scope for a showcase site
  unless the project's purpose changes.
- Real payment processing — the order/checkout flow deliberately stays
  `mailto:`-based; wiring a payment provider is a distinct, larger
  scope decision the project hasn't made yet.
