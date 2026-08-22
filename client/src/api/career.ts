import { apiFetch, buildQuery } from "./client";
import { CareerPathResult, SkillGapResult, SkillRecommendation } from "../types";

export function getCareerPaths(skill: string, role: string, signal?: AbortSignal) {
  return apiFetch<{ paths: CareerPathResult[] }>(
    `/api/career/path${buildQuery({ skill, role })}`,
    { signal }
  ).then((r) => r.paths);
}

export function analyzeSkillGap(knownSkills: string[], targetRole: string, signal?: AbortSignal) {
  return apiFetch<SkillGapResult>("/api/career/skill-gap", {
    method: "POST",
    body: { knownSkills, targetRole },
    signal,
  });
}

export function getRecommendations(
  knownSkills: string[],
  targetRole: string,
  signal?: AbortSignal
) {
  return apiFetch<{ recommendations: SkillRecommendation[] }>("/api/career/recommendations", {
    method: "POST",
    body: { knownSkills, targetRole },
    signal,
  }).then((r) => r.recommendations);
}
