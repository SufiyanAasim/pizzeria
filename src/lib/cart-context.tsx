"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toppingById } from "./toppings-data";

export type CartLine = {
  lineId: string;
  categorySlug: string;
  name: string;
  priceCents: number;
  quantity: number;
  toppingIds: string[];
};

type CartContextValue = {
  lines: CartLine[];
  addLine: (line: Omit<CartLine, "lineId">) => void;
  removeLine: (lineId: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  clear: () => void;
  lineTotalCents: (line: CartLine) => number;
  subtotalCents: number;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "pizzeria-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage on mount — server and first
    // client render both start empty (avoiding a hydration mismatch),
    // then this effect syncs in whatever the browser already had.
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore corrupt/inaccessible storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const addLine = useCallback((line: Omit<CartLine, "lineId">) => {
    setLines((prev) => [
      ...prev,
      { ...line, lineId: `${Date.now()}-${Math.round(Math.random() * 1e6)}` },
    ]);
  }, []);

  const removeLine = useCallback((lineId: string) => {
    setLines((prev) => prev.filter((l) => l.lineId !== lineId));
  }, []);

  const setQuantity = useCallback((lineId: string, quantity: number) => {
    setLines((prev) =>
      prev.map((l) =>
        l.lineId === lineId ? { ...l, quantity: Math.max(1, quantity) } : l
      )
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const lineTotalCents = useCallback((line: CartLine) => {
    const toppingsCents = line.toppingIds.reduce(
      (sum, id) => sum + (toppingById(id)?.priceCents ?? 0),
      0
    );
    return (line.priceCents + toppingsCents) * line.quantity;
  }, []);

  const subtotalCents = useMemo(
    () => lines.reduce((sum, l) => sum + lineTotalCents(l), 0),
    [lines, lineTotalCents]
  );

  const itemCount = useMemo(
    () => lines.reduce((n, l) => n + l.quantity, 0),
    [lines]
  );

  const value = useMemo(
    () => ({
      lines,
      addLine,
      removeLine,
      setQuantity,
      clear,
      lineTotalCents,
      subtotalCents,
      itemCount,
    }),
    [lines, addLine, removeLine, setQuantity, clear, lineTotalCents, subtotalCents, itemCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
