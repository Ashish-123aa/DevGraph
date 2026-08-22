import { Plus, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ApiError } from "../api/client";
import { analyzeSkillGap } from "../api/career";
import { listJobRoles, listSkills } from "../api/graph";
import { recommendProjects } from "../api/projects";
import { EmptyState, ErrorState } from "../components/EmptyErrorStates";
import { InlineLoading } from "../components/LoadingState";
import { GraphNode, ProjectMatch, SkillGapResult } from "../types";
import { nodeDisplayName } from "../utils/entityVisuals";

function PriorityBadge({ priority }: { priority: "high" | "medium" }) {
  const isHigh = priority === "high";
  return (
    <span
      className={`label-mono rounded-full px-2 py-0.5 ${
        isHigh ? "bg-node-jobrole/15 text-node-jobrole" : "bg-node-project/15 text-node-project"
      }`}
    >
      {isHigh ? "High Priority" : "Medium Priority"}
    </span>
  );
}

export function SkillGapPage() {
  const [allSkills, setAllSkills] = useState<GraphNode[]>([]);
  const [roles, setRoles] = useState<GraphNode[]>([]);
  const [currentSkills, setCurrentSkills] = useState<string[]>(["Java", "SQL", "Git"]);
  const [skillToAdd, setSkillToAdd] = useState("");
  const [targetRole, setTargetRole] = useState("");

  const [result, setResult] = useState<SkillGapResult | null>(null);
  const [recommendedProjects, setRecommendedProjects] = useState<ProjectMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    listSkills().then(setAllSkills);
    listJobRoles().then((items) => {
      setRoles(items);
      if (items.length) setTargetRole(nodeDisplayName(items[0].props));
    });
  }, []);

  const availableToAdd = useMemo(
    () => allSkills.filter((s) => !currentSkills.includes(nodeDisplayName(s.props))),
    [allSkills, currentSkills]
  );

  function addSkill() {
    if (skillToAdd && !currentSkills.includes(skillToAdd)) {
      setCurrentSkills((prev) => [...prev, skillToAdd]);
      setSkillToAdd("");
    }
  }

  function removeSkill(name: string) {
    setCurrentSkills((prev) => prev.filter((s) => s !== name));
  }

  async function analyze() {
    if (!targetRole) return;
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const gapResult = await analyzeSkillGap(currentSkills, targetRole);
      setResult(gapResult);

      const gapSkillNames = gapResult.gaps.map((g) => nodeDisplayName(g.props));
      if (gapSkillNames.length > 0) {
        const projects = await recommendProjects(gapSkillNames);
        setRecommendedProjects(projects.slice(0, 4));
      } else {
        setRecommendedProjects([]);
      }
    } catch (err) {
      setResult(null);
      setError(err instanceof ApiError ? err.message : "Failed to analyze skill gap.");
    } finally {
      setLoading(false);
    }
  }

  const highPriority = result?.gaps.filter((g) => g.priority === "high") ?? [];
  const mediumPriority = result?.gaps.filter((g) => g.priority === "medium") ?? [];

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-text-primary">What should I learn next?</h1>
        <p className="mt-1 text-sm text-text-muted">
          Tell DevGraph what you already know and where you want to go.
        </p>
      </div>

      <div className="card flex flex-col gap-5 p-5">
        <div>
          <label className="label-mono">Current Skills</label>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {currentSkills.map((s) => (
              <span
                key={s}
                className="flex items-center gap-1.5 rounded-full border border-border bg-bg px-3 py-1 text-sm text-text-primary"
              >
                {s}
                <button onClick={() => removeSkill(s)} aria-label={`Remove ${s}`}>
                  <X className="h-3 w-3 text-text-muted hover:text-text-primary" />
                </button>
              </span>
            ))}
            <div className="flex items-center gap-1.5">
              <select
                value={skillToAdd}
                onChange={(e) => setSkillToAdd(e.target.value)}
                className="input-field !w-auto py-1 text-sm"
              >
                <option value="">Choose a skill...</option>
                {availableToAdd.map((s) => (
                  <option key={s.id} value={nodeDisplayName(s.props)}>
                    {nodeDisplayName(s.props)}
                  </option>
                ))}
              </select>
              <button onClick={addSkill} className="btn-secondary !px-2 !py-1.5" aria-label="Add skill">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-xs">
          <label className="label-mono">Target Role</label>
          <select
            className="input-field mt-1.5"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
          >
            {roles.map((r) => (
              <option key={r.id} value={nodeDisplayName(r.props)}>
                {nodeDisplayName(r.props)}
              </option>
            ))}
          </select>
        </div>

        <button onClick={analyze} disabled={loading} className="btn-primary w-fit">
          <Sparkles className="h-4 w-4" />
          Analyze Skill Gap
        </button>
      </div>

      {loading && <InlineLoading message="Analyzing your skill gap..." />}
      {!loading && error && <ErrorState message={error} onRetry={analyze} />}

      {!loading && !error && searched && result && result.gaps.length === 0 && (
        <EmptyState title={`You already know every skill required for ${targetRole}.`} />
      )}

      {!loading && !error && result && result.gaps.length > 0 && (
        <div className="flex flex-col gap-5">
          <div className="card p-5">
            <h2 className="mb-3 text-sm font-semibold text-text-primary">Your Skill Gap</h2>

            {highPriority.length > 0 && (
              <div className="mb-4">
                <p className="mb-2 text-xs font-medium text-text-muted">High Priority</p>
                <div className="flex flex-col gap-2">
                  {highPriority.map((g) => (
                    <div key={g.id} className="flex items-start justify-between gap-3 rounded-md border border-border bg-bg p-3">
                      <div>
                        <p className="text-sm font-medium text-text-primary">
                          {nodeDisplayName(g.props)}
                        </p>
                        <p className="mt-0.5 text-xs text-text-muted">{g.reason}</p>
                      </div>
                      <PriorityBadge priority="high" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mediumPriority.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-medium text-text-muted">Medium Priority</p>
                <div className="flex flex-col gap-2">
                  {mediumPriority.map((g) => (
                    <div key={g.id} className="flex items-start justify-between gap-3 rounded-md border border-border bg-bg p-3">
                      <div>
                        <p className="text-sm font-medium text-text-primary">
                          {nodeDisplayName(g.props)}
                        </p>
                        <p className="mt-0.5 text-xs text-text-muted">{g.reason}</p>
                      </div>
                      <PriorityBadge priority="medium" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {recommendedProjects.length > 0 && (
            <div className="card p-5">
              <h2 className="mb-3 text-sm font-semibold text-text-primary">Recommended Projects</h2>
              <div className="flex flex-col gap-2">
                {recommendedProjects.map((p) => (
                  <div key={p.id} className="rounded-md border border-border bg-bg p-3">
                    <p className="text-sm font-medium text-text-primary">
                      {nodeDisplayName(p.props)}
                    </p>
                    <p className="mt-0.5 text-xs text-text-muted">
                      Practices: {p.matchedSkills.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
