import type { Plant } from "../api/types";
import { PlantCard } from "./PlantCard";

interface PlantGridProps {
  plants: Plant[];
}

export function PlantGrid({ plants }: PlantGridProps) {
  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
    >
      {plants.map((p) => (
        <PlantCard key={p.id} plant={p} />
      ))}
    </div>
  );
}
