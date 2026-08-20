import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  heading: string;
  subtext?: string;
}

export function EmptyState({ icon, heading, subtext }: EmptyStateProps) {
  return (
    <div className="py-16 text-center text-ink-faint">
      <div className="mx-auto mb-2.5 flex w-fit items-center justify-center">{icon}</div>
      <p className="font-display text-lg text-ink-soft">{heading}</p>
      {subtext ? <p className="mt-1 text-xs">{subtext}</p> : null}
    </div>
  );
}
