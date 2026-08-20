import type { ReactNode } from "react";

interface StatBadgeProps {
  icon: ReactNode;
  label: string;
  value: string | null;
}

export function StatBadge({ icon, label, value }: StatBadgeProps) {
  return (
    <div className="flex items-center gap-1.5">
      {icon}
      <span className="text-xs text-ink-faint">{label}</span>
      <span className="font-mono text-xs font-medium text-ink">{value ?? "—"}</span>
    </div>
  );
}
