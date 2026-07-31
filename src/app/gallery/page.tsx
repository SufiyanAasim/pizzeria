import type { Metadata } from "next";
import GalleryGrid from "@/components/gallery-grid";
import { getMenu } from "@/lib/get-menu";

export const metadata: Metadata = {
  title: "Gallery — PIZZEria",
  description: "Every dish on the PIZZEria board, by category.",
};

export default async function GalleryPage() {
  const menu = await getMenu();

  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
            The Whole Board
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-cream md:text-5xl">
            Gallery
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-steel">
            Real dish photography is on its way — see{" "}
            <code className="text-tomato-2">assets/README.md</code> for the
            shot list. Until then, every plate below is illustrated.
          </p>
        </div>
        <GalleryGrid categories={menu} />
      </div>
    </section>
  );
}
