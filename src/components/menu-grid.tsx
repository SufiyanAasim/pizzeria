import { formatPrice, type MenuItem } from "@/lib/menu-data";
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
        <div key={item.name} className="flex flex-col bg-surface-2 p-6">
          <div className="font-mono text-xs tracking-[0.1em] text-tomato-2">
            {String(i + 1).padStart(2, "0")}
          </div>
          <h3 className="mt-2 font-display text-lg font-semibold text-cream">
            {item.name}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-steel">
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
