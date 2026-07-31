"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { formatPrice } from "@/lib/menu-data";

type Category = { slug: string; name: string; sortOrder: number };
type Item = {
  id: number;
  categorySlug: string;
  name: string;
  description: string;
  priceCents: number;
};

async function api(path: string, options: RequestInit = {}) {
  const res = await fetch(path, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? "Request failed.");
  return data;
}

export default function AdminDashboard({
  categories,
  items,
}: {
  categories: Category[];
  items: Item[];
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  function refresh() {
    router.refresh();
  }

  async function handleLogout() {
    await api("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  async function handleAddCategory(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    try {
      await api("/api/admin/categories", {
        method: "POST",
        body: JSON.stringify({ name: form.get("name") }),
      });
      e.currentTarget.reset();
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add category.");
    }
  }

  async function handleDeleteCategory(slug: string) {
    if (!confirm(`Delete "${slug}" and every item in it?`)) return;
    setError(null);
    try {
      await api(`/api/admin/categories/${slug}`, { method: "DELETE" });
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete category.");
    }
  }

  async function handleAddItem(categorySlug: string, e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    try {
      await api("/api/admin/items", {
        method: "POST",
        body: JSON.stringify({
          categorySlug,
          name: form.get("name"),
          description: form.get("description"),
          priceCents: Math.round(Number(form.get("price")) * 100),
        }),
      });
      e.currentTarget.reset();
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add item.");
    }
  }

  async function handleUpdateItem(id: number, e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    try {
      await api(`/api/admin/items/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: form.get("name"),
          description: form.get("description"),
          priceCents: Math.round(Number(form.get("price")) * 100),
        }),
      });
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update item.");
    }
  }

  async function handleDeleteItem(id: number) {
    if (!confirm("Delete this item?")) return;
    setError(null);
    try {
      await api(`/api/admin/items/${id}`, { method: "DELETE" });
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete item.");
    }
  }

  return (
    <div className="grid gap-10">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleLogout}
          className="font-mono text-xs uppercase tracking-[0.1em] text-steel hover:text-tomato-2"
        >
          Log Out
        </button>
      </div>

      {error && (
        <p className="border border-tomato bg-tomato/10 px-4 py-3 text-sm text-tomato-2" role="alert">
          {error}
        </p>
      )}

      <form onSubmit={handleAddCategory} className="flex flex-wrap items-end gap-3 border border-line bg-surface-2 p-5">
        <label className="grid flex-1 gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-steel">
            New category name
          </span>
          <input
            name="name"
            required
            placeholder="e.g. Salads"
            className="border border-line bg-bg px-4 py-2.5 text-cream outline-none focus:border-tomato"
          />
        </label>
        <button
          type="submit"
          className="border-2 border-tomato bg-tomato px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-wide text-[#160a05]"
        >
          Add Category
        </button>
      </form>

      {categories.map((category) => (
        <div key={category.slug} className="border border-line">
          <div className="flex items-center justify-between border-b border-line bg-surface-2 px-5 py-3">
            <h2 className="font-display text-lg font-semibold text-cream">
              {category.name}
              <span className="ml-2 font-mono text-xs font-normal text-steel">
                /{category.slug}
              </span>
            </h2>
            <button
              type="button"
              onClick={() => handleDeleteCategory(category.slug)}
              className="font-mono text-xs uppercase tracking-[0.08em] text-steel hover:text-tomato-2"
            >
              Delete Category
            </button>
          </div>

          <div className="grid gap-px bg-line">
            {items
              .filter((i) => i.categorySlug === category.slug)
              .map((item) => (
                <ItemRow key={item.id} item={item} onUpdate={handleUpdateItem} onDelete={handleDeleteItem} />
              ))}
          </div>

          <form
            onSubmit={(e) => handleAddItem(category.slug, e)}
            className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-[1fr_2fr_100px_auto]"
          >
            <input
              name="name"
              required
              placeholder="Item name"
              className="border border-line bg-surface-2 px-3 py-2 text-sm text-cream outline-none focus:border-tomato"
            />
            <input
              name="description"
              required
              placeholder="Short description"
              className="border border-line bg-surface-2 px-3 py-2 text-sm text-cream outline-none focus:border-tomato"
            />
            <input
              name="price"
              type="number"
              step="0.01"
              min="0.01"
              required
              placeholder="$"
              className="border border-line bg-surface-2 px-3 py-2 text-sm text-cream outline-none focus:border-tomato"
            />
            <button
              type="submit"
              className="border border-tomato px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-tomato-2 hover:bg-tomato hover:text-[#160a05]"
            >
              Add Item
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}

function ItemRow({
  item,
  onUpdate,
  onDelete,
}: {
  item: Item;
  onUpdate: (id: number, e: FormEvent<HTMLFormElement>) => void;
  onDelete: (id: number) => void;
}) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <form
        onSubmit={(e) => {
          onUpdate(item.id, e);
          setEditing(false);
        }}
        className="grid grid-cols-1 gap-3 bg-surface-2 p-4 sm:grid-cols-[1fr_2fr_100px_auto_auto]"
      >
        <input
          name="name"
          defaultValue={item.name}
          required
          className="border border-line bg-bg px-3 py-2 text-sm text-cream outline-none focus:border-tomato"
        />
        <input
          name="description"
          defaultValue={item.description}
          required
          className="border border-line bg-bg px-3 py-2 text-sm text-cream outline-none focus:border-tomato"
        />
        <input
          name="price"
          type="number"
          step="0.01"
          min="0.01"
          defaultValue={(item.priceCents / 100).toFixed(2)}
          required
          className="border border-line bg-bg px-3 py-2 text-sm text-cream outline-none focus:border-tomato"
        />
        <button type="submit" className="border border-tomato px-4 py-2 font-mono text-xs font-bold uppercase text-tomato-2">
          Save
        </button>
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="font-mono text-xs uppercase text-steel hover:text-cream"
        >
          Cancel
        </button>
      </form>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-2 p-4">
      <div>
        <p className="font-display text-sm font-semibold text-cream">{item.name}</p>
        <p className="mt-0.5 text-xs text-steel">{item.description}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm font-bold text-gold">{formatPrice(item.priceCents)}</span>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="font-mono text-xs uppercase tracking-[0.08em] text-tomato-2 hover:text-gold"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(item.id)}
          className="font-mono text-xs uppercase tracking-[0.08em] text-steel hover:text-tomato-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
