"use client";

import Link from "next/link";
import { Share2, Mail } from "lucide-react";
import { useLocation } from "@/lib/location-context";
import siteConfig from "../../config/site.json";

const EXPLORE_LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/credits", label: "Credits" },
];

const VISIT_LINKS = [
  { href: "/reserve", label: "Reserve a Table" },
  { href: "/contact", label: "Order Ahead" },
  { href: "/locations", label: "All Locations" },
];

export default function SiteFooter() {
  const { activeLocation } = useLocation();

  return (
    <footer className="border-t border-line bg-surface px-5 py-14 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="font-display text-2xl font-semibold text-cream">
            Pizz<span className="text-tomato-2 italic">e</span>ria
          </Link>
          <p className="mt-3 max-w-[26ch] text-sm leading-relaxed text-steel">
            {siteConfig.tagline} — wood-fired, cast-iron, no shortcuts.
          </p>
          <div className="mt-5 flex items-center gap-4">
            {siteConfig.social.instagram && (
              <a
                href={siteConfig.social.instagram}
                aria-label="Follow on Instagram"
                className="text-steel hover:text-tomato-2"
              >
                <Share2 size={18} />
              </a>
            )}
            {siteConfig.social.email && (
              <a
                href={`mailto:${siteConfig.social.email}`}
                aria-label="Email"
                className="text-steel hover:text-tomato-2"
              >
                <Mail size={18} />
              </a>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-gold">
            Explore
          </h3>
          <ul className="mt-4 grid gap-2.5">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-steel hover:text-tomato-2">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-gold">
            Visit
          </h3>
          <ul className="mt-4 grid gap-2.5">
            {VISIT_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-steel hover:text-tomato-2">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-gold">
            {activeLocation.name}
          </h3>
          <p className="mt-4 text-sm text-steel">{activeLocation.address}</p>
          <p className="mt-1 text-sm text-steel">{activeLocation.phone}</p>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.08em] text-tomato-2">
            {activeLocation.hours}
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-line pt-6 text-center">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-steel/70">
          &copy; {new Date().getFullYear()} PIZZEria — Mohammad Sufiyan Aasim
        </p>
      </div>
    </footer>
  );
}
