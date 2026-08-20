import { useQuery } from "@tanstack/react-query";
import { searchWithDetails } from "../api/trefle";

export function usePlantSearch(query: string, woodyOnly: boolean) {
  const trimmed = query.trim();
  return useQuery({
    queryKey: ["search", trimmed, woodyOnly],
    queryFn: () => searchWithDetails(trimmed, woodyOnly),
    enabled: trimmed.length > 0,
  });
}
