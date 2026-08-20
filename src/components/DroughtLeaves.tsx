import { Trees } from "lucide-react";

interface DroughtLeavesProps {
  score: number | null;
}

export function DroughtLeaves({ score }: DroughtLeavesProps) {
  if (score == null) {
    return <span className="font-body text-xs text-ink-faint">nincs elég adat</span>;
  }

  return (
    <div className="flex flex-col items-end gap-0.5" title={`Becsült aszálytűrés: ${score}/5`}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Trees
            key={i}
            size={14}
            strokeWidth={1.5}
            className={i <= score ? "fill-primary text-primary" : "fill-none text-line"}
          />
        ))}
      </div>
      <span className="font-body text-[10px] text-ink-faint">(becslés)</span>
    </div>
  );
}
