import { apiFetch, buildQuery } from "./client";
import { GraphNode } from "../types";

export async function searchNodes(query: string, limit = 25, signal?: AbortSignal) {
  const res = await apiFetch<{ results: GraphNode[] }>(
    `/api/search${buildQuery({ q: query, limit })}`,
    { signal }
  );
  return res.results;
}
