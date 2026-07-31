# API

Customer-facing pages have no HTTP API — cart, checkout, and
reservations all run client-side or via `mailto:` (see
`docs/architecture/Architecture.md`).

The admin panel (`/admin`, added post-v4.0.0) does have a small,
**admin-only** API under `/api/admin/*`. Every route requires the
`pizzeria_admin_session` cookie set by `/api/admin/login`; without it,
every route below returns `401`. Without `TURSO_DATABASE_URL`
configured, write routes return `503`.

## `POST /api/admin/login`

**Auth:** none (this is how you get one)
**Body:** `{ "password": string }`
**Response:** `200 { ok: true }` and sets the session cookie, or
`401 { error }` on a wrong password, or `503` if `ADMIN_PASSWORD`
isn't set.

## `POST /api/admin/logout`

Clears the session cookie. Always `200 { ok: true }`.

## `POST /api/admin/categories`

**Body:** `{ "name": string }` — slug is derived from the name.
**Response:** `201 { ok: true, slug }`, `409` if the slug already
exists, `400` on a missing/empty name.

## `DELETE /api/admin/categories/:slug`

Deletes the category **and every item in it**. `200 { ok: true }`.

## `POST /api/admin/items`

**Body:** `{ categorySlug, name, description, priceCents }` — all
required, `priceCents` must be a positive integer.
**Response:** `201 { ok: true, item }`.

## `PUT /api/admin/items/:id`

**Body:** `{ name, description, priceCents }`.
**Response:** `200 { ok: true }`.

## `DELETE /api/admin/items/:id`

**Response:** `200 { ok: true }`.

## Error shape

Every error response is `{ "error": string }` with an appropriate
HTTP status (`400`, `401`, `409`, or `503`).
