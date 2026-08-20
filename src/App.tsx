import { useMemo } from "react";
import { Bookmark, Trees } from "lucide-react";
import { useAppStore } from "./store/useAppStore";
import { usePlantSearch } from "./hooks/usePlantSearch";
import { sortPlants } from "./lib/sorting";
import { TrefleApiError } from "./api/types";
import { SearchHero } from "./components/SearchHero";
import { TabBar } from "./components/TabBar";
import { SortBar } from "./components/SortBar";
import { PlantGrid } from "./components/PlantGrid";
import { CompareView } from "./components/CompareView";
import { EmptyState } from "./components/EmptyState";
import { ErrorBanner } from "./components/ErrorBanner";
import { Footer } from "./components/Footer";

export default function App() {
  const view = useAppStore((s) => s.view);
  const query = useAppStore((s) => s.query);
  const woodyOnly = useAppStore((s) => s.woodyOnly);
  const sortBy = useAppStore((s) => s.sortBy);
  const sortDir = useAppStore((s) => s.sortDir);
  const saved = useAppStore((s) => s.saved);

  const { data, isLoading, isError, error } = usePlantSearch(query, woodyOnly);

  const sortedResults = useMemo(
    () => sortPlants(data ?? [], sortBy, sortDir),
    [data, sortBy, sortDir],
  );

  const savedList = useMemo(() => Object.values(saved), [saved]);

  const errorKind = isError && error instanceof TrefleApiError ? error.kind : isError ? "unknown" : null;

  return (
    <div className="min-h-screen bg-bg text-ink">
      <SearchHero loading={isLoading} />

      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-10">
        <TabBar />

        {view === "search" && sortedResults.length > 0 && <SortBar />}

        {errorKind && <ErrorBanner kind={errorKind} />}

        {view === "search" && !isLoading && !errorKind && sortedResults.length === 0 && (
          <EmptyState
            icon={<Trees size={28} />}
            heading={query ? "Nincs találat erre a keresésre." : "Írj be egy fajnevet a kereséshez."}
          />
        )}

        {view === "saved" && savedList.length === 0 && (
          <EmptyState
            icon={<Bookmark size={28} />}
            heading="Még nincs mentett fád."
            subtext="Keress rá egy fajra, és mentsd el a könyvjelző ikonnal."
          />
        )}

        {view === "search" && sortedResults.length > 0 && <PlantGrid plants={sortedResults} />}
        {view === "saved" && savedList.length > 0 && <PlantGrid plants={savedList} />}
        {view === "compare" && <CompareView />}
      </main>

      <Footer />
    </div>
  );
}
