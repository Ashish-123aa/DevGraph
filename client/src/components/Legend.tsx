import { ENTITY_VISUALS } from "../utils/entityVisuals";

export function Legend({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${compact ? "text-xs" : "text-sm"}`}>
      {Object.values(ENTITY_VISUALS).map((v) => (
        <div key={v.label} className="flex items-center gap-1.5">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: v.color }}
          />
          <span className="text-text-muted">{v.displayName}</span>
        </div>
      ))}
    </div>
  );
}
