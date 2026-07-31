"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuGrid from "@/components/menu-grid";
import type { MenuCategory } from "@/lib/menu-data";

export default function MenuTabs({
  categories,
  initialSlug,
}: {
  categories: MenuCategory[];
  initialSlug?: string;
}) {
  const [active, setActive] = useState(
    categories.find((c) => c.slug === initialSlug)?.slug ?? categories[0]?.slug
  );
  const activeCategory = categories.find((c) => c.slug === active) ?? categories[0];
  const total = categories.reduce((n, c) => n + c.items.length, 0);

  return (
    <div>
      <div className="mb-2 text-center font-mono text-xs uppercase tracking-[0.14em] text-steel">
        {activeCategory?.name} &middot;{" "}
        {String(activeCategory?.items.length ?? 0).padStart(2, "0")} of{" "}
        {String(total).padStart(2, "0")} shown
      </div>

      <div className="mb-10 flex flex-wrap justify-center gap-px bg-line">
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setActive(c.slug)}
            className={`px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-[0.08em] transition-colors ${
              c.slug === active
                ? "bg-tomato text-[#160a05]"
                : "bg-surface-2 text-steel hover:text-cream"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <MenuGrid
            items={activeCategory?.items ?? []}
            categorySlug={activeCategory?.slug}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
