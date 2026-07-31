import { describe, expect, it } from "vitest";
import { MENU, formatPrice } from "@/lib/menu-data";

describe("formatPrice", () => {
  it("formats whole-dollar cent amounts", () => {
    expect(formatPrice(1800)).toBe("$18");
    expect(formatPrice(600)).toBe("$6");
  });
});

describe("MENU", () => {
  it("has a unique slug per category", () => {
    const slugs = MENU.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("gives every item a positive price", () => {
    for (const category of MENU) {
      for (const item of category.items) {
        expect(item.priceCents).toBeGreaterThan(0);
      }
    }
  });

  it("includes the categories requested for the full kitchen menu", () => {
    const slugs = MENU.map((c) => c.slug);
    expect(slugs).toEqual(
      expect.arrayContaining(["pizza", "pasta", "ramen", "sides", "dessert", "drinks"])
    );
  });
});
