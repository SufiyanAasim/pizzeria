"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { CATEGORY_ICONS } from "@/lib/category-icons";
import type { MenuCategory } from "@/lib/menu-data";

export default function CategoryMarquee({ categories }: { categories: MenuCategory[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const distance = track.scrollWidth / 2;
    const tween = gsap.to(track, {
      x: -distance,
      duration: 24,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, [categories]);

  const loop = [...categories, ...categories];

  return (
    <div className="overflow-hidden border-y border-line bg-surface py-6">
      <div ref={trackRef} className="flex w-max gap-3 px-3">
        {loop.map((category, i) => (
          <Link
            key={`${category.slug}-${i}`}
            href={`/menu?cat=${category.slug}`}
            className="flex shrink-0 items-center gap-3 border border-line bg-surface-2 px-5 py-3 transition-colors hover:border-tomato"
          >
            <span className="text-xl" aria-hidden>
              {CATEGORY_ICONS[category.slug] ?? "🍽️"}
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-cream">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
