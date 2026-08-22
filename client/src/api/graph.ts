import { apiFetch, buildQuery } from "./client";
import { GraphData, GraphNode } from "../types";

export function getNode(id: string, signal?: AbortSignal) {
  return apiFetch<{ node: GraphNode }>(`/api/nodes/${encodeURIComponent(id)}`, { signal }).then(
    (r) => r.node
  );
}

export function getNeighbors(id: string, limit = 50, signal?: AbortSignal) {
  return apiFetch<GraphData>(
    `/api/nodes/${encodeURIComponent(id)}/neighbors${buildQuery({ limit })}`,
    { signal }
  );
}

export function exploreGraph(
  params: { nodeId?: string; depth?: number; limit?: number } = {},
  signal?: AbortSignal
) {
  return apiFetch<GraphData>(`/api/graph/explore${buildQuery(params)}`, { signal });
}

export function listSkills(signal?: AbortSignal) {
  return apiFetch<{ items: GraphNode[] }>("/api/skills?limit=500", { signal }).then((r) => r.items);
}

export function listTechnologies(signal?: AbortSignal) {
  return apiFetch<{ items: GraphNode[] }>("/api/technologies?limit=500", { signal }).then(
    (r) => r.items
  );
}

export function listJobRoles(signal?: AbortSignal) {
  return apiFetch<{ items: GraphNode[] }>("/api/job-roles?limit=500", { signal }).then(
    (r) => r.items
  );
}

export function listProjects(signal?: AbortSignal) {
  return apiFetch<{ items: GraphNode[] }>("/api/projects?limit=500", { signal }).then(
    (r) => r.items
  );
}

export function listCompanies(signal?: AbortSignal) {
  return apiFetch<{ items: GraphNode[] }>("/api/companies?limit=500", { signal }).then(
    (r) => r.items
  );
}
