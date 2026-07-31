# Security Policy

## Supported versions

| Version | Supported |
| ------- | --------- |
| 4.x     | ✅        |
| < 4.0   | ❌        |

## Reporting a vulnerability

Please **do not** open a public GitHub issue for security
vulnerabilities. Instead, use GitHub's private
[Security Advisories](../../security/advisories/new) feature on this
repository, or email the maintainer directly.

Include:

- A description of the vulnerability and its impact.
- Steps to reproduce, or a proof of concept.
- Any suggested remediation, if you have one.

You should receive an acknowledgement within a few days. Confirmed
issues will be patched and disclosed via the [CHANGELOG](CHANGELOG.md)
and a GitHub Security Advisory once a fix is available.

## Known accepted risk: ESLint's dependency chain

`npm audit` flags a `minimatch`/`brace-expansion` advisory pulled in
transitively through `eslint` → `@eslint/config-array`. It's confined
to `devDependencies` — ESLint runs only at lint time and is never
part of the shipped app — and the fix requires an ESLint major-version
bump that changes minimatch's API in a way `@eslint/config-array`
doesn't yet support upstream. CI (`security.yml`) audits production
dependencies as a blocking check and dev dependencies as advisory-only
for this reason.

## Scope

Customers never authenticate and no payments are handled — order and
reservation forms only open a `mailto:` link, and no data is
transmitted to or stored by the app on that path.

The one authenticated surface is the admin panel at `/admin`, gated by
a single shared password (`ADMIN_PASSWORD`) — see
`docs/architecture/Architecture.md`. This is deliberately simple (one
role, one password, no user management) and is not intended to scale
to a team; if that changes, replace `src/lib/admin-auth.ts` with a
real auth provider rather than extending the shared-password model.

Secrets (`TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `ADMIN_PASSWORD`)
must never be committed; use `.env.local`, which is git-ignored, or
your deployment platform's environment variable store. Use a long,
random `ADMIN_PASSWORD` you don't reuse elsewhere — it is compared in
plaintext against the request body over HTTPS, not hashed at rest.
