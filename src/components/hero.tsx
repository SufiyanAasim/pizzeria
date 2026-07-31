"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

const TOPPINGS = [
  { emoji: "🫒", top: "8%", left: "18%", size: "1.6rem", delay: 0 },
  { emoji: "🌶️", top: "14%", left: "72%", size: "1.9rem", delay: 0.4 },
  { emoji: "🧀", top: "62%", left: "12%", size: "2rem", delay: 0.8 },
  { emoji: "🍄", top: "70%", left: "80%", size: "1.7rem", delay: 1.2 },
  { emoji: "🌿", top: "40%", left: "88%", size: "1.5rem", delay: 1.6 },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const toppingsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const hero = heroRef.current;
    const spot = spotRef.current;
    if (!hero || !spot) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const handleMove = (e: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      spot.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      spot.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    hero.addEventListener("pointermove", handleMove);

    let floatTweens: gsap.core.Tween[] = [];
    if (!prefersReduced) {
      floatTweens = toppingsRef.current
        .filter((el): el is HTMLSpanElement => Boolean(el))
        .map((el, i) =>
          gsap.to(el, {
            y: i % 2 === 0 ? -16 : 14,
            rotation: i % 2 === 0 ? 8 : -8,
            duration: 2.6 + i * 0.3,
            delay: i * 0.15,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          })
        );
    }

    return () => {
      hero.removeEventListener("pointermove", handleMove);
      floatTweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative isolate overflow-hidden px-5 pb-24 pt-28 text-center md:px-8 md:pb-32 md:pt-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(#332a20 1px, transparent 1px), linear-gradient(90deg, #332a20 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        ref={spotRef}
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 30%), rgba(242,146,107,0.16), transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
          Wood ¬ Fire ¬ Since the Corner Oven
        </p>
        <h1 className="mt-6 font-display text-5xl font-semibold leading-[0.95] tracking-tight text-cream md:text-7xl">
          Pizz<em className="text-tomato-2 not-italic">e</em>ria
          <span className="mt-4 block font-sans text-sm font-normal uppercase tracking-[0.32em] text-steel">
            Forno &amp; Tavola
          </span>
        </h1>
        <p className="mt-6 text-balance text-base leading-relaxed text-cream/80 md:text-lg">
          The oven&apos;s still industrial — 900°F, cast iron, no shortcuts —
          but the table is set like family&apos;s coming over.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/menu"
            className="border-2 border-tomato bg-tomato px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-wide text-[#160a05] transition-transform hover:-translate-y-0.5"
          >
            See the Board
          </Link>
          <Link
            href="/contact"
            className="border-2 border-tomato px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-wide text-tomato-2 transition-transform hover:-translate-y-0.5"
          >
            Order Ahead
          </Link>
        </div>

        <div className="relative mx-auto mt-14 h-48 w-48 md:h-56 md:w-56">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 40% 35%, #e6b062, #8a4a1e 70%, #3d1c08)",
              boxShadow:
                "0 0 50px rgba(209,80,47,.3), inset 0 0 26px rgba(0,0,0,.5)",
            }}
          />
          {TOPPINGS.map((t, i) => (
            <span
              key={t.emoji + i}
              ref={(el) => {
                toppingsRef.current[i] = el;
              }}
              className="absolute select-none drop-shadow-lg"
              style={{ top: t.top, left: t.left, fontSize: t.size }}
            >
              {t.emoji}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
