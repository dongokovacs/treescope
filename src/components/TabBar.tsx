import { useAppStore, type View } from "../store/useAppStore";

const TABS: { key: View; label: (savedCount: number, compareCount: number) => string }[] = [
  { key: "search", label: () => "Keresés" },
  { key: "saved", label: (saved) => `Mentett fáim (${saved})` },
  { key: "compare", label: (_saved, compare) => `Összehasonlítás (${compare})` },
];

export function TabBar() {
  const view = useAppStore((s) => s.view);
  const setView = useAppStore((s) => s.setView);
  const savedCount = useAppStore((s) => Object.keys(s.saved).length);
  const compareCount = useAppStore((s) => s.compareIds.length);

  return (
    <div className="mb-6 flex items-center gap-1">
      {TABS.map((tab) => {
        const active = view === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => setView(tab.key)}
            className={`rounded-full border border-line px-3.5 py-2 text-sm font-semibold ${
              active ? "bg-ink text-white" : "bg-card text-ink-soft"
            }`}
          >
            {tab.label(savedCount, compareCount)}
          </button>
        );
      })}
    </div>
  );
}
