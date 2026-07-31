"use client";

import { useState, type FormEvent } from "react";

const RESTAURANT_EMAIL = "orders@pizzeria.example";

export default function OrderForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const party = String(form.get("party") ?? "");
    const message = String(form.get("message") ?? "");

    const subject = encodeURIComponent(`Order / Table request — ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nParty size: ${party}\n\n${message}`
    );
    window.location.href = `mailto:${RESTAURANT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-line bg-surface-2 p-8 text-center">
        <p className="font-display text-xl font-semibold text-cream">
          Your mail app should be open.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-steel">
          Send it over and we&apos;ll confirm your table or order within the
          hour during service.
        </p>
      </div>
    );
  }

  return (
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
          Party size
        </span>
        <input
          name="party"
          type="number"
          min={1}
          required
          className="border border-line bg-surface-2 px-4 py-3 text-cream outline-none focus:border-tomato"
        />
      </label>
      <label className="grid gap-2">
        <span className="font-mono text-xs uppercase tracking-[0.1em] text-steel">
          What you&apos;re after
        </span>
        <textarea
          name="message"
          rows={4}
          placeholder="Table for tonight, pickup order, dietary notes…"
          className="border border-line bg-surface-2 px-4 py-3 text-cream outline-none focus:border-tomato"
        />
      </label>
      <button
        type="submit"
        className="mt-2 border-2 border-tomato bg-tomato px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-wide text-[#160a05] transition-transform hover:-translate-y-0.5"
      >
        Send Request
      </button>
    </form>
  );
}
