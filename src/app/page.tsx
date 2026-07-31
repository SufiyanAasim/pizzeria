import Link from "next/link";
import Hero from "@/components/hero";
import ShutterReveal from "@/components/shutter-reveal";
import MenuGrid from "@/components/menu-grid";
import { getMenu } from "@/lib/get-menu";

export default async function Home() {
  const menu = await getMenu();
  const featured = menu.find((c) => c.slug === "pizza")?.items.slice(0, 3) ?? [];

  return (
    <>
      <Hero />

      <ShutterReveal>
        <section className="border-t border-line bg-surface px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
              Est. Slice No. 7
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-cream md:text-4xl">
              One oven. Six menus. No shortcuts.
            </h2>
            <p className="mt-5 text-balance leading-relaxed text-steel">
              Same 900°F wood-fired oven and cast-iron line cooking pizza,
              pasta, ramen, sides, dessert, and drinks — hand-stretched,
              slow-built, plated like it&apos;s for family.
            </p>
          </div>
        </section>
      </ShutterReveal>

      <ShutterReveal>
        <section className="border-t border-line bg-bg px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-3xl font-semibold text-cream md:text-4xl">
                From the Board
              </h2>
              <Link
                href="/menu"
                className="font-mono text-xs uppercase tracking-[0.14em] text-tomato-2 hover:text-gold"
              >
                Full Menu &rarr;
              </Link>
            </div>
            <MenuGrid items={featured} />
          </div>
        </section>
      </ShutterReveal>
    </>
  );
}
