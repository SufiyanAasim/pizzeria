import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { menuItems } from "@/db/schema";
import { isAdminRequest } from "@/lib/admin-auth";

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
  const categorySlug = typeof body?.categorySlug === "string" ? body.categorySlug : "";
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const description = typeof body?.description === "string" ? body.description.trim() : "";
  const priceCents = Number(body?.priceCents);

  if (!categorySlug || !name || !description || !Number.isFinite(priceCents) || priceCents <= 0) {
    return NextResponse.json(
      { error: "categorySlug, name, description, and a positive priceCents are required." },
      { status: 400 }
    );
  }

  const [last] = await db
    .select()
    .from(menuItems)
    .where(eq(menuItems.categorySlug, categorySlug))
    .orderBy(desc(menuItems.sortOrder))
    .limit(1);
  const sortOrder = (last?.sortOrder ?? -1) + 1;

  const [created] = await db
    .insert(menuItems)
    .values({ categorySlug, name, description, priceCents: Math.round(priceCents), sortOrder })
    .returning();

  return NextResponse.json({ ok: true, item: created }, { status: 201 });
}
