"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { LOCATIONS, locationBySlug, type Location } from "./locations-data";

type LocationContextValue = {
  activeLocation: Location;
  setActiveLocationSlug: (slug: string) => void;
};

const LocationContext = createContext<LocationContextValue | null>(null);
const STORAGE_KEY = "pizzeria-location-v1";

export function LocationProvider({ children }: { children: ReactNode }) {
  const [slug, setSlug] = useState(LOCATIONS[0].slug);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored && locationBySlug(stored)) setSlug(stored);
  }, []);

  function setActiveLocationSlug(next: string) {
    setSlug(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  const activeLocation = locationBySlug(slug) ?? LOCATIONS[0];

  return (
    <LocationContext.Provider value={{ activeLocation, setActiveLocationSlug }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation(): LocationContextValue {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocation must be used within a LocationProvider");
  return ctx;
}
