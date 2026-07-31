export type Topping = {
  id: string;
  name: string;
  priceCents: number;
};

/**
 * Extra toppings, offered for pizza items in the order builder.
 * Kept separate from menu-data.ts since they're add-ons, not dishes.
 */
export const TOPPINGS: Topping[] = [
  { id: "extra-cheese", name: "Extra fior di latte", priceCents: 200 },
  { id: "pepperoni", name: "Pepperoni", priceCents: 250 },
  { id: "mushroom", name: "Wild mushroom", priceCents: 200 },
  { id: "olives", name: "Olives", priceCents: 150 },
  { id: "jalapenos", name: "Jalapeños", priceCents: 150 },
  { id: "red-onion", name: "Charred red onion", priceCents: 150 },
  { id: "basil", name: "Fresh basil", priceCents: 100 },
  { id: "chili-flakes", name: "Chili flakes", priceCents: 100 },
  { id: "nduja", name: "Extra nduja", priceCents: 300 },
  { id: "truffle", name: "Truffle drizzle", priceCents: 350 },
];

export function toppingById(id: string): Topping | undefined {
  return TOPPINGS.find((t) => t.id === id);
}
