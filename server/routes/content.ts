import { Router } from "express";
import { sql } from "../lib/db";
import { requireAdmin } from "../lib/auth";

// ---------- Public read routes ----------
export const publicContent = Router();

publicContent.get("/articles", async (_req, res) => {
  const rows = await sql`
    SELECT * FROM articles WHERE published = TRUE
    ORDER BY sort_order ASC, created_at DESC
  `;
  res.json(rows);
});

publicContent.get("/articles/:id", async (req, res) => {
  const rows = await sql`
    SELECT * FROM articles WHERE id = ${req.params.id} AND published = TRUE
  `;
  if (rows.length === 0) return res.status(404).json({ error: "Not found" });
  res.json(rows[0]);
});

publicContent.get("/products", async (_req, res) => {
  const rows = await sql`
    SELECT * FROM products WHERE published = TRUE
    ORDER BY sort_order ASC, created_at DESC
  `;
  res.json(rows);
});

publicContent.get("/courses", async (_req, res) => {
  const rows = await sql`
    SELECT * FROM courses WHERE published = TRUE
    ORDER BY sort_order ASC, created_at DESC
  `;
  res.json(rows);
});

publicContent.get("/podcasts", async (_req, res) => {
  const rows = await sql`
    SELECT * FROM podcasts WHERE published = TRUE
    ORDER BY sort_order ASC, episode_number DESC, published_at DESC
  `;
  res.json(rows);
});

// ---------- Admin CRUD routes ----------
export const adminContent = Router();
adminContent.use(requireAdmin);

function str(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : v == null ? fallback : String(v);
}
function int(v: unknown, fallback = 0): number {
  const n = Number(v);
  return Number.isFinite(n) ? Math.round(n) : fallback;
}
function bool(v: unknown, fallback = false): boolean {
  if (typeof v === "boolean") return v;
  if (v === "true") return true;
  if (v === "false") return false;
  return fallback;
}

/* ===== Articles ===== */
adminContent.get("/articles", async (_req, res) => {
  const rows = await sql`SELECT * FROM articles ORDER BY sort_order ASC, created_at DESC`;
  res.json(rows);
});

adminContent.post("/articles", async (req, res) => {
  const b = req.body ?? {};
  const rows = await sql`
    INSERT INTO articles (category, title, excerpt, content, thumbnail, image, date, read_time, author, published, sort_order)
    VALUES (${str(b.category, "PHYSIOLOGY")}, ${str(b.title)}, ${str(b.excerpt)}, ${str(b.content)},
            ${str(b.thumbnail)}, ${str(b.image)}, ${str(b.date)}, ${str(b.read_time)}, ${str(b.author)},
            ${bool(b.published, true)}, ${int(b.sort_order)})
    RETURNING *`;
  res.json(rows[0]);
});

adminContent.put("/articles/:id", async (req, res) => {
  const b = req.body ?? {};
  const rows = await sql`
    UPDATE articles SET
      category = ${str(b.category, "PHYSIOLOGY")}, title = ${str(b.title)}, excerpt = ${str(b.excerpt)},
      content = ${str(b.content)}, thumbnail = ${str(b.thumbnail)}, image = ${str(b.image)},
      date = ${str(b.date)}, read_time = ${str(b.read_time)}, author = ${str(b.author)},
      published = ${bool(b.published, true)}, sort_order = ${int(b.sort_order)}, updated_at = now()
    WHERE id = ${req.params.id}
    RETURNING *`;
  if (rows.length === 0) return res.status(404).json({ error: "Not found" });
  res.json(rows[0]);
});

adminContent.delete("/articles/:id", async (req, res) => {
  await sql`DELETE FROM articles WHERE id = ${req.params.id}`;
  res.json({ ok: true });
});

/* ===== Products ===== */
adminContent.get("/products", async (_req, res) => {
  const rows = await sql`SELECT * FROM products ORDER BY sort_order ASC, created_at DESC`;
  res.json(rows);
});

adminContent.post("/products", async (req, res) => {
  const b = req.body ?? {};
  const rows = await sql`
    INSERT INTO products (name, description, price_cents, badge, category, image, purchase_type, external_url, internal_href, published, sort_order)
    VALUES (${str(b.name)}, ${str(b.description)}, ${int(b.price_cents)}, ${str(b.badge, "NEW")}, ${str(b.category, "gear")},
            ${str(b.image)}, ${str(b.purchase_type, "internal")}, ${str(b.external_url)}, ${str(b.internal_href)},
            ${bool(b.published, true)}, ${int(b.sort_order)})
    RETURNING *`;
  res.json(rows[0]);
});

