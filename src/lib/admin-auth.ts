import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "pizzeria_admin_session";
const SESSION_MESSAGE = "pizzeria-admin-authenticated";

function secret(): string {
  const value = process.env.ADMIN_PASSWORD;
  if (!value) {
    throw new Error(
      "ADMIN_PASSWORD is not set — the admin panel is disabled until it is."
    );
  }
  return value;
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function checkPassword(candidate: string): boolean {
  const expected = Buffer.from(secret());
  const given = Buffer.from(candidate);
  if (expected.length !== given.length) return false;
  return timingSafeEqual(expected, given);
}

export function makeSessionToken(): string {
  return createHmac("sha256", secret()).update(SESSION_MESSAGE).digest("hex");
}

function isValidToken(token: string | undefined): boolean {
  if (!token) return false;
  const expected = Buffer.from(makeSessionToken());
  const given = Buffer.from(token);
  if (expected.length !== given.length) return false;
  return timingSafeEqual(expected, given);
}

/** Server Components / pages: read the session cookie directly. */
export async function isAdminSession(): Promise<boolean> {
  if (!isAdminConfigured()) return false;
  const store = await cookies();
  return isValidToken(store.get(ADMIN_COOKIE)?.value);
}

/** Route handlers: read the session cookie from a NextRequest. */
export function isAdminRequest(request: Request): boolean {
  if (!isAdminConfigured()) return false;
  const header = request.headers.get("cookie") ?? "";
  const match = header.match(new RegExp(`${ADMIN_COOKIE}=([^;]+)`));
  return isValidToken(match?.[1]);
}
