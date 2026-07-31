"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { TOPPINGS } from "@/lib/toppings-data";
import { formatPrice } from "@/lib/menu-data";

export default function ToppingPicker({
  itemName,
  open,
  onClose,
  onConfirm,
}: {
  itemName: string;
  open: boolean;
  onClose: () => void;
  onConfirm: (toppingIds: string[]) => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  function handleConfirm() {
    onConfirm(selected);
    setSelected([]);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md border border-line bg-surface-2 p-6 sm:border-2"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-gold">
                  Build your pizza
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-cream">
                  {itemName}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="text-steel hover:text-cream"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid max-h-64 gap-2 overflow-y-auto pr-1">
              {TOPPINGS.map((t) => (
                <label
                  key={t.id}
                  className="flex cursor-pointer items-center justify-between border border-line px-4 py-2.5 text-sm"
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(t.id)}
                      onChange={() => toggle(t.id)}
                      className="h-4 w-4 accent-tomato"
                    />
                    <span className="text-cream">{t.name}</span>
                  </span>
                  <span className="font-mono text-gold">
                    +{formatPrice(t.priceCents)}
                  </span>
                </label>
              ))}
            </div>

            <button
              type="button"
              onClick={handleConfirm}
              className="mt-6 w-full border-2 border-tomato bg-tomato px-6 py-3 font-sans text-sm font-bold uppercase tracking-wide text-[#160a05] transition-transform hover:-translate-y-0.5"
            >
              Add to Order
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
