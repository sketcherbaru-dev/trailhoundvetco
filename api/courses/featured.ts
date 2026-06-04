import { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const db = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { data, error } = await db
      .from("courses")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(6);

    if (error) return res.status(400).json({ data: [], error: error.message });
    res.json({ data: data || [] });
  } catch (error) {
    res.status(500).json({ data: [], error: "Failed to fetch featured courses" });
  }
}
