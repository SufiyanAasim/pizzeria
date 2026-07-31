"use client";

import { useState } from "react";
import ToppingPicker from "@/components/topping-picker";
import { useCart } from "@/lib/cart-context";
import type { MenuItem } from "@/lib/menu-data";

export default function AddToOrderButton({
  item,
  categorySlug,
}: {
  item: MenuItem;
  categorySlug: string;
}) {
  const { addLine } = useCart();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const isPizza = categorySlug === "pizza";

  function flashAdded() {
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  }

  function handleClick() {
    if (isPizza) {
      setPickerOpen(true);
      return;
    }
    addLine({
      categorySlug,
      name: item.name,
      priceCents: item.priceCents,
      quantity: 1,
      toppingIds: [],
    });
    flashAdded();
  }

  function handleToppingsConfirm(toppingIds: string[]) {
    addLine({
      categorySlug,
      name: item.name,
      priceCents: item.priceCents,
      quantity: 1,
      toppingIds,
    });
    setPickerOpen(false);
    flashAdded();
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="mt-4 w-full border border-tomato px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.08em] text-tomato-2 transition-colors hover:bg-tomato hover:text-[#160a05]"
      >
        {justAdded ? "Added ✓" : isPizza ? "Build & Add" : "Add to Order"}
      </button>
      {isPizza && (
        <ToppingPicker
          itemName={item.name}
          open={pickerOpen}
          onClose={() => setPickerOpen(false)}
          onConfirm={handleToppingsConfirm}
        />
      )}
    </>
  );
}
