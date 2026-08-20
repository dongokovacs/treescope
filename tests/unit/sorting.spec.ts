import { describe, expect, it } from "vitest";
import { sortPlants } from "../../src/lib/sorting";
import type { Plant } from "../../src/api/types";

function makePlant(overrides: Partial<Plant>): Plant {
  return {
    id: 1,
    slug: "test",
    commonName: "Test",
    scientificName: "Testus testus",
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
    hungarianName: null,
    ...overrides,
  };
}

describe("sortPlants", () => {
  it("leaves order untouched for relevance", () => {
    const plants = [makePlant({ id: 2 }), makePlant({ id: 1 })];
    expect(sortPlants(plants, "relevance", "desc").map((p) => p.id)).toEqual([2, 1]);
  });

  it("sorts by drought ascending and descending", () => {
    const plants = [
      makePlant({ id: 1, drought: 3 }),
      makePlant({ id: 2, drought: 5 }),
      makePlant({ id: 3, drought: 1 }),
    ];
    expect(sortPlants(plants, "drought", "asc").map((p) => p.id)).toEqual([3, 1, 2]);
    expect(sortPlants(plants, "drought", "desc").map((p) => p.id)).toEqual([2, 1, 3]);
  });

  it("sorts by growth rank using growthRate labels", () => {
    const plants = [
      makePlant({ id: 1, growthRate: "slow" }),
      makePlant({ id: 2, growthRate: "rapid" }),
      makePlant({ id: 3, growthRate: "very slow" }),
    ];
    expect(sortPlants(plants, "growth", "asc").map((p) => p.id)).toEqual([3, 1, 2]);
  });

  it("sorts by height and spread", () => {
    const plants = [
      makePlant({ id: 1, heightMaxCm: 500 }),
      makePlant({ id: 2, heightMaxCm: 1000 }),
    ];
    expect(sortPlants(plants, "height", "desc").map((p) => p.id)).toEqual([2, 1]);

    const bySpread = [
      makePlant({ id: 1, spreadCm: 200 }),
      makePlant({ id: 2, spreadCm: 800 }),
    ];
    expect(sortPlants(bySpread, "spread", "desc").map((p) => p.id)).toEqual([2, 1]);
  });

  it("always sorts missing values to the end, in both directions", () => {
    const plants = [
      makePlant({ id: 1, drought: 2 }),
      makePlant({ id: 2, drought: null }),
      makePlant({ id: 3, drought: 4 }),
    ];
    expect(sortPlants(plants, "drought", "asc").map((p) => p.id)).toEqual([1, 3, 2]);
    expect(sortPlants(plants, "drought", "desc").map((p) => p.id)).toEqual([3, 1, 2]);
  });

  it("does not mutate the input array", () => {
    const plants = [makePlant({ id: 1, drought: 1 }), makePlant({ id: 2, drought: 2 })];
    const original = [...plants];
    sortPlants(plants, "drought", "desc");
    expect(plants).toEqual(original);
  });
});
