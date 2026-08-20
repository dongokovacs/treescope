export interface TrefleSearchHit {
  id: number;
  slug: string;
  common_name: string | null;
  scientific_name: string;
  image_url: string | null;
}

export interface TrefleSearchResponse {
  data: TrefleSearchHit[];
}

export interface TrefleSpecifications {
  ligneous_type: string | null;
  growth_rate: string | null;
  average_height: { cm: number | null } | null;
  maximum_height: { cm: number | null } | null;
  toxicity: string | null;
}

export interface TrefleGrowth {
  light: number | null;
  soil_humidity: number | null;
  atmospheric_humidity: number | null;
  minimum_precipitation: { mm: number | null } | null;
  maximum_precipitation: { mm: number | null } | null;
  minimum_temperature: { deg_c: number | null } | null;
  ph_minimum: number | null;
  ph_maximum: number | null;
  spread: { cm: number | null } | null;
  minimum_root_depth: { cm: number | null } | null;
  soil_salinity: number | null;
}

export interface TrefleSpeciesDetail {
  id: number;
  slug: string;
  common_name: string | null;
  scientific_name: string;
  family_common_name: string | null;
  family: string | null;
  image_url: string | null;
  specifications: TrefleSpecifications | null;
  growth: TrefleGrowth | null;
}

export interface TrefleSpeciesDetailResponse {
  data: TrefleSpeciesDetail;
}
