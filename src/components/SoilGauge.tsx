import { waterNeedLabel } from "../lib/metrics";

interface SoilGaugeProps {
  soilHumidity: number | null;
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES: Record<NonNullable<SoilGaugeProps["size"]>, string> = {
  sm: "w-4 h-8",
  md: "w-5 h-10",
  lg: "w-7 h-16",
};

export function SoilGauge({ soilHumidity, size = "md" }: SoilGaugeProps) {
  const has = typeof soilHumidity === "number";
  const pct = has ? soilHumidity * 10 : 50;
  // Runtime percentage from soil_humidity - the one value Tailwind's static
  // utility classes can't express, so it stays inline by design.
  const waterLineFromTop = 100 - pct;

  return (
    <div className="flex items-center gap-2">
      <div
        className={`relative shrink-0 overflow-hidden rounded-md border border-line bg-soil-gradient ${SIZE_CLASSES[size]}`}
        aria-hidden="true"
      >
        {has ? (
          <div
            className="absolute left-0 right-0 h-0.5 bg-accent-water shadow-[0_0_4px_rgba(62,124,166,0.8)]"
            style={{ top: `${waterLineFromTop}%` }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[9px] text-soil-bottom">
            —
          </div>
        )}
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-body text-xs font-semibold text-ink-soft">Vízigény</span>
        <span className="font-body text-xs text-ink">
          {has ? waterNeedLabel(soilHumidity) : "nincs adat"}
        </span>
      </div>
    </div>
  );
}
