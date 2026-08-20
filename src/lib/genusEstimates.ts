// Genus-level fallback estimates for fields the Trefle API very often
// leaves null on individual species (growth_rate, light). Values are the
// majority/most-common value observed across a live sample of species
// within the genus that DID have the field populated - not a computed
// average of unrelated data, and only added for genera we've actually
// sampled. Always shown in the UI with a "(becslés)" indicator.
//
// Populus sample (2026-08-20, 20 species queried against Trefle):
//   growth_rate: Rapid 8/9, Moderate 1/9 -> "Rapid"
//   light: 8/8 (100% agreement among the species that had a value) -> 8

export const GENUS_GROWTH_RATE_ESTIMATE: Record<string, string> = {
  populus: "Rapid",
};

export const GENUS_LIGHT_ESTIMATE: Record<string, number> = {
  populus: 8,
};

function genusOf(scientificName?: string | null): string | null {
  if (!scientificName) return null;
  const trimmed = scientificName.trim().toLowerCase();
  if (!trimmed) return null;
  return trimmed.split(/\s+/)[0];
}

export function estimateGrowthRateForGenus(scientificName?: string | null): string | null {
  const genus = genusOf(scientificName);
  if (!genus) return null;
  return GENUS_GROWTH_RATE_ESTIMATE[genus] ?? null;
}

export function estimateLightForGenus(scientificName?: string | null): number | null {
  const genus = genusOf(scientificName);
  if (!genus) return null;
  return GENUS_LIGHT_ESTIMATE[genus] ?? null;
}
