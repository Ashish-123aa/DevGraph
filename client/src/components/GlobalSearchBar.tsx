import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchNodes } from "../api/search";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { GraphNode } from "../types";
import { nodeDisplayName, primaryLabel, visualForLabels } from "../utils/entityVisuals";

export function GlobalSearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GraphNode[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounced = useDebouncedValue(query, 300);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!debounced.trim()) {
      setResults([]);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    searchNodes(debounced, 20, controller.signal)
      .then((r) => setResults(r))
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [debounced]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const grouped = results.reduce<Record<string, GraphNode[]>>((acc, node) => {
    const label = primaryLabel(node.labels);
    acc[label] = acc[label] ?? [];
    acc[label].push(node);
    return acc;
  }, {});

  function goToNode(node: GraphNode) {
    setOpen(false);
    setQuery("");
    navigate(`/?nodeId=${encodeURIComponent(node.id)}`);
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="flex items-center gap-2 rounded-md border border-border bg-bg px-3 py-2">
        <Search className="h-4 w-4 shrink-0 text-text-muted" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search skills, technologies, roles, companies..."
          className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
        />
      </div>

      {open && query.trim() && (
        <div className="absolute z-40 mt-1.5 max-h-96 w-full overflow-y-auto rounded-card border border-border bg-surface shadow-xl">
          {loading && <div className="px-3 py-3 text-xs text-text-muted">Searching...</div>}
          {!loading && results.length === 0 && (
            <div className="px-3 py-3 text-xs text-text-muted">No matching entities found.</div>
          )}
          {!loading &&
            Object.entries(grouped).map(([label, nodes]) => {
              const visual = visualForLabels([label]);
              return (
                <div key={label} className="py-1.5">
                  <p className="px-3 pb-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                    {visual.displayName}s
                  </p>
                  {nodes.map((node) => (
                    <button
                      key={node.id}
                      onClick={() => goToNode(node)}
                      className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm text-text-primary hover:bg-surface-hover"
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: visual.color }}
                      />
                      {nodeDisplayName(node.props)}
                    </button>
                  ))}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
