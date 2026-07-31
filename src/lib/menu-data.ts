export type MenuItem = {
  name: string;
  description: string;
  priceCents: number;
};

export type MenuCategory = {
  slug: string;
  name: string;
  items: MenuItem[];
};

/**
 * Static fallback menu — the site's source of truth when no Turso
 * database is configured, and the data the seed script writes to
 * Turso when one is.
 */
export const MENU: MenuCategory[] = [
  {
    slug: "pizza",
    name: "Pizza",
    items: [
      { name: "Diavola", description: "Nduja, honey, chili oil, fior di latte", priceCents: 1800 },
      { name: "Affumicata", description: "Smoked mozzarella, charred leek, pancetta", priceCents: 1900 },
      { name: "Funghi Nero", description: "Wild mushroom, truffle, black garlic", priceCents: 2000 },
      { name: "Margherita", description: "San Marzano, basil, 24-mo parmesan", priceCents: 1600 },
    ],
  },
  {
    slug: "pasta",
    name: "Pasta",
    items: [
      { name: "Lasagna al Forno", description: "Beef ragu, béchamel, three-cheese bake", priceCents: 2100 },
      { name: "Cacio e Pepe", description: "Black pepper, pecorino, tonnarelli", priceCents: 1700 },
      { name: "Rigatoni Diavola", description: "Spicy tomato, guanciale, chili", priceCents: 1800 },
    ],
  },
  {
    slug: "ramen",
    name: "Ramen",
    items: [
      { name: "Tonkotsu Forno", description: "Slow pork broth, chashu, ajitama egg", priceCents: 1900 },
      { name: "Miso Charcoal", description: "Roasted miso, charred corn, scallion", priceCents: 1800 },
      { name: "Spicy Shoyu", description: "Chili oil, bamboo, soft egg", priceCents: 1800 },
    ],
  },
  {
    slug: "sides",
    name: "Sides",
    items: [
      { name: "Steel-Cut Chips", description: "Rosemary salt, garlic aioli", priceCents: 800 },
      { name: "Charred Focaccia", description: "Olive oil, sea salt, herbs", priceCents: 700 },
      { name: "Blistered Peppers", description: "Padrón, smoked salt, lemon", priceCents: 900 },
    ],
  },
  {
    slug: "dessert",
    name: "Dessert",
    items: [
      { name: "Torched Tiramisu", description: "Espresso, mascarpone, cocoa ash", priceCents: 1000 },
      { name: "Olive Oil Cake", description: "Citrus glaze, sea salt", priceCents: 900 },
      { name: "Affogato", description: "Vanilla gelato, double espresso", priceCents: 800 },
    ],
  },
  {
    slug: "drinks",
    name: "Drinks",
    items: [
      { name: "Blood Orange Spritz", description: "Aperitivo, soda, orange", priceCents: 1200 },
      { name: "House Red / White", description: "Rotating Italian selection", priceCents: 1100 },
      { name: "Iron Press Coffee", description: "Cold brew, oat option", priceCents: 600 },
    ],
  },
];

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(0)}`;
}
