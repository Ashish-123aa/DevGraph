/**
 * Required Query 3 - Multi-Hop Traversal
 *
 * Finds meaningful paths from a starting Skill to a target JobRole,
 * following the relationship types that actually represent "growth" in the
 * graph: RELATED_TO / PREREQUISITE_FOR / ENABLES between skills and
 * technologies, then REQUIRED_FOR or COMMONLY_USED_IN into the role.
 * Depth is capped at 4 hops and result count at $limit to keep this cheap.
 */
export const CAREER_PATHS = `
  MATCH (s:Skill {name: $skill})
  MATCH (role:JobRole {title: $role})
  MATCH path = (s)-[:RELATED_TO|PREREQUISITE_FOR|ENABLES|REQUIRED_FOR|COMMONLY_USED_IN*1..4]->(role)
  WITH path, length(path) AS hops
  ORDER BY hops ASC
  LIMIT $limit
  RETURN
    [n IN nodes(path) | {id: elementId(n), labels: labels(n), props: properties(n)}] AS nodes,
    [r IN relationships(path) | {id: elementId(r), type: type(r)}] AS relationships,
    hops
`;

/**
 * Required Query 4 - Skill Gap Analysis
 *
 * Given the skills a developer already knows and a target role, returns the
 * skills required for that role which are NOT already known, along with
 * whether each missing skill is directly reachable (prerequisite-connected)
 * from something the developer already knows - which is used to rank
 * "high priority" (directly reachable) vs "medium priority" gaps.
 */
export const SKILL_GAP = `
  MATCH (role:JobRole {title: $role})
  MATCH (required:Skill)-[:REQUIRED_FOR]->(role)
  WHERE NOT required.name IN $knownSkills
  OPTIONAL MATCH bridge = (required)-[:PREREQUISITE_FOR|RELATED_TO*1..2]-(known:Skill)
  WHERE known.name IN $knownSkills
  WITH required, count(DISTINCT known) AS bridgeCount, min(length(bridge)) AS bridgeDistance
  RETURN elementId(required) AS id, properties(required) AS props,
         bridgeCount, coalesce(bridgeDistance, -1) AS bridgeDistance
  ORDER BY bridgeCount DESC, required.difficulty ASC
`;

/**
 * Also surfaces prerequisite skills the developer is missing even when they
 * are not directly REQUIRED_FOR the role - e.g. "Data Structures" as a
 * prerequisite of "Algorithms" which is itself required. Used to build the
 * "foundational gaps" section of the Skill Gap page.
 */
export const SKILL_GAP_PREREQUISITES = `
  MATCH (role:JobRole {title: $role})
  MATCH (required:Skill)-[:REQUIRED_FOR]->(role)
  MATCH (prereq:Skill)-[:PREREQUISITE_FOR*1..3]->(required)
  WHERE NOT prereq.name IN $knownSkills AND NOT prereq.name = required.name
  RETURN DISTINCT elementId(prereq) AS id, properties(prereq) AS props, required.name AS unlocksSkill
  ORDER BY prereq.difficulty ASC
`;

/**
 * Required Query 5 - Multi-Hop Skill Recommendation
 *
 * "What should I learn next?" - skills required for the target role that
 * the developer doesn't know yet, annotated with a path back to something
 * they already know so the UI can explain *why* each recommendation fits.
 */
export const SKILL_RECOMMENDATIONS = `
  MATCH (role:JobRole {title: $role})
  MATCH (skill:Skill)-[:REQUIRED_FOR]->(role)
  WHERE NOT skill.name IN $knownSkills
  OPTIONAL MATCH path = (skill)-[:PREREQUISITE_FOR|RELATED_TO*1..3]-(known:Skill)
  WHERE known.name IN $knownSkills
  WITH skill, path, known
  ORDER BY length(path) ASC
  WITH skill, collect(known.name)[0] AS connectedTo, min(length(path)) AS distance
  RETURN elementId(skill) AS id, properties(skill) AS props, connectedTo,
         coalesce(distance, -1) AS distance
  ORDER BY skill.difficulty ASC
`;
