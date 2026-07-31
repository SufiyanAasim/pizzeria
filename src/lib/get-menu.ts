import { db } from "@/db/client";
import { categories, menuItems } from "@/db/schema";
import { asc } from "drizzle-orm";
import { MENU, type MenuCategory } from "./menu-data";

/**
 * Reads the menu from Turso when configured, otherwise serves the
 * static fallback so the site never breaks without a database.
 */
export async function getMenu(): Promise<MenuCategory[]> {
  if (!db) return MENU;

  try {
    const cats = await db.select().from(categories).orderBy(asc(categories.sortOrder));
    if (cats.length === 0) return MENU;

    const items = await db.select().from(menuItems).orderBy(asc(menuItems.sortOrder));

    return cats.map((c) => ({
      slug: c.slug,
      name: c.name,
      items: items
        .filter((i) => i.categorySlug === c.slug)
        .map((i) => ({
          name: i.name,
          description: i.description,
          priceCents: i.priceCents,
        })),
    }));
  } catch {
    return MENU;
  }
}
