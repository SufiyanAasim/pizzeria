import type { Metadata } from "next";
import { asc } from "drizzle-orm";
import { db } from "@/db/client";
import { categories, menuItems } from "@/db/schema";
import AdminDashboard from "@/components/admin/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin — PIZZEria",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!db) {
    return (
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="font-display text-3xl font-semibold text-cream">
            Admin panel needs a database
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-steel">
            The site runs fine without one, but editing categories and
            items requires Turso. Set <code className="text-tomato-2">TURSO_DATABASE_URL</code>{" "}
            and <code className="text-tomato-2">TURSO_AUTH_TOKEN</code>, then run{" "}
            <code className="text-tomato-2">npm run db:seed</code> once to
            create the tables. See{" "}
            <code className="text-tomato-2">docs/architecture/Database.md</code>.
          </p>
        </div>
      </section>
    );
  }

  const [cats, items] = await Promise.all([
    db.select().from(categories).orderBy(asc(categories.sortOrder)),
    db.select().from(menuItems).orderBy(asc(menuItems.sortOrder)),
  ]);

  return (
    <section className="px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
            Staff Only
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-cream md:text-4xl">
            Menu Admin
          </h1>
          <p className="mt-2 text-sm text-steel">
            Add categories, add items to them, edit prices and
            descriptions, or remove anything that&apos;s off the board. Changes
            are live on <code className="text-tomato-2">/menu</code> and{" "}
            <code className="text-tomato-2">/gallery</code> immediately.
          </p>
        </div>
        <AdminDashboard
          categories={cats}
          items={items.map((i) => ({
            id: i.id,
            categorySlug: i.categorySlug,
            name: i.name,
            description: i.description,
            priceCents: i.priceCents,
          }))}
        />
      </div>
    </section>
  );
}
