import type { Metadata } from "next";
import MenuTabs from "@/components/menu-tabs";
import { getMenu } from "@/lib/get-menu";

export const metadata: Metadata = {
  title: "Full Menu — PIZZEria",
  description: "Pizza, pasta, ramen, sides, dessert, and drinks from the PIZZEria wood-fired kitchen.",
};

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const menu = await getMenu();
  const { cat } = await searchParams;

  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
            Chalked Fresh Every Monday
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-cream md:text-5xl">
            The Full Line-Up
          </h1>
        </div>
        <MenuTabs categories={menu} initialSlug={cat} />
      </div>
    </section>
  );
}
