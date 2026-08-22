import { apiFetch } from "./client";
import { ProjectMatch } from "../types";

export function recommendProjects(skills: string[], signal?: AbortSignal) {
  return apiFetch<{ projects: ProjectMatch[] }>("/api/projects/recommend", {
    method: "POST",
    body: { skills },
    signal,
  }).then((r) => r.projects);
}

export function getProject(id: string, signal?: AbortSignal) {
  return apiFetch<{ project: any }>(`/api/projects/${encodeURIComponent(id)}`, { signal }).then(
    (r) => r.project
  );
}
