import { Loader2 } from "lucide-react";

export function LoadingState({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex h-full min-h-[240px] w-full flex-col items-center justify-center gap-3 text-text-muted">
      <Loader2 className="h-6 w-6 animate-spin text-accent" />
      <p className="font-mono text-xs uppercase tracking-wider">{message}</p>
    </div>
  );
}

export function InlineLoading({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex items-center gap-2 text-text-muted">
      <Loader2 className="h-4 w-4 animate-spin text-accent" />
      <span className="text-sm">{message}</span>
    </div>
  );
}

/** Skeleton block for graph/canvas areas so the layout doesn't jump when data arrives. */
export function GraphSkeleton() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-card border border-border bg-surface">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-surface via-surface-hover to-surface" />
      <div className="relative flex flex-col items-center gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
        <p className="font-mono text-xs uppercase tracking-wider text-text-muted">
          Loading graph...
        </p>
      </div>
    </div>
  );
}
