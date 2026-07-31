import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { categories } from "@/db/schema";
import { isAdminRequest } from "@/lib/admin-auth";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!db) {
    return NextResponse.json(
      { error: "No database configured (TURSO_DATABASE_URL unset)." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  if (!name) {
    return NextResponse.json({ error: "Category name is required." }, { status: 400 });
  }

  const slug = slugify(name);
  if (!slug) {
    return NextResponse.json({ error: "Could not derive a slug from that name." }, { status: 400 });
  }

  const existing = await db.select().from(categories).where(eq(categories.slug, slug));
  if (existing.length > 0) {
    return NextResponse.json({ error: "A category with that name already exists." }, { status: 409 });
  }

  const [last] = await db.select().from(categories).orderBy(desc(categories.sortOrder)).limit(1);
  const sortOrder = (last?.sortOrder ?? -1) + 1;

  await db.insert(categories).values({ slug, name, sortOrder });
  return NextResponse.json({ ok: true, slug }, { status: 201 });
}
