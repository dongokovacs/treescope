import { cmToM, droughtScore } from "../lib/metrics";
import { hungarianPlantName } from "../lib/plantNames";
import { TrefleApiError, type Plant } from "./types";
import type {
  TrefleSearchHit,
  TrefleSearchResponse,
  TrefleSpeciesDetail,
  TrefleSpeciesDetailResponse,
} from "./trefleTypes";

const WOODY_TYPES = new Set(["tree", "shrub", "liana"]);
const MAX_SEARCH_HITS = 9;

function errorKindFromStatus(status: number): TrefleApiError {
  if (status === 401) return new TrefleApiError("auth");
  if (status === 429) return new TrefleApiError("rateLimit");
  if (status === 404) return new TrefleApiError("notFound");
  return new TrefleApiError("unknown");
}

async function requestJson<T>(url: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url);
  } catch {
    throw new TrefleApiError("network");
  }
  if (!res.ok) {
    throw errorKindFromStatus(res.status);
  }
  return (await res.json()) as T;
}

export async function searchSpecies(q: string): Promise<TrefleSearchHit[]> {
  const json = await requestJson<TrefleSearchResponse>(
    `/api/trefle/search?q=${encodeURIComponent(q)}`,
  );
  return json.data ?? [];
}

export async function fetchSpeciesDetail(id: number): Promise<Plant> {
  const json = await requestJson<TrefleSpeciesDetailResponse>(`/api/trefle/species/${id}`);
  return normalizePlant(json.data);
}

function pick<T>(obj: unknown, path: string[]): T | null {
  let current: unknown = obj;
  for (const key of path) {
    if (current == null || typeof current !== "object") return null;
    current = (current as Record<string, unknown>)[key];
  }
  return (current as T) ?? null;
}

export function normalizePlant(d: TrefleSpeciesDetail): Plant {
  const spec = d.specifications;
  const growth = d.growth;
  const soilHumidity = typeof growth?.soil_humidity === "number" ? growth.soil_humidity : null;
  const minPrecip = pick<number>(growth, ["minimum_precipitation", "mm"]);
  const maxPrecip = pick<number>(growth, ["maximum_precipitation", "mm"]);
  const heightMaxCm =
    pick<number>(spec, ["maximum_height", "cm"]) ?? pick<number>(spec, ["average_height", "cm"]);

  return {
    id: d.id,
    slug: d.slug,
    commonName: d.common_name,
    scientificName: d.scientific_name,
    family: d.family_common_name || d.family,
    image: d.image_url,
    ligneousType: spec?.ligneous_type ?? null,
    growthRate: spec?.growth_rate ?? null,
    heightMaxCm,
    spreadCm: pick<number>(growth, ["spread", "cm"]),
    light: growth?.light ?? null,
    soilHumidity,
    minPrecip,
    maxPrecip,
    minTemp: pick<number>(growth, ["minimum_temperature", "deg_c"]),
    phMin: growth?.ph_minimum ?? null,
    phMax: growth?.ph_maximum ?? null,
    rootDepthCm: pick<number>(growth, ["minimum_root_depth", "cm"]),
    salinity: growth?.soil_salinity ?? null,
    toxicity: spec?.toxicity ?? null,
    drought: droughtScore(soilHumidity, minPrecip),
    hungarianName: hungarianPlantName(d.scientific_name),
  };
}

/** Cm helper re-exported for components that only need display conversion. */
export { cmToM };

export async function searchWithDetails(q: string, woodyOnly: boolean): Promise<Plant[]> {
  const hits = (await searchSpecies(q)).slice(0, MAX_SEARCH_HITS);
  if (hits.length === 0) return [];

  const settled = await Promise.allSettled(hits.map((h) => fetchSpeciesDetail(h.id)));
  let plants = settled
    .filter((r): r is PromiseFulfilledResult<Plant> => r.status === "fulfilled")
    .map((r) => r.value);

  if (woodyOnly) {
    plants = plants.filter((p) => p.ligneousType != null && WOODY_TYPES.has(p.ligneousType));
  }

  return plants;
}
