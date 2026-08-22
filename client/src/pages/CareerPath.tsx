import { ArrowRight, Route } from "lucide-react";
import { useEffect, useState } from "react";
import { ApiError } from "../api/client";
import { getCareerPaths } from "../api/career";
import { listJobRoles, listSkills } from "../api/graph";
import { EmptyState, ErrorState } from "../components/EmptyErrorStates";
import { InlineLoading } from "../components/LoadingState";
import { CareerPathResult, GraphNode } from "../types";
import { nodeDisplayName, visualForLabels } from "../utils/entityVisuals";

export function CareerPathPage() {
  const [skills, setSkills] = useState<GraphNode[]>([]);
  const [roles, setRoles] = useState<GraphNode[]>([]);
  const [skill, setSkill] = useState("");
  const [role, setRole] = useState("");

  const [paths, setPaths] = useState<CareerPathResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    listSkills().then((items) => {
      setSkills(items);
      if (items.length) setSkill(nodeDisplayName(items[0].props));
    });
    listJobRoles().then((items) => {
      setRoles(items);
      if (items.length) setRole(nodeDisplayName(items[0].props));
    });
  }, []);

  async function findPaths() {
    if (!skill || !role) return;
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const result = await getCareerPaths(skill, role);
      setPaths(result);
    } catch (err) {
      setPaths(null);
      setError(err instanceof ApiError ? err.message : "Failed to find career paths.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-text-primary">Career Path</h1>
        <p className="mt-1 text-sm text-text-muted">
          Discover how a skill you know connects, through the graph, to a role you want.
        </p>
      </div>

      <div className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="label-mono">I know</label>
          <select
            className="input-field mt-1.5"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          >
            {skills.map((s) => (
              <option key={s.id} value={nodeDisplayName(s.props)}>
                {nodeDisplayName(s.props)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="label-mono">I want to become</label>
          <select
            className="input-field mt-1.5"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {roles.map((r) => (
              <option key={r.id} value={nodeDisplayName(r.props)}>
                {nodeDisplayName(r.props)}
              </option>
            ))}
          </select>
        </div>
        <button onClick={findPaths} disabled={loading} className="btn-primary h-[38px] sm:w-auto">
          <Route className="h-4 w-4" />
          Find Career Paths
        </button>
      </div>

      {loading && <InlineLoading message="Searching for paths..." />}

      {!loading && error && <ErrorState message={error} onRetry={findPaths} />}

      {!loading && !error && searched && paths && paths.length === 0 && (
        <EmptyState
          title={`No path found from "${skill}" to "${role}" within 4 hops.`}
          suggestions={["Try a different starting skill", "Try a related job role"]}
        />
      )}

      {!loading && !error && paths && paths.length > 0 && (
        <div className="flex flex-col gap-4">
          {paths.map((path, i) => (
            <div key={i} className="card p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-medium text-text-primary">Path {i + 1}</p>
                <span className="label-mono">{path.hops} hop{path.hops === 1 ? "" : "s"}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {path.nodes.map((n, idx) => {
                  const visual = visualForLabels(n.labels);
                  return (
                    <div key={n.id} className="flex items-center gap-2">
                      <span
                        className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm"
                        style={{ borderColor: `${visual.color}55`, backgroundColor: `${visual.color}15` }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: visual.color }}
                        />
                        {nodeDisplayName(n.props)}
                      </span>
                      {idx < path.nodes.length - 1 && (
                        <ArrowRight className="h-3.5 w-3.5 text-text-muted" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
