import { describe, expect, it } from "vitest";
import { estimateGrowthRateForGenus, estimateLightForGenus } from "../../src/lib/genusEstimates";

describe("estimateGrowthRateForGenus", () => {
  it("returns the curated estimate for a known genus", () => {
    expect(estimateGrowthRateForGenus("Populus tremula")).toBe("Rapid");
  });

  it("is case-insensitive", () => {
    expect(estimateGrowthRateForGenus("POPULUS NIGRA")).toBe("Rapid");
  });

  it("returns null for an unknown genus", () => {
    expect(estimateGrowthRateForGenus("Quercus robur")).toBeNull();
  });

  it("returns null for missing scientific names", () => {
    expect(estimateGrowthRateForGenus(null)).toBeNull();
    expect(estimateGrowthRateForGenus(undefined)).toBeNull();
    expect(estimateGrowthRateForGenus("")).toBeNull();
  });
});

describe("estimateLightForGenus", () => {
  it("returns the curated estimate for a known genus", () => {
    expect(estimateLightForGenus("Populus alba")).toBe(8);
  });

  it("returns null for an unknown genus", () => {
    expect(estimateLightForGenus("Acer campestre")).toBeNull();
  });

  it("returns null for missing scientific names", () => {
    expect(estimateLightForGenus(null)).toBeNull();
  });
});
