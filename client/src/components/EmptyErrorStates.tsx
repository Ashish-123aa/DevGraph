import { AlertTriangle, SearchX, WifiOff } from "lucide-react";
import { ReactNode } from "react";

export function EmptyState({
  title = "No matching entities found.",
  suggestions,
  icon,
}: {
  title?: string;
  suggestions?: string[];
  icon?: ReactNode;
}) {
  return (
    <div className="flex h-full min-h-[240px] w-full flex-col items-center justify-center gap-3 rounded-card border border-dashed border-border p-8 text-center">
      {icon ?? <SearchX className="h-6 w-6 text-text-muted" />}
      <p className="text-sm text-text-primary">{title}</p>
      {suggestions && suggestions.length > 0 && (
        <div className="mt-1 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-text-muted">Try searching for:</span>
          {suggestions.map((s) => (
            <span
              key={s}
              className="rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-xs text-text-muted"
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function ErrorState({
  message = "Something went wrong. Please try again.",
  onRetry,
  offline = false,
}: {
  message?: string;
  onRetry?: () => void;
  offline?: boolean;
}) {
  return (
    <div className="flex h-full min-h-[240px] w-full flex-col items-center justify-center gap-3 rounded-card border border-border bg-surface p-8 text-center">
      {offline ? (
        <WifiOff className="h-6 w-6 text-node-jobrole" />
      ) : (
        <AlertTriangle className="h-6 w-6 text-node-jobrole" />
      )}
      <p className="text-sm font-medium text-text-primary">
        {offline ? "Graph database unavailable" : "Something went wrong"}
      </p>
      <p className="max-w-sm text-sm text-text-muted">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary mt-1">
          Try again
        </button>
      )}
    </div>
  );
}
