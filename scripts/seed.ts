import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "../src/db/schema";
import { MENU } from "../src/lib/menu-data";

async function main() {
  const url = process.env.TURSO_DATABASE_URL;
  if (!url) {
    console.error(
      "TURSO_DATABASE_URL is not set. Copy .env.example to .env.local and fill in your Turso credentials first."
    );
    process.exit(1);
  }

  const client = createClient({
    url,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  const db = drizzle(client, { schema });

  await client.execute(`
    CREATE TABLE IF NOT EXISTS categories (
      slug TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );
  `);
  await client.execute(`
    CREATE TABLE IF NOT EXISTS menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_slug TEXT NOT NULL REFERENCES categories(slug),
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price_cents INTEGER NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );
  `);
  await client.execute(`CREATE INDEX IF NOT EXISTS menu_items_category_idx ON menu_items(category_slug);`);

  await client.execute("DELETE FROM menu_items;");
  await client.execute("DELETE FROM categories;");

  for (const [catIndex, category] of MENU.entries()) {
    await db.insert(schema.categories).values({
      slug: category.slug,
      name: category.name,
      sortOrder: catIndex,
    });

    for (const [itemIndex, item] of category.items.entries()) {
      await db.insert(schema.menuItems).values({
        categorySlug: category.slug,
        name: item.name,
        description: item.description,
        priceCents: item.priceCents,
        sortOrder: itemIndex,
      });
    }
  }

  console.log(`Seeded ${MENU.length} categories and ${MENU.reduce((n, c) => n + c.items.length, 0)} menu items.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
