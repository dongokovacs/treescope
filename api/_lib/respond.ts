import type { VercelResponse } from "@vercel/node";

/**
 * Maps a Trefle upstream status code to our proxy's response. Shared by both
 * endpoints so error semantics (auth/rate-limit/upstream) stay consistent.
 */
export function respondFromUpstream(res: VercelResponse, status: number, json: unknown): void {
  if (status === 200) {
    res.status(200).json(json);
    return;
  }
  if (status === 401) {
    res.status(401).json({ error: "AUTH" });
    return;
  }
  if (status === 429) {
    res.status(429).json({ error: "RATE_LIMIT" });
    return;
  }
  res.status(502).json({ error: "UPSTREAM" });
}
