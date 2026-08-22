import { apiFetch } from "./client";
import { CompanyMatch } from "../types";

export function getCompaniesForTechnology(technology: string, signal?: AbortSignal) {
  return apiFetch<{ companies: CompanyMatch[] }>(
    `/api/companies/technology/${encodeURIComponent(technology)}`,
    { signal }
  ).then((r) => r.companies);
}

export function getCompany(id: string, signal?: AbortSignal) {
  return apiFetch<{ company: any }>(`/api/companies/${encodeURIComponent(id)}`, { signal }).then(
    (r) => r.company
  );
}
