import { describe, expect, it } from "vitest";
import { hungarianPlantName } from "../../src/lib/plantNames";

describe("hungarianPlantName", () => {
  it("returns the species-level override when available", () => {
    expect(hungarianPlantName("Quercus robur")).toBe("Kocsányos tölgy");
  });

  it("is case-insensitive for species-level matches", () => {
    expect(hungarianPlantName("QUERCUS ROBUR")).toBe("Kocsányos tölgy");
  });

  it("falls back to the genus-level name when no species override exists", () => {
    expect(hungarianPlantName("Quercus ilex")).toBe("Tölgy");
  });

  it("is case-insensitive for genus-level matches", () => {
    expect(hungarianPlantName("acer saccharum")).toBe("Juhar");
  });

  it("returns null for an unknown genus", () => {
    expect(hungarianPlantName("Ginkgo biloba")).toBeNull();
  });

  it("returns null for missing or empty scientific names", () => {
    expect(hungarianPlantName(null)).toBeNull();
    expect(hungarianPlantName(undefined)).toBeNull();
    expect(hungarianPlantName("")).toBeNull();
    expect(hungarianPlantName("   ")).toBeNull();
  });
});
