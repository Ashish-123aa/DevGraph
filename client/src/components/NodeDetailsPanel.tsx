import { Waypoints, X } from "lucide-react";
import { GraphNode } from "../types";
import { nodeDisplayName, primaryLabel, visualForLabels } from "../utils/entityVisuals";

const HIDDEN_PROPS = new Set(["id", "name", "title"]);

function formatKey(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}

export function NodeDetailsPanel({
  node,
  degree,
  onExplore,
  onClose,
  exploring,
}: {
  node: GraphNode;
  degree?: number;
  onExplore?: () => void;
  onClose?: () => void;
  exploring?: boolean;
}) {
  const visual = visualForLabels(node.labels);
  const label = primaryLabel(node.labels);
  const entries = Object.entries(node.props).filter(([k]) => !HIDDEN_PROPS.has(k));

  return (
    <div className="card flex h-full flex-col gap-4 p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-3">
          <div
            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md"
            style={{ backgroundColor: `${visual.color}22` }}
          >
            <visual.icon className="h-4.5 w-4.5" style={{ color: visual.color }} />
          </div>
          <div>
            <span
              className="label-mono rounded-full px-2 py-0.5"
              style={{ backgroundColor: `${visual.color}22`, color: visual.color }}
            >
              {label}
            </span>
            <h3 className="mt-1.5 text-base font-semibold text-text-primary">
              {nodeDisplayName(node.props)}
            </h3>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-md p-1 text-text-muted hover:bg-surface-hover hover:text-text-primary"
            aria-label="Close details"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2.5 overflow-y-auto">
        {entries.map(([key, value]) => (
          <div key={key}>
            <p className="label-mono">{formatKey(key)}</p>
            <p className="mt-0.5 break-words text-sm text-text-primary">
              {Array.isArray(value) ? value.join(", ") : String(value)}
            </p>
          </div>
        ))}
      </div>

      {typeof degree === "number" && (
        <div className="flex items-center gap-2 border-t border-border pt-3 text-sm text-text-muted">
          <Waypoints className="h-4 w-4" />
          Connections: <span className="font-medium text-text-primary">{degree}</span>
        </div>
      )}

      {onExplore && (
        <button onClick={onExplore} disabled={exploring} className="btn-primary mt-auto w-full">
          {exploring ? "Exploring..." : "Explore Connections"}
        </button>
      )}
    </div>
  );
}
