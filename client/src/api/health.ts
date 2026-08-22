import { apiFetch } from "./client";
import { HealthResult } from "../types";

export function getHealth(signal?: AbortSignal) {
  return apiFetch<HealthResult>("/api/health", { signal });
}
