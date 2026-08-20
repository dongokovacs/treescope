export const GROWTH_RANK: Record<string, number> = {
  "very slow": 0,
  slow: 1,
  moderate: 2,
  fast: 3,
  rapid: 3,
};

export const GROWTH_LABEL: Record<string, string> = {
  "very slow": "Nagyon lassú",
  slow: "Lassú",
  moderate: "Közepes",
  fast: "Gyors",
  rapid: "Gyors",
};

const UNKNOWN_GROWTH_RANK = 1.5;
const PRECIP_CAP_MM = 1500;

/**
 * Estimated drought tolerance, 1-5. NOT a native Trefle field - derived from
 * soil_humidity (0=xeric..10=aquatic) and minimum_precipitation (mm/year).
 * Must always be presented in the UI as an estimate, never as fact.
 */
export function droughtScore(
  soilHumidity?: number | null,
  minPrecipMm?: number | null,
): number | null {
  const parts: number[] = [];
  if (typeof soilHumidity === "number") parts.push((10 - soilHumidity) / 10);
  if (typeof minPrecipMm === "number") {
    parts.push(1 - Math.min(minPrecipMm, PRECIP_CAP_MM) / PRECIP_CAP_MM);
  }
  if (parts.length === 0) return null;
  const avg = parts.reduce((a, b) => a + b, 0) / parts.length;
  return Math.max(1, Math.round(avg * 5));
}

export function growthRank(growthRate?: string | null): number {
  if (!growthRate) return UNKNOWN_GROWTH_RANK;
  return GROWTH_RANK[growthRate.toLowerCase()] ?? UNKNOWN_GROWTH_RANK;
}

export function growthLabel(growthRate?: string | null): string | null {
  if (!growthRate) return null;
  return GROWTH_LABEL[growthRate.toLowerCase()] ?? growthRate;
}

export function waterNeedLabel(
  soilHumidity?: number | null,
): "alacsony" | "közepes" | "magas" | null {
  if (typeof soilHumidity !== "number") return null;
  if (soilHumidity <= 3) return "alacsony";
  if (soilHumidity <= 6) return "közepes";
  return "magas";
}

export function cmToM(cm?: number | null): number | null {
  if (cm == null) return null;
  return Math.round((cm / 100) * 10) / 10;
}
