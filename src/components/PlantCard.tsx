import { useState } from "react";
import {
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  GitCompare,
  Ruler,
  Sun,
  TrendingUp,
  Trees,
} from "lucide-react";
import type { Plant } from "../api/types";
import { cmToM, growthLabel } from "../lib/metrics";
import { useAppStore } from "../store/useAppStore";
import { SoilGauge } from "./SoilGauge";
import { DroughtLeaves } from "./DroughtLeaves";
import { StatBadge } from "./StatBadge";
import { DetailRow } from "./DetailRow";

interface PlantCardProps {
  plant: Plant;
}

export function PlantCard({ plant }: PlantCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isSaved = useAppStore((s) => Boolean(s.saved[plant.id]));
  const toggleSaved = useAppStore((s) => s.toggleSaved);
  const isComparing = useAppStore((s) => s.compareIds.includes(plant.id));
  const compareFull = useAppStore((s) => s.compareIds.length >= 3);
  const toggleCompare = useAppStore((s) => s.toggleCompare);

  const label = growthLabel(plant.growthRate);
  const compareDisabled = !isComparing && compareFull;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl2 border border-line bg-card">
      <div className="relative h-[140px] bg-bg-alt">
        {plant.image ? (
          <img
            src={plant.image}
            alt={plant.commonName ?? plant.scientificName}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Trees size={32} className="text-line" />
          </div>
        )}
        <button
          onClick={() => toggleSaved(plant)}
          aria-label={isSaved ? "Eltávolítás a mentett listából" : "Mentés"}
          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white/90"
        >
          {isSaved ? (
            <BookmarkCheck size={15} className="text-primary" />
          ) : (
            <Bookmark size={15} className="text-ink-soft" />
          )}
        </button>
      </div>

      <div className="flex flex-col gap-3 p-4 pt-3.5">
        <div>
          <h3 className="m-0 font-display text-lg font-semibold text-ink">
            {plant.commonName || plant.scientificName}
          </h3>
          <p className="m-0 mt-0.5 text-xs italic text-ink-faint">{plant.scientificName}</p>
        </div>

        <div className="flex items-start justify-between">
          <SoilGauge soilHumidity={plant.soilHumidity} />
          <DroughtLeaves score={plant.drought} />
        </div>

        <div className="grid grid-cols-2 gap-x-2 gap-y-2">
          <StatBadge
            icon={<TrendingUp size={13} className="text-primary" />}
            label="Ütem"
            value={label ? (plant.growthRateEstimated ? `${label} (becslés)` : label) : null}
          />
          <StatBadge
            icon={<Ruler size={13} className="text-primary" />}
            label="Magasság"
            value={plant.heightMaxCm ? `${cmToM(plant.heightMaxCm)} m` : null}
          />
          <StatBadge
            icon={<Trees size={13} className="text-primary" />}
            label="Korona"
            value={plant.spreadCm ? `${cmToM(plant.spreadCm)} m` : null}
          />
          <StatBadge
            icon={<Sun size={13} className="text-primary" />}
            label="Fény"
            value={
              typeof plant.light === "number"
                ? `${plant.light}/10${plant.lightEstimated ? " (becslés)" : ""}`
                : null
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 text-xs font-semibold text-primary"
          >
            {expanded ? "Kevesebb" : "Több részlet"}
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          <button
            onClick={() => toggleCompare(plant)}
            disabled={compareDisabled}
            title={
              compareDisabled
                ? "Legfeljebb 3 faj hasonlítható össze"
                : isComparing
                  ? "Eltávolítás az összehasonlításból"
                  : "Hozzáadás az összehasonlításhoz"
            }
            className={`flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-semibold ${
              isComparing
                ? "border-primary bg-bg-alt text-primary"
                : "border-line text-ink-soft disabled:opacity-40"
            }`}
          >
            <GitCompare size={12} />
            {isComparing ? "Hozzáadva" : "Összehasonlítás"}
          </button>
        </div>

        {expanded && (
          <div className="flex flex-col gap-1.5 border-t border-bg-alt pt-2.5">
            <DetailRow label="Család" value={plant.family} />
            <DetailRow
              label="Min. csapadék"
              value={plant.minPrecip != null ? `${plant.minPrecip} mm/év` : null}
            />
            <DetailRow
              label="Max. csapadék"
              value={plant.maxPrecip != null ? `${plant.maxPrecip} mm/év` : null}
            />
            <DetailRow
              label="Min. hőmérséklet"
              value={plant.minTemp != null ? `${plant.minTemp} °C` : null}
            />
            <DetailRow
              label="Talaj pH"
              value={plant.phMin != null && plant.phMax != null ? `${plant.phMin}–${plant.phMax}` : null}
            />
            <DetailRow
              label="Gyökérmélység"
              value={plant.rootDepthCm != null ? `${cmToM(plant.rootDepthCm)} m` : null}
            />
            <DetailRow
              label="Sótűrés"
              value={typeof plant.salinity === "number" ? `${plant.salinity}/10` : null}
            />
            <DetailRow label="Toxicitás" value={plant.toxicity} />
          </div>
        )}
      </div>
    </div>
  );
}
