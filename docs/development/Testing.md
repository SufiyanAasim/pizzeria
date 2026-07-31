# Testing

## Stack

[Vitest](https://vitest.dev) for unit tests. There is no end-to-end
test suite yet — the app has no auth flows or payment paths, so the
current priority is unit coverage on the data layer (price formatting,
menu shape) rather than browser automation.

## Running tests

```bash
npm run test
```

## What's covered

- `src/lib/menu-data.ts` — `formatPrice()` and the static `MENU`
  shape (`tests/menu-data.test.ts`).

## Adding tests

Place new test files under `tests/`, named `<subject>.test.ts`. Prefer
testing `src/lib` and `src/db` logic directly; UI components are kept
thin enough that most of their correctness is visible in the browser
during development rather than needing snapshot tests.

## CI

`.github/workflows/test.yml` runs `npm run test` on every push and
pull request against `main`.
