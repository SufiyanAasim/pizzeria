# Assets

Source design assets that are **not** shipped directly to `public/`
(logo source files, brand notes, unprocessed photography). Processed,
web-ready files go in `public/`.

## Required images

The v1.0.0 (Leaven) build intentionally ships with no food photography
— the hero uses an illustrated CSS plate + emoji toppings, and the
menu is text-only, so the site works before a single photo exists.
The following are needed to move past that:

| File                          | Size (px)  | Format      | Used for                                  |
| ------------------------------ | ---------- | ----------- | ------------------------------------------- |
| `logo-mark.svg`                 | vector     | SVG         | Header wordmark / favicon source            |
| `og-image.jpg`                  | 1200×630   | JPG         | Social share preview (Open Graph / Twitter) |
| `favicon-source.svg`            | vector     | SVG         | Generating `src/app/favicon.ico`            |
| `hero-plate.jpg` *(optional)*   | 1600×1600  | JPG, square | Real photo to replace the illustrated hero plate |
| `dish-<category>-<name>.jpg`    | 1200×900   | JPG, 4:3    | One photo per menu item, e.g. `dish-pizza-diavola.jpg` (see `src/lib/menu-data.ts` for the full item list — 20 items across 6 categories) |
| `interior-01.jpg` … `interior-03.jpg` | 1600×1067 | JPG, 3:2 | About page / gallery, wood-fired oven + dining room |

## Guidelines

- Shoot or source dish photos on a dark, low-reflectance surface to
  match the site's dark theme — bright white plates will look out of
  place against the "Torrefatto" palette.
- Keep food photos landscape (4:3) so they drop cleanly into the menu
  grid without cropping surprises.
- Export JPGs at quality 80–85; Next.js's `<Image>` component will
  handle responsive resizing once photos are wired in.
