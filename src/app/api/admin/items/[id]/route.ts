import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { menuItems } from "@/db/schema";
import { isAdminRequest } from "@/lib/admin-auth";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!db) {
    return NextResponse.json(
      { error: "No database configured (TURSO_DATABASE_URL unset)." },
      { status: 503 }
    );
  }

  const { id } = await params;
  const itemId = Number(id);
  if (!Number.isInteger(itemId)) {
    return NextResponse.json({ error: "Invalid item id." }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const description = typeof body?.description === "string" ? body.description.trim() : "";
  const priceCents = Number(body?.priceCents);

  if (!name || !description || !Number.isFinite(priceCents) || priceCents <= 0) {
    return NextResponse.json(
      { error: "name, description, and a positive priceCents are required." },
      { status: 400 }
    );
  }

  await db
    .update(menuItems)
    .set({ name, description, priceCents: Math.round(priceCents) })
    .where(eq(menuItems.id, itemId));

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!db) {
    return NextResponse.json(
      { error: "No database configured (TURSO_DATABASE_URL unset)." },
      { status: 503 }
    );
  }

  const { id } = await params;
  const itemId = Number(id);
  if (!Number.isInteger(itemId)) {
    return NextResponse.json({ error: "Invalid item id." }, { status: 400 });
  }

  await db.delete(menuItems).where(eq(menuItems.id, itemId));
  return NextResponse.json({ ok: true });
}
