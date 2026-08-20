import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Plant } from "../api/types";
import type { SortDir, SortKey } from "../lib/sorting";

export type View = "search" | "saved" | "compare";

const MAX_COMPARE = 3;

interface AppState {
  query: string;
  woodyOnly: boolean;
  sortBy: SortKey;
  sortDir: SortDir;
  view: View;

  saved: Record<number, Plant>;
  toggleSaved: (plant: Plant) => void;
  isSaved: (id: number) => boolean;

  compareIds: number[];
  compareCache: Record<number, Plant>;
  toggleCompare: (plant: Plant) => void;
  clearCompare: () => void;

  setQuery: (query: string) => void;
  setWoodyOnly: (woodyOnly: boolean) => void;
  setSortBy: (sortBy: SortKey) => void;
  setSortDir: (sortDir: SortDir) => void;
  setView: (view: View) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      query: "",
      woodyOnly: true,
      sortBy: "relevance",
      sortDir: "desc",
      view: "search",

      saved: {},
      toggleSaved: (plant) =>
        set((state) => {
          const next = { ...state.saved };
          if (next[plant.id]) {
            delete next[plant.id];
          } else {
            next[plant.id] = plant;
          }
          return { saved: next };
        }),
      isSaved: (id) => Boolean(get().saved[id]),

      compareIds: [],
      compareCache: {},
      toggleCompare: (plant) =>
        set((state) => {
          const isSelected = state.compareIds.includes(plant.id);
          if (isSelected) {
            return { compareIds: state.compareIds.filter((id) => id !== plant.id) };
          }
          if (state.compareIds.length >= MAX_COMPARE) {
            return state;
          }
          return {
            compareIds: [...state.compareIds, plant.id],
            compareCache: { ...state.compareCache, [plant.id]: plant },
          };
        }),
      clearCompare: () => set({ compareIds: [] }),

      setQuery: (query) => set({ query }),
      setWoodyOnly: (woodyOnly) => set({ woodyOnly }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSortDir: (sortDir) => set({ sortDir }),
      setView: (view) => set({ view }),
    }),
    {
      name: "fa-kereso-store",
      partialize: (state) => ({
        saved: state.saved,
        compareIds: state.compareIds,
        compareCache: state.compareCache,
      }),
    },
  ),
);
