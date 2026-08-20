// Per-lambda-instance in-memory cache. Resets on cold start and isn't shared
// across concurrent instances - not a strict quota guarantee, but enough to
// cut down repeat calls for the same query within a warm instance. Acceptable
// for MVP; do not upgrade to Redis/Upstash/Vercel KV without a clear need.
interface CacheEntry {
  expiresAt: number;
  payload: unknown;
}

const store = new Map<string, CacheEntry>();

const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000;

export function getCached<T>(key: string): T | undefined {
  const entry = store.get(key);
  if (!entry) return undefined;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return undefined;
  }
  return entry.payload as T;
}

export function setCached(key: string, payload: unknown, ttlMs: number = DEFAULT_TTL_MS): void {
  store.set(key, { expiresAt: Date.now() + ttlMs, payload });
}
