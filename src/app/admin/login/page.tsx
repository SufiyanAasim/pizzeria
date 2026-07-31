"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Login failed.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong — try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-5 py-20">
      <div className="w-full max-w-sm">
        <p className="text-center font-mono text-xs uppercase tracking-[0.3em] text-gold">
          Staff Only
        </p>
        <h1 className="mt-4 text-center font-display text-3xl font-semibold text-cream">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
          <label className="grid gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-steel">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="border border-line bg-surface-2 px-4 py-3 text-cream outline-none focus:border-tomato"
            />
          </label>
          {error && (
            <p className="text-sm text-tomato-2" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 border-2 border-tomato bg-tomato px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-wide text-[#160a05] transition-transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {loading ? "Checking…" : "Log In"}
          </button>
        </form>
      </div>
    </section>
  );
}
