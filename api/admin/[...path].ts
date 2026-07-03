import { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../_db.js";

const ALLOWED_TABLES = ["articles", "products", "courses", "podcasts", "hero_images", "subscribers", "field_reports", "pack_testimonials", "pack_gallery"];

const setCors = (res: VercelResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};

const mapArticle = (a: any) => ({
  ...a,
  readTime: a.read_time || "5 min read",
  date: a.date ? new Date(a.date).toISOString().split("T")[0] : "",
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  // Ekstrak segmen path secara robust (lihat catatan di api/[...slug].ts).
  const rawPath = req.query.path;
  let pathSegments: string[] = [];
  if (Array.isArray(rawPath)) {
    pathSegments = rawPath.flatMap((s) => s.split("/")).filter(Boolean);
  } else if (typeof rawPath === "string") {
    pathSegments = rawPath.split("/").filter(Boolean);
  }
  if (pathSegments.length === 0) {
    const raw = (req.url || "").split("?")[0];
    const parts = raw.split("/").filter(Boolean); // ["api", "admin", "products", ...]
    const adminIdx = parts.indexOf("admin");
    pathSegments = adminIdx >= 0 ? parts.slice(adminIdx + 1) : parts;
  }

  const [resource, id] = pathSegments;

  // POST /api/admin/reorder — swap sort_order between adjacent items
  if (resource === "reorder" && req.method === "POST") {
    const { table, id: itemId, direction } = req.body || {};
    if (!ALLOWED_TABLES.includes(table)) {
      return res.status(400).json({ error: "Invalid table" });
    }
    if (direction !== "up" && direction !== "down") {
      return res.status(400).json({ error: "direction must be up or down" });
    }
    try {
      const { data: rawItems, error: fetchErr } = await db
        .from(table)
        .select("id, sort_order")
        .order("sort_order", { ascending: true, nullsFirst: false });
      if (fetchErr || !rawItems) {
        return res.status(500).json({ error: fetchErr?.message || "Failed to fetch items" });
      }

      // Initialise null sort_orders sequentially so swapping actually changes order
      const items = rawItems.map((it, i) => ({ ...it }));
      const needsInit = items.some((it) => it.sort_order == null);
      if (needsInit) {
        for (let i = 0; i < items.length; i++) {
          items[i].sort_order = i + 1;
          await db.from(table).update({ sort_order: i + 1 }).eq("id", items[i].id);
        }
      }

      const idx = items.findIndex((it) => String(it.id) === String(itemId));
      if (idx === -1) return res.status(404).json({ error: "Item not found" });

      const swapIdx = direction === "up" ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= items.length) {
        return res.status(400).json({ error: "Already at boundary" });
      }

      const current = items[idx];
      const swap = items[swapIdx];
      const { error: err1 } = await db.from(table).update({ sort_order: swap.sort_order }).eq("id", current.id);
      const { error: err2 } = await db.from(table).update({ sort_order: current.sort_order }).eq("id", swap.id);
      if (err1 || err2) return res.status(500).json({ error: "Failed to reorder" });

      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err instanceof Error ? err.message : "Server error" });
    }
  }

  if (!resource || !ALLOWED_TABLES.includes(resource)) {
    return res.status(404).json({ error: "Resource not found" });
  }

  try {
    // POST /api/admin/:resource — create
    if (req.method === "POST" && !id) {
      const body = { ...req.body };
      if (resource === "articles" && body.date) {
        body.date = new Date(body.date).toISOString();
      }

      const { data, error } = await db
        .from(resource)
        .insert([body])
        .select()
        .single();

      if (error) return res.status(400).json({ error: error.message });

      const result = resource === "articles" ? mapArticle(data) : data;
      return res.status(201).json(result);
    }

    // PUT /api/admin/:resource/:id — update
    if (req.method === "PUT" && id) {
      const body = { ...req.body, updated_at: new Date().toISOString() };
      if (resource === "articles" && body.date) {
        body.date = new Date(body.date).toISOString();
      }

      const { data, error } = await db
        .from(resource)
        .update(body)
        .eq("id", id)
        .select()
        .single();

      if (error) return res.status(400).json({ error: error.message });

      const result = resource === "articles" ? mapArticle(data) : data;
      return res.json(result);
    }

    // DELETE /api/admin/:resource/:id — delete
    if (req.method === "DELETE" && id) {
      const { error } = await db.from(resource).delete().eq("id", id);
      if (error) return res.status(400).json({ error: error.message });
      return res.json({ message: `${resource.slice(0, -1)} deleted successfully` });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    return res.status(500).json({
      error: err instanceof Error ? err.message : "Internal server error",
    });
  }
}
