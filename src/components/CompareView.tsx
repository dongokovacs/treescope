import { GitCompare, X } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { cmToM, growthLabel, waterNeedLabel } from "../lib/metrics";
import { EmptyState } from "./EmptyState";
import type { Plant } from "../api/types";

interface MetricRow {
  label: string;
  value: (p: Plant) => string;
}

const CORE_ROWS: MetricRow[] = [
  { label: "Aszálytűrés (becslés)", value: (p) => (p.drought != null ? `${p.drought}/5` : "nincs adat") },
  { label: "Vízigény", value: (p) => waterNeedLabel(p.soilHumidity) ?? "nincs adat" },
  { label: "Növekedési ütem", value: (p) => growthLabel(p.growthRate) ?? "nincs adat" },
  { label: "Magasság", value: (p) => (p.heightMaxCm ? `${cmToM(p.heightMaxCm)} m` : "nincs adat") },
  { label: "Korona szélesség", value: (p) => (p.spreadCm ? `${cmToM(p.spreadCm)} m` : "nincs adat") },
  { label: "Fény", value: (p) => (typeof p.light === "number" ? `${p.light}/10` : "nincs adat") },
];

const DETAIL_ROWS: MetricRow[] = [
  { label: "Min. csapadék", value: (p) => (p.minPrecip != null ? `${p.minPrecip} mm/év` : "nincs adat") },
  { label: "Max. csapadék", value: (p) => (p.maxPrecip != null ? `${p.maxPrecip} mm/év` : "nincs adat") },
  { label: "Min. hőmérséklet", value: (p) => (p.minTemp != null ? `${p.minTemp} °C` : "nincs adat") },
  {
    label: "Talaj pH",
    value: (p) => (p.phMin != null && p.phMax != null ? `${p.phMin}–${p.phMax}` : "nincs adat"),
  },
  { label: "Gyökérmélység", value: (p) => (p.rootDepthCm != null ? `${cmToM(p.rootDepthCm)} m` : "nincs adat") },
  { label: "Sótűrés", value: (p) => (typeof p.salinity === "number" ? `${p.salinity}/10` : "nincs adat") },
  { label: "Toxicitás", value: (p) => p.toxicity ?? "nincs adat" },
];

export function CompareView() {
  const compareIds = useAppStore((s) => s.compareIds);
  const compareCache = useAppStore((s) => s.compareCache);
  const toggleCompare = useAppStore((s) => s.toggleCompare);

  const plants = compareIds.map((id) => compareCache[id]).filter((p): p is Plant => Boolean(p));

  if (plants.length === 0) {
    return (
      <EmptyState
        icon={<GitCompare size={28} />}
        heading="Válassz ki legfeljebb 3 fajt összehasonlításhoz."
        subtext="A Keresés vagy a Mentett fáim nézetben az „Összehasonlítás” gombbal jelölheted ki a fajokat."
      />
    );
  }

  const rows = [...CORE_ROWS, ...DETAIL_ROWS];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse text-sm">
        <thead>
          <tr>
            <th className="w-40 border-b border-line p-2 text-left font-body text-xs text-ink-faint">
              Faj
            </th>
            {plants.map((p) => (
              <th key={p.id} className="border-b border-line p-2 text-left align-top">
                <div className="flex items-start justify-between gap-1">
                  <div>
                    <div className="font-display text-sm font-semibold text-ink">
                      {p.hungarianName || p.scientificName}
                    </div>
                    <div className="text-xs italic text-ink-faint">{p.scientificName}</div>
                  </div>
                  <button
                    onClick={() => toggleCompare(p)}
                    aria-label={`${p.hungarianName ?? p.scientificName} eltávolítása`}
                    className="shrink-0 rounded-full border border-line p-1 text-ink-soft"
                  >
                    <X size={12} />
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td className="border-b border-bg-alt p-2 text-xs font-medium text-ink-soft">
                {row.label}
              </td>
              {plants.map((p) => (
                <td key={p.id} className="border-b border-bg-alt p-2 font-mono text-xs text-ink">
                  {row.value(p)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
