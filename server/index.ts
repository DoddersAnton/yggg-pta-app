import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/server/schema";

const databaseUrl =
  process.env.NEXT_PUBLIC_DATABASE_URL ??
  process.env.DATABASE_URL ??
  "postgresql://user:pass@localhost:5432/local";

const sql = neon(databaseUrl);
export const db = drizzle({ client: sql, schema, logger: true });
