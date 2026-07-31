"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/menu-data";
import { toppingById } from "@/lib/toppings-data";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { lines, removeLine, setQuantity, lineTotalCents, subtotalCents } =
    useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
            className="fixed right-0 top-0 z-[65] flex h-full w-full max-w-sm flex-col border-l border-line bg-surface"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-display text-lg font-semibold text-cream">
                Your Order
              </h2>
              <button
                type="button"
                aria-label="Close cart"
                onClick={onClose}
                className="text-steel hover:text-cream"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {lines.length === 0 ? (
                <p className="mt-10 text-center text-sm text-steel">
                  Nothing on the board yet — add something from the menu.
                </p>
              ) : (
                <ul className="grid gap-4">
                  {lines.map((line) => (
                    <li key={line.lineId} className="border-b border-line pb-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-display text-sm font-semibold text-cream">
                            {line.name}
                          </p>
                          {line.toppingIds.length > 0 && (
                            <p className="mt-1 text-xs text-steel">
                              +{" "}
                              {line.toppingIds
                                .map((id) => toppingById(id)?.name)
                                .filter(Boolean)
                                .join(", ")}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          aria-label={`Remove ${line.name}`}
                          onClick={() => removeLine(line.lineId)}
                          className="text-steel hover:text-tomato-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-3 border border-line px-2 py-1">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => setQuantity(line.lineId, line.quantity - 1)}
                            className="text-steel hover:text-cream"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-4 text-center font-mono text-sm text-cream">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => setQuantity(line.lineId, line.quantity + 1)}
                            className="text-steel hover:text-cream"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-mono font-bold text-gold">
                          {formatPrice(lineTotalCents(line))}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-line px-5 py-5">
                <div className="mb-4 flex items-center justify-between font-mono text-sm">
                  <span className="text-steel">Subtotal</span>
                  <span className="font-bold text-cream">
                    {formatPrice(subtotalCents)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="block w-full border-2 border-tomato bg-tomato px-6 py-3 text-center font-sans text-sm font-bold uppercase tracking-wide text-[#160a05] transition-transform hover:-translate-y-0.5"
                >
                  Review Order
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
