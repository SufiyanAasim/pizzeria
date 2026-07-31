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

## v3.0.0 — Proof (current)

- Reservation/table-booking flow.
- Image gallery for dishes (see `assets/README.md` for the shot list;
  ships with illustrated placeholders until real photography exists).

## v4.0.0 — Crust

- Multi-location support.
- Performance pass: dynamic-imported heavy client components, lazy
  loading, bundle audit.

## Not planned

- User accounts / authentication — out of scope for a showcase site
  unless the project's purpose changes.
- Real payment processing — the order/checkout flow deliberately stays
  `mailto:`-based; wiring a payment provider is a distinct, larger
  scope decision the project hasn't made yet.
