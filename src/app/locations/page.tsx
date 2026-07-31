import type { Metadata } from "next";
import LocationsList from "@/components/locations-list";

export const metadata: Metadata = {
  title: "Locations — PIZZEria",
  description: "Find your nearest PIZZEria location and hours.",
};

export default function LocationsPage() {
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
            The Finished Result
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-cream md:text-5xl">
            Locations
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-steel">
            Setting a location updates the hours shown in the footer and on
            the Order and Reserve pages.
          </p>
        </div>
        <LocationsList />
      </div>
    </section>
  );
}
