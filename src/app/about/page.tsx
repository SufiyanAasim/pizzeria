import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — PIZZEria",
  description: "The story behind PIZZEria's wood-fired, cast-iron kitchen.",
};

const TIMELINE = [
  {
    heat: "900°F",
    title: "The Oven",
    body: "A single wood-fired dome runs the whole kitchen — pizza, ramen broth, seared pasta finishes, even the dessert torch shares its coals.",
  },
  {
    heat: "24H",
    title: "The Dough",
    body: "Cold-fermented a full day before it ever sees flame. No shortcuts, no same-day dough.",
  },
  {
    heat: "1 TABLE",
    title: "The Room",
    body: "Small enough that the kitchen can still greet you by name. Built industrial; runs like a family table.",
  },
];

export default function AboutPage() {
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
          Since the Corner Oven
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-cream md:text-5xl">
          Built like the ovens we cook in
        </h1>
        <p className="mt-6 text-balance leading-relaxed text-steel">
          PIZZEria started as one wood-fired oven and a short list of things
          worth doing slowly. It&apos;s grown into a full kitchen — pasta,
          ramen, sides, dessert, drinks — but the rule hasn&apos;t changed:
          if it&apos;s not worth feeding to family, it&apos;s not going on
          the board.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl gap-px bg-line sm:grid-cols-3">
        {TIMELINE.map((item) => (
          <div key={item.title} className="bg-surface-2 p-7">
            <div className="font-mono text-sm font-bold tracking-wide text-tomato-2">
              {item.heat}
            </div>
            <h2 className="mt-3 font-display text-xl font-semibold text-cream">
              {item.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-steel">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
