# API

PIZZEria has **no HTTP API routes**, even after the v2.0.0 order
builder. All data access happens server-side inside React Server
Components via `src/lib/get-menu.ts`, which is not exposed as an
endpoint.

## Cart and checkout (v2.0.0+)

The cart (`src/lib/cart-context.tsx`) lives entirely client-side in
`localStorage` — there is no server-side cart state. `/checkout`
(`src/components/checkout-view.tsx`) builds an itemized summary and
opens a pre-filled `mailto:` link; no request ever leaves the browser
and no payment information is collected anywhere.

## Planned

A real `/api/order` route (or a hosted form provider) remains a
future option if the project moves toward accepting orders without a
human reading email — not committed to any specific version yet. When
added, this document will cover:

- Endpoint, method, and authentication (if any)
- Request/response shape
- Status codes and error format

Until then, there is nothing else to document here.
