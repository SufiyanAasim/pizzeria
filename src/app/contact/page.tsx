import type { Metadata } from "next";
import OrderForm from "@/components/order-form";

export const metadata: Metadata = {
  title: "Order — PIZZEria",
  description: "Request a table or place a pickup order at PIZZEria.",
};

export default function ContactPage() {
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-lg">
        <div className="mb-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
            Open Tue&ndash;Sun, 5pm till the dough runs out
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-cream md:text-5xl">
            Order Ahead
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-steel">
            Tell us what you&apos;re after and we&apos;ll get back to you
            before service.
          </p>
        </div>
        <OrderForm />
      </div>
    </section>
  );
}
