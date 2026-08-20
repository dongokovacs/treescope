import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchTrefle } from "../_lib/trefleClient";
import { getCached, setCached } from "../_lib/cache";
import { respondFromUpstream } from "../_lib/respond";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
  if (!q) {
    res.status(400).json({ error: "Hiányzó keresési kifejezés." });
    return;
  }

  const cacheKey = `search:${q.toLowerCase()}`;
  const cached = getCached(cacheKey);
  if (cached) {
    res.setHeader("X-Cache", "HIT");
    res.status(200).json(cached);
    return;
  }

  try {
    const { status, json } = await fetchTrefle("/species/search", { q });
    if (status === 200) {
      setCached(cacheKey, json);
    }
    respondFromUpstream(res, status, json);
  } catch {
    res.status(502).json({ error: "UPSTREAM" });
  }
}
