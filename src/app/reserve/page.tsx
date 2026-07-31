import type { Metadata } from "next";
import ReservationForm from "@/components/reservation-form";

export const metadata: Metadata = {
  title: "Reserve — PIZZEria",
  description: "Request a table at PIZZEria.",
};

export default function ReservePage() {
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-lg">
        <div className="mb-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
            Let it Rise Before the Bake
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-cream md:text-5xl">
            Reserve a Table
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-steel">
            One room, first come first served for walk-ins — reserved
            tables get priority.
          </p>
        </div>
        <ReservationForm />
      </div>
    </section>
  );
}
