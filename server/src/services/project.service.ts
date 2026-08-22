import { withSession } from "../db/session";
import { PROJECTS_FOR_SKILLS, PROJECT_DETAIL } from "../../queries/project.cypher";
import { NotFoundError, ValidationError } from "../utils/types";

export interface ProjectMatch {
  id: string;
  props: Record<string, unknown>;
  matchedSkills: string[];
  matchCount: number;
}

export async function findProjectsForSkills(skills: string[], limit = 20): Promise<ProjectMatch[]> {
  if (!Array.isArray(skills) || skills.length === 0) {
    throw new ValidationError("Provide at least one skill to find matching projects.");
  }
  return withSession(async (session) => {
    const result = await session.run(PROJECTS_FOR_SKILLS, { skills, limit });
    return result.records.map((r) => ({
      id: r.get("id"),
      props: r.get("props"),
      matchedSkills: r.get("matchedSkills"),
      matchCount: r.get("matchCount"),
    }));
  });
}

export async function getProjectDetail(id: string) {
  return withSession(async (session) => {
    const result = await session.run(PROJECT_DETAIL, { id });
    const record = result.records[0];
    if (!record || !record.get("props")) {
      throw new NotFoundError(`No project found with id ${id}`);
    }
    return {
      props: record.get("props"),
      skills: (record.get("skills") as { id: string; name: string }[]).filter((s) => s.id),
      technologies: (record.get("technologies") as { id: string; name: string }[]).filter(
        (t) => t.id
      ),
      roles: (record.get("roles") as { id: string; title: string }[]).filter((r) => r.id),
    };
  });
}
