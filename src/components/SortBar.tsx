import { ArrowDown, ArrowUp } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import type { SortKey } from "../lib/sorting";

const SORT_BUTTONS: { key: SortKey; label: string }[] = [
  { key: "relevance", label: "Találat" },
  { key: "drought", label: "Aszálytűrés" },
  { key: "growth", label: "Növekedési ütem" },
  { key: "height", label: "Magasság" },
  { key: "spread", label: "Korona szélesség" },
];

export function SortBar() {
  const sortBy = useAppStore((s) => s.sortBy);
  const sortDir = useAppStore((s) => s.sortDir);
  const setSortBy = useAppStore((s) => s.setSortBy);
  const setSortDir = useAppStore((s) => s.setSortDir);

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2">
      <span className="font-mono text-xs uppercase tracking-wide text-ink-faint">Rendezés</span>
      {SORT_BUTTONS.map((s) => (
        <button
          key={s.key}
          onClick={() => setSortBy(s.key)}
          className={`rounded-full border border-line px-3 py-1.5 text-xs ${
            sortBy === s.key ? "bg-bg-alt font-bold text-ink" : "bg-card font-medium text-ink-soft"
          }`}
        >
          {s.label}
        </button>
      ))}
      {sortBy !== "relevance" && (
        <button
          onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
          className="flex items-center gap-1 rounded-full border border-line bg-card px-3 py-1.5 text-xs font-medium text-ink-soft"
          aria-label={sortDir === "asc" ? "Növekvő sorrend" : "Csökkenő sorrend"}
        >
          {sortDir === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          {sortDir === "asc" ? "Növekvő" : "Csökkenő"}
        </button>
      )}
    </div>
  );
}
