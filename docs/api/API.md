# API

PIZZEria v1.0.0 (Leaven) has **no HTTP API routes**. All data access
happens server-side inside React Server Components via
`src/lib/get-menu.ts`, which is not exposed as an endpoint.

The order form on `/contact` does not call an API either — it opens
the visitor's mail client with a pre-filled `mailto:` link
(`src/components/order-form.tsx`), so no request ever leaves the
browser.

## Planned

A real `/api/order` route (or a hosted form provider) is planned for
v2.0.0 — Knead, once an actual order/checkout flow is built. When
added, this document will cover:

- Endpoint, method, and authentication (if any)
- Request/response shape
- Status codes and error format

Until then, there is nothing to document here beyond this notice.
