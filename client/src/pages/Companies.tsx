import { Building2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError } from "../api/client";
import { getCompaniesForTechnology } from "../api/companies";
import { listTechnologies } from "../api/graph";
import { EmptyState, ErrorState } from "../components/EmptyErrorStates";
import { InlineLoading } from "../components/LoadingState";
import { CompanyMatch, GraphNode } from "../types";
import { nodeDisplayName } from "../utils/entityVisuals";

export function CompaniesPage() {
  const navigate = useNavigate();
  const [technologies, setTechnologies] = useState<GraphNode[]>([]);
  const [technology, setTechnology] = useState("");

  const [companies, setCompanies] = useState<CompanyMatch[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    listTechnologies().then((items) => {
      setTechnologies(items);
      if (items.length) setTechnology(nodeDisplayName(items[0].props));
    });
  }, []);

  async function findCompanies() {
    if (!technology) return;
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const result = await getCompaniesForTechnology(technology);
      setCompanies(result);
    } catch (err) {
      setCompanies(null);
      setError(err instanceof ApiError ? err.message : "Failed to find companies.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-text-primary">Companies</h1>
        <p className="mt-1 text-sm text-text-muted">
          See which companies use a technology, and which roles they hire for.
        </p>
      </div>

      <div className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="label-mono">Technology</label>
          <select
            className="input-field mt-1.5"
            value={technology}
            onChange={(e) => setTechnology(e.target.value)}
          >
            {technologies.map((t) => (
              <option key={t.id} value={nodeDisplayName(t.props)}>
                {nodeDisplayName(t.props)}
              </option>
            ))}
          </select>
        </div>
        <button onClick={findCompanies} disabled={loading} className="btn-primary h-[38px] sm:w-auto">
          <Search className="h-4 w-4" />
          Find Companies
        </button>
      </div>

      {loading && <InlineLoading message="Finding companies..." />}
      {!loading && error && <ErrorState message={error} onRetry={findCompanies} />}

      {!loading && !error && searched && companies && companies.length === 0 && (
        <EmptyState title={`No companies in the graph use ${technology} yet.`} />
      )}

      {!loading && !error && companies && companies.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {companies.map((c) => (
            <div key={c.id} className="card flex flex-col gap-3 p-5">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-node-company/15">
                  <Building2 className="h-4 w-4 text-node-company" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {nodeDisplayName(c.props)}
                  </p>
                  {c.props.industry && (
                    <p className="text-xs text-text-muted">{String(c.props.industry)}</p>
                  )}
                </div>
              </div>

              {c.roles.length > 0 && (
                <div>
                  <p className="label-mono mb-1.5">Roles</p>
                  <div className="flex flex-wrap gap-1.5">
                    {c.roles.map((r) => (
                      <span
                        key={r.id}
                        className="rounded-full border border-border bg-bg px-2.5 py-1 text-xs text-text-primary"
                      >
                        {r.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => navigate(`/?nodeId=${encodeURIComponent(c.id)}`)}
                className="btn-secondary mt-auto"
              >
                View in Graph
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
