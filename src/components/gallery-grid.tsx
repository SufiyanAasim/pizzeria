"use client";

import { motion } from "framer-motion";
import type { MenuCategory } from "@/lib/menu-data";
import { CATEGORY_ICONS } from "@/lib/category-icons";

export default function GalleryGrid({ categories }: { categories: MenuCategory[] }) {
  return (
    <div className="grid gap-16">
      {categories.map((category) => (
        <section key={category.slug}>
          <h2 className="mb-6 font-display text-2xl font-semibold text-cream">
            {category.name}
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {category.items.map((item, i) => (
              <motion.figure
                key={item.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="text-center"
              >
                <div
                  className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full sm:h-32 sm:w-32"
                  style={{
                    background:
                      "radial-gradient(circle at 40% 35%, #e6b062, #8a4a1e 70%, #3d1c08)",
                    boxShadow:
                      "0 0 30px rgba(209,80,47,.25), inset 0 0 16px rgba(0,0,0,.5)",
                  }}
                >
                  <span className="text-4xl" aria-hidden>
                    {CATEGORY_ICONS[category.slug] ?? "🍽️"}
                  </span>
                </div>
                <figcaption className="mt-3 font-display text-sm font-semibold text-cream">
                  {item.name}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
