"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Menu, X, ShoppingBag, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";

// Deferred: only needed once a visitor actually opens the cart, so it
// doesn't add to the JS every page load has to parse up front.
const CartDrawer = dynamic(() => import("@/components/cart-drawer"), {
  ssr: false,
});

const NAV_LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/reserve", label: "Reserve" },
  { href: "/locations", label: "Locations" },
  { href: "/credits", label: "Credits" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartTouched, setCartTouched] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-cream">
          Pizz<span className="text-tomato-2 italic">e</span>ria
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-[0.14em] text-steel transition-colors hover:text-tomato-2"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            aria-label="Staff admin login"
            className="hidden items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-steel/70 transition-colors hover:text-tomato-2 lg:flex"
          >
            <Lock size={12} />
            Admin
          </Link>

          <button
            type="button"
            aria-label="Open cart"
            onClick={() => {
              setCartTouched(true);
              setCartOpen(true);
            }}
            className="relative flex h-10 w-10 items-center justify-center border border-line text-cream hover:border-tomato"
          >
            <ShoppingBag size={17} />
            {itemCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center bg-tomato px-1 font-mono text-[0.6rem] font-bold text-[#160a05]">
                {itemCount}
              </span>
            )}
          </button>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center border border-line text-cream lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-line bg-surface lg:hidden"
          >
            <div className="flex flex-col px-5 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line/60 py-3 font-mono text-xs uppercase tracking-[0.14em] text-steel last:border-b-0 hover:text-tomato-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="mt-3 flex items-center gap-2 pt-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-steel/70 hover:text-tomato-2"
              >
                <Lock size={12} />
                Staff Admin Login
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {cartTouched && (
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      )}
    </header>
  );
}
