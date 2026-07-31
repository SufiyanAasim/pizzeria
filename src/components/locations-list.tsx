"use client";

import { LOCATIONS } from "@/lib/locations-data";
import { useLocation } from "@/lib/location-context";

export default function LocationsList() {
  const { activeLocation, setActiveLocationSlug } = useLocation();

  return (
    <div className="grid gap-px bg-line sm:grid-cols-2">
      {LOCATIONS.map((loc) => {
        const isActive = loc.slug === activeLocation.slug;
        return (
          <div key={loc.slug} className="bg-surface-2 p-6">
            <h2 className="font-display text-xl font-semibold text-cream">
              {loc.name}
            </h2>
            <p className="mt-2 text-sm text-steel">{loc.address}</p>
            <p className="mt-1 text-sm text-steel">{loc.phone}</p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.08em] text-gold">
              {loc.hours}
            </p>
            <button
              type="button"
              disabled={isActive}
              onClick={() => setActiveLocationSlug(loc.slug)}
              className={`mt-5 w-full border px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.08em] transition-colors ${
                isActive
                  ? "cursor-default border-tomato bg-tomato text-[#160a05]"
                  : "border-line text-steel hover:border-tomato hover:text-tomato-2"
              }`}
            >
              {isActive ? "Your Location" : "Set as My Location"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
