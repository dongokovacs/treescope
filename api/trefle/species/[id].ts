import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchTrefle } from "../../_lib/trefleClient.js";
import { getCached, setCached } from "../../_lib/cache.js";
import { respondFromUpstream } from "../../_lib/respond.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const idParam = typeof req.query.id === "string" ? req.query.id : "";
  const id = Number(idParam);
  if (!idParam || !Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "Érvénytelen faj azonosító." });
    return;
  }

  const cacheKey = `species:${id}`;
  const cached = getCached(cacheKey);
  if (cached) {
    res.setHeader("X-Cache", "HIT");
    res.status(200).json(cached);
    return;
  }

  try {
    const { status, json } = await fetchTrefle(`/species/${id}`);
    if (status === 200) {
      setCached(cacheKey, json);
    }
    respondFromUpstream(res, status, json);
  } catch {
    res.status(502).json({ error: "UPSTREAM" });
  }
}
