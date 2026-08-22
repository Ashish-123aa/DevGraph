import { CheckCircle2, FolderGit2, Plus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError } from "../api/client";
import { listSkills } from "../api/graph";
import { recommendProjects } from "../api/projects";
import { EmptyState, ErrorState } from "../components/EmptyErrorStates";
import { InlineLoading } from "../components/LoadingState";
import { GraphNode, ProjectMatch } from "../types";
import { nodeDisplayName } from "../utils/entityVisuals";

export function ProjectsPage() {
  const navigate = useNavigate();
  const [allSkills, setAllSkills] = useState<GraphNode[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["Java", "SQL", "REST APIs"]);
  const [skillToAdd, setSkillToAdd] = useState("");

  const [projects, setProjects] = useState<ProjectMatch[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    listSkills().then(setAllSkills);
  }, []);

  const availableToAdd = useMemo(
    () => allSkills.filter((s) => !selectedSkills.includes(nodeDisplayName(s.props))),
    [allSkills, selectedSkills]
  );

  function addSkill() {
    if (skillToAdd && !selectedSkills.includes(skillToAdd)) {
      setSelectedSkills((prev) => [...prev, skillToAdd]);
      setSkillToAdd("");
    }
  }

  function removeSkill(name: string) {
    setSelectedSkills((prev) => prev.filter((s) => s !== name));
  }

  async function findProjects() {
    if (selectedSkills.length === 0) return;
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const result = await recommendProjects(selectedSkills);
      setProjects(result);
    } catch (err) {
      setProjects(null);
      setError(err instanceof ApiError ? err.message : "Failed to find matching projects.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-text-primary">Project Explorer</h1>
        <p className="mt-1 text-sm text-text-muted">
          Pick the skills you want to practice and find projects that put them to use.
        </p>
      </div>

      <div className="card flex flex-col gap-4 p-5">
        <div>
          <label className="label-mono">Your Skills</label>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {selectedSkills.map((s) => (
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

        <button onClick={findProjects} disabled={loading} className="btn-primary w-fit">
          <FolderGit2 className="h-4 w-4" />
          Find Projects
        </button>
      </div>

      {loading && <InlineLoading message="Finding matching projects..." />}
      {!loading && error && <ErrorState message={error} onRetry={findProjects} />}

      {!loading && !error && searched && projects && projects.length === 0 && (
        <EmptyState
          title="No projects demonstrate that combination of skills yet."
          suggestions={["Java", "React Development", "Docker"]}
        />
      )}

      {!loading && !error && projects && projects.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((p) => (
            <div key={p.id} className="card flex flex-col gap-3 p-5">
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  {nodeDisplayName(p.props)}
                </p>
                {p.props.description && (
                  <p className="mt-1 text-xs text-text-muted">{String(p.props.description)}</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                {selectedSkills.map((s) => {
                  const matched = p.matchedSkills.includes(s);
                  return (
                    <div key={s} className="flex items-center gap-2 text-xs">
                      <CheckCircle2
                        className={`h-3.5 w-3.5 ${matched ? "text-node-developer" : "text-border"}`}
                      />
                      <span className={matched ? "text-text-primary" : "text-text-muted"}>{s}</span>
                    </div>
                  );
                })}
              </div>

              <p className="label-mono">
                Relevance: {p.matchCount}/{selectedSkills.length} skills
              </p>

              <button
                onClick={() => navigate(`/?nodeId=${encodeURIComponent(p.id)}`)}
                className="btn-secondary mt-auto"
              >
                Explore Project
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
