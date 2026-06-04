import { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../_db";

const mapArticle = (a: any) => ({
  ...a,
  readTime: a.read_time || "5 min read",
  date: a.date ? new Date(a.date).toISOString().split("T")[0] : "",
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { data, error } = await db
      .from("articles")
      .select("*")
      .eq("featured", true)
      .order("date", { ascending: false })
      .limit(5);

    if (error) return res.status(400).json({ data: [], error: error.message });
    res.json({ data: (data || []).map(mapArticle) });
  } catch (error) {
    res.status(500).json({ data: [], error: "Failed to fetch featured articles" });
  }
}
