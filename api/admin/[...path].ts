import { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../_db";

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

  // pathSegments: e.g. ["articles"] or ["articles", "some-uuid"]
  const pathSegments = Array.isArray(req.query.path)
    ? req.query.path
    : req.query.path
    ? [req.query.path as string]
    : [];

  const [resource, id] = pathSegments;

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
