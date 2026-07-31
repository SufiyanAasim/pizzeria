# Release Process

## Versioning

This project uses [Semantic Versioning](https://semver.org/):
`MAJOR.MINOR.PATCH`.

- **MAJOR** — breaking changes.
- **MINOR** — new functionality, backward-compatible.
- **PATCH** — bug fixes only.

## Codenames

Releases v1.0.0–v4.0.0 are codenamed after stages of dough preparation
(Italian culinary / dough-making theme):

| Version | Codename | Meaning                        |
| ------- | -------- | ------------------------------- |
| v1.0.0  | Leaven   | The starter — pre-release build |
| v2.0.0  | Knead    | Working the dough into shape    |
| v3.0.0  | Proof    | Letting it rise before the bake |
| v4.0.0  | Crust    | The finished, baked result      |

Starting at v5.0.0 the theme moves to toppings — the dough-prep arc
(Leaven → Crust) was complete at v4.0.0, and everything after is about
what goes *on* the pizza, not how it's made:

| Version | Codename | Meaning                          |
| ------- | -------- | ---------------------------------- |
| v5.0.0  | Olive    | First of the topping-era releases  |

## Release cycle

```text
Development → Alpha → Beta → Release Candidate → Stable → Patch → Maintenance
```

`v1.0.0` (Leaven) ships as a **pre-release** on GitHub — functional,
but the surface area (menu, ordering, content) is still expected to
change before v2.

## Steps to cut a release

1. Confirm `main` is green (`npm run lint`, `npm run build`).
2. Update `CHANGELOG.md` under `[Unreleased]`, then move those entries
   under a new `## [x.y.z] - YYYY-MM-DD` heading.
3. Add a matching release note under `docs/releases/vX.Y.Z-<codename>.md`
   (see `docs/releases/v1.0.0-Leaven.md` for the format).
4. Bump `version` in `package.json`.
5. Commit: `chore(release): vX.Y.Z — <Codename>`.
6. Tag: `git tag -a vX.Y.Z -m "vX.Y.Z — <Codename>"`.
7. Push the tag and publish the GitHub Release from it, marking it as
   a pre-release until v1.0.0's scope is considered stable.

## Branch flow

```text
feature/* → develop → release/* → main → hotfix/*
```
