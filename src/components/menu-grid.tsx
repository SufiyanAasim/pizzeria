import { formatPrice, type MenuItem } from "@/lib/menu-data";
import { CATEGORY_ICONS } from "@/lib/category-icons";
import AddToOrderButton from "@/components/add-to-order-button";

export default function MenuGrid({
  items,
  categorySlug,
  orderable = true,
}: {
  items: MenuItem[];
  categorySlug?: string;
  orderable?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <div
          key={item.name}
          className="group flex flex-col bg-surface-2 p-6 transition-colors hover:bg-[#241d16]"
        >
          <div className="flex items-start gap-4">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105"
              style={{
                background:
                  "radial-gradient(circle at 40% 35%, #e6b062, #8a4a1e 70%, #3d1c08)",
                boxShadow:
                  "0 0 18px rgba(209,80,47,.2), inset 0 0 10px rgba(0,0,0,.5)",
              }}
              aria-hidden
            >
              <span className="text-2xl">
                {CATEGORY_ICONS[categorySlug ?? ""] ?? "🍽️"}
              </span>
            </div>
            <div>
              <div className="font-mono text-xs tracking-[0.1em] text-tomato-2">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-1 font-display text-lg font-semibold text-cream">
                {item.name}
              </h3>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-steel">
            {item.description}
          </p>
          <div className="mt-4 font-mono font-bold text-gold">
            {formatPrice(item.priceCents)}
          </div>
          {orderable && categorySlug && (
            <AddToOrderButton item={item} categorySlug={categorySlug} />
          )}
        </div>
      ))}
    </div>
  );
}
