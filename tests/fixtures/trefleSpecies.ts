export function speciesDetail(overrides: {
  id: number;
  common_name: string;
  scientific_name: string;
  ligneous_type?: string | null;
  growth_rate?: string | null;
  soil_humidity?: number | null;
  minimum_precipitation?: number | null;
  maximum_height_cm?: number;
}) {
  return {
    data: {
      id: overrides.id,
      slug: overrides.scientific_name.toLowerCase().replace(/\s+/g, "-"),
      common_name: overrides.common_name,
      scientific_name: overrides.scientific_name,
      family_common_name: "Teszt család",
      family: "Testaceae",
      image_url: null,
      specifications: {
        ligneous_type: overrides.ligneous_type ?? "tree",
        growth_rate: overrides.growth_rate ?? "moderate",
        average_height: { cm: 800 },
        maximum_height: { cm: overrides.maximum_height_cm ?? 1200 },
        toxicity: null,
      },
      growth: {
        light: 7,
        soil_humidity: overrides.soil_humidity ?? 4,
        atmospheric_humidity: 5,
        minimum_precipitation: { mm: overrides.minimum_precipitation ?? 400 },
        maximum_precipitation: { mm: 900 },
        minimum_temperature: { deg_c: -15 },
        ph_minimum: 5.5,
        ph_maximum: 7.5,
        spread: { cm: 600 },
        minimum_root_depth: { cm: 100 },
        soil_salinity: 3,
      },
    },
  };
}
