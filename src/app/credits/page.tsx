import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credits — PIZZEria",
  description: "Who built PIZZEria and what it's built with.",
};

const STACK = [
  { name: "Next.js", role: "Framework — App Router, React Server Components" },
  { name: "Tailwind CSS", role: "Styling and design tokens" },
  { name: "Framer Motion", role: "Section reveals and UI transitions" },
  { name: "GSAP", role: "Hero cursor spotlight and floating-ingredient motion" },
  { name: "Turso + Drizzle ORM", role: "Optional SQLite-compatible menu database" },
  { name: "Vercel", role: "Hosting and deployment" },
];

export default function CreditsPage() {
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
          Credits
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-cream md:text-5xl">
          PIZZEria
        </h1>
        <p className="mt-6 leading-relaxed text-steel">
          Designed, built, and maintained by{" "}
          <span className="text-cream">Mohammad Sufiyan Aasim</span>.
        </p>

        <div className="mt-12 grid gap-px bg-line text-left">
          {STACK.map((tool) => (
            <div key={tool.name} className="bg-surface-2 p-5">
              <div className="font-display text-base font-semibold text-cream">
                {tool.name}
              </div>
              <div className="mt-1 text-sm text-steel">{tool.role}</div>
            </div>
          ))}
        </div>

        <p className="mt-10 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-steel/70">
          &copy; {new Date().getFullYear()} Mohammad Sufiyan Aasim. All rights reserved.
        </p>
      </div>
    </section>
  );
}
