const TREFLE_BASE = "https://trefle.io/api/v1";

export interface TrefleFetchResult {
  status: number;
  json: unknown;
}

function getToken(): string {
  const token = process.env.TREFLE_API_TOKEN;
  if (!token) {
    throw new Error("TREFLE_API_TOKEN is not configured on the server.");
  }
  return token;
}

/**
 * Calls the Trefle API and returns the raw status + parsed body without
 * throwing on non-2xx responses - callers map the status themselves.
 */
export async function fetchTrefle(
  path: string,
  searchParams?: Record<string, string>,
): Promise<TrefleFetchResult> {
  const token = getToken();
  const url = new URL(`${TREFLE_BASE}${path}`);
  for (const [key, value] of Object.entries(searchParams ?? {})) {
    url.searchParams.set(key, value);
  }

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });

  let json: unknown = null;
  try {
    json = await res.json();
  } catch {
    json = null;
  }

  return { status: res.status, json };
}