adminContent.put("/products/:id", async (req, res) => {
  const b = req.body ?? {};
  const rows = await sql`
    UPDATE products SET
      name = ${str(b.name)}, description = ${str(b.description)}, price_cents = ${int(b.price_cents)},
      badge = ${str(b.badge, "NEW")}, category = ${str(b.category, "gear")}, image = ${str(b.image)},
      purchase_type = ${str(b.purchase_type, "internal")}, external_url = ${str(b.external_url)},
      internal_href = ${str(b.internal_href)}, published = ${bool(b.published, true)},
      sort_order = ${int(b.sort_order)}, updated_at = now()
    WHERE id = ${req.params.id}
    RETURNING *`;
  if (rows.length === 0) return res.status(404).json({ error: "Not found" });
  res.json(rows[0]);
});

adminContent.delete("/products/:id", async (req, res) => {
  await sql`DELETE FROM products WHERE id = ${req.params.id}`;
  res.json({ ok: true });
});

/* ===== Courses ===== */
adminContent.get("/courses", async (_req, res) => {
  const rows = await sql`SELECT * FROM courses ORDER BY sort_order ASC, created_at DESC`;
  res.json(rows);
});

adminContent.post("/courses", async (req, res) => {
  const b = req.body ?? {};
  const rows = await sql`
    INSERT INTO courses (title, description, level, format, thumbnail, category, price_cents, registration_open, published, sort_order)
    VALUES (${str(b.title)}, ${str(b.description)}, ${str(b.level, "Beginner")}, ${str(b.format, "In-Person")},
            ${str(b.thumbnail)}, ${str(b.category, "pet-owner")}, ${int(b.price_cents)},
            ${bool(b.registration_open)}, ${bool(b.published, true)}, ${int(b.sort_order)})
    RETURNING *`;
  res.json(rows[0]);
});

adminContent.put("/courses/:id", async (req, res) => {
  const b = req.body ?? {};
  const rows = await sql`
    UPDATE courses SET
      title = ${str(b.title)}, description = ${str(b.description)}, level = ${str(b.level, "Beginner")},
      format = ${str(b.format, "In-Person")}, thumbnail = ${str(b.thumbnail)}, category = ${str(b.category, "pet-owner")},
      price_cents = ${int(b.price_cents)}, registration_open = ${bool(b.registration_open)},
      published = ${bool(b.published, true)}, sort_order = ${int(b.sort_order)}, updated_at = now()
    WHERE id = ${req.params.id}
    RETURNING *`;
  if (rows.length === 0) return res.status(404).json({ error: "Not found" });
  res.json(rows[0]);
});

adminContent.delete("/courses/:id", async (req, res) => {
  await sql`DELETE FROM courses WHERE id = ${req.params.id}`;
  res.json({ ok: true });
});

/* ===== Podcasts ===== */
adminContent.get("/podcasts", async (_req, res) => {
  const rows = await sql`SELECT * FROM podcasts ORDER BY sort_order ASC, episode_number DESC`;
  res.json(rows);
});

adminContent.post("/podcasts", async (req, res) => {
  const b = req.body ?? {};
  const rows = await sql`
    INSERT INTO podcasts (title, description, image, audio_url, external_url, episode_number, duration, published, sort_order)
    VALUES (${str(b.title)}, ${str(b.description)}, ${str(b.image)}, ${str(b.audio_url)}, ${str(b.external_url)},
            ${b.episode_number == null || b.episode_number === "" ? null : int(b.episode_number)},
            ${str(b.duration)}, ${bool(b.published, true)}, ${int(b.sort_order)})
    RETURNING *`;
  res.json(rows[0]);
});

adminContent.put("/podcasts/:id", async (req, res) => {
  const b = req.body ?? {};
  const rows = await sql`
    UPDATE podcasts SET
      title = ${str(b.title)}, description = ${str(b.description)}, image = ${str(b.image)},
      audio_url = ${str(b.audio_url)}, external_url = ${str(b.external_url)},
      episode_number = ${b.episode_number == null || b.episode_number === "" ? null : int(b.episode_number)},
      duration = ${str(b.duration)}, published = ${bool(b.published, true)},
      sort_order = ${int(b.sort_order)}, updated_at = now()
    WHERE id = ${req.params.id}
    RETURNING *`;
  if (rows.length === 0) return res.status(404).json({ error: "Not found" });
  res.json(rows[0]);
});

adminContent.delete("/podcasts/:id", async (req, res) => {
  await sql`DELETE FROM podcasts WHERE id = ${req.params.id}`;
  res.json({ ok: true });
});

/* ===== Orders (read-only) ===== */
adminContent.get("/orders", async (_req, res) => {
  const rows = await sql`SELECT * FROM orders ORDER BY created_at DESC LIMIT 200`;
  res.json(rows);
});
