# Security Policy

## Supported versions

| Version | Supported |
| ------- | --------- |
| 1.x     | ✅        |
| < 1.0   | ❌        |

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

## Scope

This project has no authentication, payments, or user accounts — the
main surface area is the optional Turso database connection and the
order-request form (which only opens a `mailto:` link; no data is
transmitted to a backend). Secrets (`TURSO_DATABASE_URL`,
`TURSO_AUTH_TOKEN`) must never be committed; use `.env.local`, which is
git-ignored, or your deployment platform's environment variable store.
