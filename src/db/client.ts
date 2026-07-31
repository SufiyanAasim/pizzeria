import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

/**
 * Turso is optional. Without TURSO_DATABASE_URL set, `db` is null and
 * callers fall back to the static menu in src/lib/menu-data.ts — the
 * site stays fully functional as a static showcase with no database.
 */
export const db = process.env.TURSO_DATABASE_URL
  ? drizzle(
      createClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
      }),
      { schema }
    )
  : null;
