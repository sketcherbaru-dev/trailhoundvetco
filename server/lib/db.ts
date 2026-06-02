import { neon } from "@neondatabase/serverless";

const connectionString =
  process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL (or POSTGRES_URL) is not set. Connect the Neon integration.",
  );
}

// Reusable tagged-template SQL client backed by Neon serverless driver.
export const sql = neon(connectionString);
