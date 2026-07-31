"use client";

import Link from "next/link";
import { useLocation } from "@/lib/location-context";

export default function SiteFooter() {
  const { activeLocation } = useLocation();

  return (
    <footer className="border-t border-line bg-surface px-5 py-10 text-center md:px-8">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-steel">
        Forged Nightly · Served Like Family
      </p>
      <p className="mt-3 text-sm text-cream">{activeLocation.name}</p>
      <p className="mt-1 text-xs text-steel">{activeLocation.address}</p>
      <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-gold">
        {activeLocation.hours}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-steel">
        <Link href="/menu" className="hover:text-tomato-2">
          Menu
        </Link>
        <Link href="/gallery" className="hover:text-tomato-2">
          Gallery
        </Link>
        <Link href="/about" className="hover:text-tomato-2">
          About
        </Link>
        <Link href="/reserve" className="hover:text-tomato-2">
          Reserve
        </Link>
        <Link href="/contact" className="hover:text-tomato-2">
          Order
        </Link>
        <Link href="/locations" className="hover:text-tomato-2">
          Locations
        </Link>
        <Link href="/credits" className="hover:text-tomato-2">
          Credits
        </Link>
      </div>
      <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-steel/70">
        &copy; {new Date().getFullYear()} PIZZEria — Mohammad Sufiyan Aasim
      </p>
    </footer>
  );
}
