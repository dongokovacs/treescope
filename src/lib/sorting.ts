import type { Plant } from "../api/types";
import { growthRank } from "./metrics";

export type SortKey = "relevance" | "drought" | "growth" | "height" | "spread";
export type SortDir = "asc" | "desc";

function valueForSort(plant: Plant, key: SortKey): number | null {
  switch (key) {
    case "drought":
      return plant.drought;
    case "growth":
      return growthRank(plant.growthRate);
    case "height":
      return plant.heightMaxCm;
    case "spread":
      return plant.spreadCm;
    default:
      return null;
  }
}

/**
 * Sorts a copy of plants by the given key/direction. Missing values always
 * sort to the end, regardless of direction, so "no data" never masquerades
 * as the lowest or highest value.
 */
export function sortPlants(plants: Plant[], key: SortKey, dir: SortDir): Plant[] {
  if (key === "relevance") return [...plants];

  const sign = dir === "asc" ? 1 : -1;
  return [...plants].sort((a, b) => {
    const va = valueForSort(a, key);
    const vb = valueForSort(b, key);
    if (va == null && vb == null) return 0;
    if (va == null) return 1;
    if (vb == null) return -1;
    return (va - vb) * sign;
  });
}
