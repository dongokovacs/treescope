import { describe, expect, it } from "vitest";
import { hungarianPlantName } from "../../src/lib/plantNames";

describe("hungarianPlantName", () => {
  it("returns the species-level override when available", () => {
    expect(hungarianPlantName("Quercus robur")).toBe("Kocsányos tölgy");
  });

  it("gives each Populus species its own distinct name instead of a generic genus name", () => {
    expect(hungarianPlantName("Populus × canescens")).toBe("Szürke nyár");
    expect(hungarianPlantName("Populus simonii")).toBe("Simon-nyár");
    expect(hungarianPlantName("Populus grandidentata")).toBe("Nagyfogú nyár");
    expect(hungarianPlantName("Populus alba")).toBe("Fehér nyár");
    expect(hungarianPlantName("Populus nigra")).toBe("Fekete nyár");
  });

  it("handles the hybrid × sign both with and without spacing", () => {
    expect(hungarianPlantName("Populus canescens")).toBe("Szürke nyár");
  });

  it("gives each Quercus species its own distinct name instead of a generic genus name", () => {
    expect(hungarianPlantName("Quercus petraea")).toBe("Kocsánytalan tölgy");
    expect(hungarianPlantName("Quercus cerris")).toBe("Csertölgy");
    expect(hungarianPlantName("Quercus rubra")).toBe("Vörös tölgy");
  });

  it("is case-insensitive for species-level matches", () => {
    expect(hungarianPlantName("QUERCUS ROBUR")).toBe("Kocsányos tölgy");
  });

  it("covers Quercus phellos specifically, not the generic genus fallback", () => {
    expect(hungarianPlantName("Quercus phellos")).toBe("Fűzlevelű tölgy");
  });

  it("gives each Fraxinus species its own distinct name instead of a generic genus name", () => {
    expect(hungarianPlantName("Fraxinus excelsior")).toBe("Magas kőris");
    expect(hungarianPlantName("Fraxinus pennsylvanica")).toBe("Amerikai kőris");
    expect(hungarianPlantName("Fraxinus americana")).toBe("Fehér kőris");
    expect(hungarianPlantName("Fraxinus ornus")).toBe("Virágos kőris");
  });

  it("covers common Corylus species", () => {
    expect(hungarianPlantName("Corylus avellana")).toBe("Közönséges mogyoró");
    expect(hungarianPlantName("Corylus colurna")).toBe("Török mogyoró");
  });

  it("falls back to the genus-level name when no species override exists", () => {
    expect(hungarianPlantName("Quercus lobata")).toBe("Tölgy");
    expect(hungarianPlantName("Populus × berolinensis")).toBe("Nyár");
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
