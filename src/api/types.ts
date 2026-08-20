export interface Plant {
  id: number;
  slug: string;
  commonName: string | null;
  scientificName: string;
  family: string | null;
  image: string | null;
  ligneousType: string | null;
  growthRate: string | null;
  heightMaxCm: number | null;
  spreadCm: number | null;
  light: number | null;
  soilHumidity: number | null;
  minPrecip: number | null;
  maxPrecip: number | null;
  minTemp: number | null;
  phMin: number | null;
  phMax: number | null;
  rootDepthCm: number | null;
  salinity: number | null;
  toxicity: string | null;
  /** Estimated, not a native Trefle field - see src/lib/metrics.ts */
  drought: number | null;
}

export type TrefleErrorKind = "auth" | "rateLimit" | "network" | "notFound" | "unknown";

export class TrefleApiError extends Error {
  kind: TrefleErrorKind;

  constructor(kind: TrefleErrorKind, message?: string) {
    super(message ?? kind);
    this.name = "TrefleApiError";
    this.kind = kind;
  }
}
