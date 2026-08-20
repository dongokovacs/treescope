interface DetailRowProps {
  label: string;
  value: string | null;
}

export function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-ink-faint">{label}</span>
      <span className="font-mono text-xs text-ink">{value ?? "nincs adat"}</span>
    </div>
  );
}
