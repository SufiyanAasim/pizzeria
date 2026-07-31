import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { categories, menuItems } from "@/db/schema";
import { isAdminRequest } from "@/lib/admin-auth";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
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

  const { slug } = await params;
  await db.delete(menuItems).where(eq(menuItems.categorySlug, slug));
  await db.delete(categories).where(eq(categories.slug, slug));
  return NextResponse.json({ ok: true });
}
