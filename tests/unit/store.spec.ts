import { beforeEach, describe, expect, it } from "vitest";
import { useAppStore } from "../../src/store/useAppStore";
import type { Plant } from "../../src/api/types";

function makePlant(id: number): Plant {
  return {
    id,
    slug: `plant-${id}`,
    commonName: `Plant ${id}`,
    scientificName: `Plantus ${id}`,
    family: null,
    image: null,
    ligneousType: "tree",
    growthRate: null,
    heightMaxCm: null,
    spreadCm: null,
    light: null,
    soilHumidity: null,
    minPrecip: null,
    maxPrecip: null,
    minTemp: null,
    phMin: null,
    phMax: null,
    rootDepthCm: null,
    salinity: null,
    toxicity: null,
    drought: null,
    growthRateEstimated: false,
    lightEstimated: false,
    hungarianName: null,
  };
}

beforeEach(() => {
  useAppStore.setState({ saved: {}, compareIds: [], compareCache: {} });
});

describe("useAppStore saved list", () => {
  it("toggles a plant into and out of the saved list", () => {
    const plant = makePlant(1);
    useAppStore.getState().toggleSaved(plant);
    expect(useAppStore.getState().isSaved(1)).toBe(true);

    useAppStore.getState().toggleSaved(plant);
    expect(useAppStore.getState().isSaved(1)).toBe(false);
  });
});

describe("useAppStore compare selection", () => {
  it("adds up to 3 plants and ignores a 4th", () => {
    const [p1, p2, p3, p4] = [1, 2, 3, 4].map(makePlant);
    const { toggleCompare } = useAppStore.getState();
    toggleCompare(p1);
    toggleCompare(p2);
    toggleCompare(p3);
    toggleCompare(p4);

    expect(useAppStore.getState().compareIds).toEqual([1, 2, 3]);
    expect(useAppStore.getState().compareCache[4]).toBeUndefined();
  });

  it("removes a plant already selected for comparison", () => {
    const plant = makePlant(1);
    const { toggleCompare } = useAppStore.getState();
    toggleCompare(plant);
    toggleCompare(plant);

    expect(useAppStore.getState().compareIds).toEqual([]);
  });

  it("clearCompare empties the selection but keeps the cache", () => {
    const plant = makePlant(1);
    const { toggleCompare, clearCompare } = useAppStore.getState();
    toggleCompare(plant);
    clearCompare();

    expect(useAppStore.getState().compareIds).toEqual([]);
    expect(useAppStore.getState().compareCache[1]).toEqual(plant);
  });
});
