import { AlertCircle } from "lucide-react";
import { ERROR_MESSAGES } from "../lib/errorMessages";
import type { TrefleErrorKind } from "../api/types";

interface ErrorBannerProps {
  kind: TrefleErrorKind;
}

export function ErrorBanner({ kind }: ErrorBannerProps) {
  return (
    <div className="mb-5 flex items-start gap-2 rounded-lg border border-error-border bg-error-bg p-3 text-error">
      <AlertCircle size={16} className="mt-0.5 shrink-0" />
      <span className="text-sm">{ERROR_MESSAGES[kind]}</span>
    </div>
  );
}
