import { describe, expect, it } from "vitest";
import {
  cmToM,
  droughtScore,
  growthLabel,
  growthRank,
  waterNeedLabel,
} from "../../src/lib/metrics";

describe("droughtScore", () => {
  it("combines soil humidity and precipitation", () => {
    // soilHumidity=2 -> (10-2)/10=0.8; minPrecip=300 -> 1-300/1500=0.8; avg=0.8 -> round(4)=4
    expect(droughtScore(2, 300)).toBe(4);
  });

  it("uses only soil humidity when precipitation is missing", () => {
    // soilHumidity=0 -> (10-0)/10=1 -> round(5)=5
    expect(droughtScore(0, null)).toBe(5);
  });

  it("uses only precipitation when soil humidity is missing", () => {
    // minPrecip=0 -> 1-0/1500=1 -> round(5)=5
    expect(droughtScore(null, 0)).toBe(5);
  });

  it("returns null when both inputs are missing", () => {
    expect(droughtScore(null, null)).toBeNull();
    expect(droughtScore(undefined, undefined)).toBeNull();
  });

  it("clamps precipitation above 1500mm to the same value as 1500mm", () => {
    expect(droughtScore(null, 3000)).toBe(droughtScore(null, 1500));
  });

  it("handles soil humidity boundary values 0 and 10", () => {
    expect(droughtScore(10, null)).toBe(1); // (10-10)/10=0 -> round(0)=0 -> clamped to 1
    expect(droughtScore(0, null)).toBe(5);
  });

  it("always clamps the result into [1, 5]", () => {
    const score = droughtScore(10, 1500); // avg=0 -> round(0)=0 -> clamped to 1
    expect(score).toBeGreaterThanOrEqual(1);
    expect(score).toBeLessThanOrEqual(5);
  });

  it("rounds an average that lands on .5 using standard rounding", () => {
    // soilHumidity=5 -> 0.5; minPrecip=750 -> 1-750/1500=0.5; avg=0.5 -> round(2.5)=3
    expect(droughtScore(5, 750)).toBe(3);
  });
});

describe("growthRank", () => {
  it("ranks known growth rates", () => {
    expect(growthRank("slow")).toBe(1);
    expect(growthRank("fast")).toBe(3);
    expect(growthRank("rapid")).toBe(3);
  });

  it("is case-insensitive", () => {
    expect(growthRank("SLOW")).toBe(1);
    expect(growthRank("Fast")).toBe(3);
  });

  it("returns the mid-rank fallback for unknown or missing values", () => {
    expect(growthRank("unknown-thing")).toBe(1.5);
    expect(growthRank(null)).toBe(1.5);
    expect(growthRank(undefined)).toBe(1.5);
  });
});

describe("growthLabel", () => {
  it("returns Hungarian labels for known growth rates", () => {
    expect(growthLabel("slow")).toBe("Lassú");
    expect(growthLabel("rapid")).toBe("Gyors");
  });

  it("is case-insensitive", () => {
    expect(growthLabel("MODERATE")).toBe("Közepes");
  });

  it("falls back to the raw string for unknown non-empty values", () => {
    expect(growthLabel("weird-rate")).toBe("weird-rate");
  });

  it("returns null for missing values", () => {
    expect(growthLabel(null)).toBeNull();
    expect(growthLabel(undefined)).toBeNull();
  });
});

describe("waterNeedLabel", () => {
  it("returns alacsony at and below 3", () => {
    expect(waterNeedLabel(0)).toBe("alacsony");
    expect(waterNeedLabel(3)).toBe("alacsony");
  });

  it("returns közepes between 4 and 6 inclusive", () => {
    expect(waterNeedLabel(4)).toBe("közepes");
    expect(waterNeedLabel(6)).toBe("közepes");
  });

  it("returns magas above 6", () => {
    expect(waterNeedLabel(7)).toBe("magas");
    expect(waterNeedLabel(10)).toBe("magas");
  });

  it("returns null when soil humidity is missing", () => {
    expect(waterNeedLabel(null)).toBeNull();
    expect(waterNeedLabel(undefined)).toBeNull();
  });
});

describe("cmToM", () => {
  it("converts centimeters to meters with one decimal of rounding", () => {
    expect(cmToM(375)).toBe(3.8);
    expect(cmToM(100)).toBe(1);
  });

  it("returns 0 for 0cm", () => {
    expect(cmToM(0)).toBe(0);
  });

  it("returns null for missing values", () => {
    expect(cmToM(null)).toBeNull();
    expect(cmToM(undefined)).toBeNull();
  });
});
