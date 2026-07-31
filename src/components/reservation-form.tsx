"use client";

import { useState, type FormEvent } from "react";
import siteConfig from "../../config/site.json";

export default function ReservationForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const date = String(form.get("date") ?? "");
    const time = String(form.get("time") ?? "");
    const party = String(form.get("party") ?? "");
    const notes = String(form.get("notes") ?? "");

    const subject = encodeURIComponent(`Reservation request — ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nDate: ${date}\nTime: ${time}\nParty size: ${party}\n\n${notes}`
    );
    window.location.href = `mailto:${siteConfig.social.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-line bg-surface-2 p-8 text-center">
        <p className="font-display text-xl font-semibold text-cream">
          Your mail app should be open.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-steel">
          Send it over and we&apos;ll confirm your table before service.
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
      <div className="grid grid-cols-2 gap-4">
        <label className="grid gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-steel">
            Date
          </span>
          <input
            name="date"
            type="date"
            required
            className="border border-line bg-surface-2 px-4 py-3 text-cream outline-none focus:border-tomato"
          />
        </label>
        <label className="grid gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-steel">
            Time
          </span>
          <input
            name="time"
            type="time"
            required
            className="border border-line bg-surface-2 px-4 py-3 text-cream outline-none focus:border-tomato"
          />
        </label>
      </div>
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
          Notes
        </span>
        <textarea
          name="notes"
          rows={3}
          placeholder="Dietary notes, occasion, seating preference…"
          className="border border-line bg-surface-2 px-4 py-3 text-cream outline-none focus:border-tomato"
        />
      </label>
      <button
        type="submit"
        className="mt-2 border-2 border-tomato bg-tomato px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-wide text-[#160a05] transition-transform hover:-translate-y-0.5"
      >
        Request Table
      </button>
    </form>
  );
}
