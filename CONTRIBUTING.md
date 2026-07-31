# Contributing to PIZZEria

This is a solo-owned project maintained by Mohammad Sufiyan Aasim.
External contributions are welcome for bug fixes and small
improvements — please open an issue before starting on anything
larger so the direction can be agreed on first.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional: fill in Turso credentials
npm run dev
```

See [docs/development/Development.md](docs/development/Development.md)
for the full local setup.

## Branching

- `main` — always deployable.
- `feature/<name>` — new functionality.
- `bugfix/<name>` — non-urgent bug fixes.
- `hotfix/<name>` — urgent fixes branched from `main`.
- `docs/<name>`, `refactor/<name>`, `test/<name>`, `perf/<name>`,
  `ci/<name>` — as scoped by their prefix.

## Commit messages

This repository uses [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat(menu): add category tab animation
fix(hero): correct spotlight offset on mobile
docs(readme): clarify Turso setup
```

Allowed types: `feat`, `fix`, `docs`, `refactor`, `perf`, `style`,
`build`, `ci`, `test`, `chore`, `revert`.

## Pull requests

- Keep PRs scoped to one change.
- Fill in the pull request template, including a testing checklist.
- Reference any related issue.
- Make sure `npm run lint` and `npm run build` pass locally first.

## Code style

- TypeScript, formatted per the repository's ESLint config.
- Tailwind for styling — extend the tokens in
  `src/app/globals.css` rather than hard-coding one-off colors.
- Keep components small and colocated with the page/feature that
  uses them unless genuinely shared.

## Reporting bugs / requesting features

Use the issue templates under `.github/ISSUE_TEMPLATE/`. For security
issues, follow [SECURITY.md](SECURITY.md) instead of opening a public
issue.
