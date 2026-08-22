import { withSession } from "../db/session";
import {
  CAREER_PATHS,
  SKILL_GAP,
  SKILL_GAP_PREREQUISITES,
  SKILL_RECOMMENDATIONS,
} from "../../queries/career.cypher";
import { NotFoundError, ValidationError } from "../utils/types";

export interface CareerPathResult {
  hops: number;
  nodes: { id: string; labels: string[]; props: Record<string, unknown> }[];
  relationships: { id: string; type: string }[];
}

export async function findCareerPaths(
  skill: string,
  role: string,
  limit = 5
): Promise<CareerPathResult[]> {
  if (!skill || !role) {
    throw new ValidationError("Both a starting skill and a target role are required.");
  }

  return withSession(async (session) => {
    const result = await session.run(CAREER_PATHS, { skill, role, limit });
    if (result.records.length === 0) {
      // Distinguish "nothing connects them" from "the skill/role doesn't exist"
      // so the frontend can show a more useful empty state.
      const check = await session.run(
        `OPTIONAL MATCH (s:Skill {name: $skill}) OPTIONAL MATCH (r:JobRole {title: $role})
         RETURN s IS NOT NULL AS skillExists, r IS NOT NULL AS roleExists`,
        { skill, role }
      );
      const row = check.records[0];
      if (row && (!row.get("skillExists") || !row.get("roleExists"))) {
        throw new NotFoundError(`Unknown skill "${skill}" or job role "${role}".`);
      }
    }
    return result.records.map((r) => ({
      hops: r.get("hops"),
      nodes: r.get("nodes"),
      relationships: r.get("relationships"),
    }));
  });
}

export interface SkillGapItem {
  id: string;
  props: Record<string, unknown>;
  priority: "high" | "medium";
  reason: string;
}

export interface PrerequisiteGapItem {
  id: string;
  props: Record<string, unknown>;
  unlocksSkill: string;
}

export interface SkillGapResult {
  role: string;
  knownSkills: string[];
  gaps: SkillGapItem[];
  prerequisiteGaps: PrerequisiteGapItem[];
}

export async function analyzeSkillGap(
  knownSkills: string[],
  role: string
): Promise<SkillGapResult> {
  if (!role) throw new ValidationError("A target job role is required.");
  if (!Array.isArray(knownSkills)) {
    throw new ValidationError("knownSkills must be an array of skill names.");
  }

  return withSession(async (session) => {
    const roleCheck = await session.run(`MATCH (r:JobRole {title: $role}) RETURN r`, { role });
    if (roleCheck.records.length === 0) {
      throw new NotFoundError(`Unknown job role "${role}".`);
    }

    const [gapResult, prereqResult] = await Promise.all([
      session.run(SKILL_GAP, { knownSkills, role }),
      session.run(SKILL_GAP_PREREQUISITES, { knownSkills, role }),
    ]);

    const gaps: SkillGapItem[] = gapResult.records.map((r) => {
      const bridgeCount = r.get("bridgeCount") as number;
      const props = r.get("props") as Record<string, unknown>;
      const priority: "high" | "medium" = bridgeCount > 0 ? "high" : "medium";
      const reason =
        bridgeCount > 0
          ? `Required by ${role}. Connected to ${bridgeCount} skill(s) you already know.`
          : `Required by ${role}.`;
      return { id: r.get("id"), props, priority, reason };
    });

    const prerequisiteGaps: PrerequisiteGapItem[] = prereqResult.records.map((r) => ({
      id: r.get("id"),
      props: r.get("props"),
      unlocksSkill: r.get("unlocksSkill"),
    }));

    return { role, knownSkills, gaps, prerequisiteGaps };
  });
}

export interface SkillRecommendation {
  id: string;
  props: Record<string, unknown>;
  connectedTo: string | null;
  distance: number;
}

export async function recommendNextSkills(
  knownSkills: string[],
  role: string
): Promise<SkillRecommendation[]> {
  if (!role) throw new ValidationError("A target job role is required.");

  return withSession(async (session) => {
    const result = await session.run(SKILL_RECOMMENDATIONS, { knownSkills, role });
    return result.records.map((r) => ({
      id: r.get("id"),
      props: r.get("props"),
      connectedTo: r.get("connectedTo"),
      distance: r.get("distance"),
    }));
  });
}
