import { apiFetch } from "./client";
import { StatsResult } from "../types";

export function getStats(signal?: AbortSignal) {
  return apiFetch<StatsResult>("/api/stats", { signal });
}
