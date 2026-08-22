/**
 * Required Query 6 - Find Project Opportunities
 *
 * Given a set of skills, finds projects that demonstrate any of them and
 * ranks by how many of the requested skills each project covers.
 */
export const PROJECTS_FOR_SKILLS = `
  MATCH (p:Project)-[:DEMONSTRATES]->(s:Skill)
  WHERE s.name IN $skills
  WITH p, collect(DISTINCT s.name) AS matchedSkills
  RETURN elementId(p) AS id, properties(p) AS props, matchedSkills,
         size(matchedSkills) AS matchCount
  ORDER BY matchCount DESC
  LIMIT $limit
`;

/** All skills + technologies a single project touches, for the project detail view. */
export const PROJECT_DETAIL = `
  MATCH (p:Project)
  WHERE elementId(p) = $id
  OPTIONAL MATCH (p)-[:DEMONSTRATES]->(s:Skill)
  OPTIONAL MATCH (t:Technology)-[:USED_IN]->(p)
  OPTIONAL MATCH (p)-[:RELEVANT_TO]->(role:JobRole)
  RETURN properties(p) AS props,
         collect(DISTINCT {id: elementId(s), name: s.name}) AS skills,
         collect(DISTINCT {id: elementId(t), name: t.name}) AS technologies,
         collect(DISTINCT {id: elementId(role), title: role.title}) AS roles
`;
