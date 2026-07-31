import type { Metadata } from "next";
import CheckoutView from "@/components/checkout-view";

export const metadata: Metadata = {
  title: "Checkout — PIZZEria",
  description: "Review your order and send it to PIZZEria.",
};

export default function CheckoutPage() {
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-lg">
        <div className="mb-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
            Review
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-cream md:text-5xl">
            Your Order
          </h1>
        </div>
        <CheckoutView />
      </div>
    </section>
  );
}
