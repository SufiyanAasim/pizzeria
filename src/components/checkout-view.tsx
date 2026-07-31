"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/menu-data";
import { toppingById } from "@/lib/toppings-data";
import siteConfig from "../../config/site.json";

export default function CheckoutView() {
  const { lines, lineTotalCents, subtotalCents, clear } = useCart();
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const contact = String(form.get("contact") ?? "");
    const notes = String(form.get("notes") ?? "");

    const itemLines = lines
      .map((line) => {
        const toppings = line.toppingIds
          .map((id) => toppingById(id)?.name)
          .filter(Boolean)
          .join(", ");
        return `${line.quantity}x ${line.name}${toppings ? ` (+ ${toppings})` : ""} — ${formatPrice(
          lineTotalCents(line)
        )}`;
      })
      .join("\n");

    const subject = encodeURIComponent(`Order — ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nContact: ${contact}\n\n${itemLines}\n\nSubtotal: ${formatPrice(
        subtotalCents
      )}\n\nNotes: ${notes}`
    );
    window.location.href = `mailto:${siteConfig.social.email}?subject=${subject}&body=${body}`;
    setSent(true);
    clear();
  }

  if (sent) {
    return (
      <div className="border border-line bg-surface-2 p-8 text-center">
        <p className="font-display text-xl font-semibold text-cream">
          Your mail app should be open.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-steel">
          Send it over and we&apos;ll confirm before service. No payment is
          collected here — we&apos;ll settle up when you arrive or on
          delivery.
        </p>
        <Link
          href="/menu"
          className="mt-6 inline-block border-2 border-tomato px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-wide text-tomato-2"
        >
          Back to Menu
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="border border-line bg-surface-2 p-8 text-center">
        <p className="text-sm text-steel">
          Your order is empty — add something from the menu first.
        </p>
        <Link
          href="/menu"
          className="mt-6 inline-block border-2 border-tomato px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-wide text-tomato-2"
        >
          View Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8">
      <ul className="grid gap-3 border border-line bg-surface-2 p-5">
        {lines.map((line) => (
          <li key={line.lineId} className="flex items-start justify-between gap-4 text-sm">
            <div>
              <span className="text-cream">
                {line.quantity}&times; {line.name}
              </span>
              {line.toppingIds.length > 0 && (
                <p className="mt-0.5 text-xs text-steel">
                  +{" "}
                  {line.toppingIds
                    .map((id) => toppingById(id)?.name)
                    .filter(Boolean)
                    .join(", ")}
                </p>
              )}
            </div>
            <span className="font-mono text-gold">
              {formatPrice(lineTotalCents(line))}
            </span>
          </li>
        ))}
        <li className="mt-2 flex items-center justify-between border-t border-line pt-3 font-mono text-sm font-bold">
          <span className="text-cream">Subtotal</span>
          <span className="text-gold">{formatPrice(subtotalCents)}</span>
        </li>
      </ul>

      <form onSubmit={handleSubmit} className="grid gap-5">
        <label className="grid gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-steel">
            Name
          </span>
          <input
            name="name"
            required
            className="border border-line bg-surface-2 px-4 py-3 text-cream outline-none focus:border-tomato"
          />
        </label>
        <label className="grid gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-steel">
            Phone or email
          </span>
          <input
            name="contact"
            required
            className="border border-line bg-surface-2 px-4 py-3 text-cream outline-none focus:border-tomato"
          />
        </label>
        <label className="grid gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-steel">
            Notes
          </span>
          <textarea
            name="notes"
            rows={3}
            placeholder="Pickup time, dietary notes…"
            className="border border-line bg-surface-2 px-4 py-3 text-cream outline-none focus:border-tomato"
          />
        </label>
        <button
          type="submit"
          className="mt-2 border-2 border-tomato bg-tomato px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-wide text-[#160a05] transition-transform hover:-translate-y-0.5"
        >
          Send Order
        </button>
        <p className="text-center text-xs text-steel">
          No payment is collected here — this opens your mail app with the
          order pre-filled.
        </p>
      </form>
    </div>
  );
}
