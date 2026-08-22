export const TOTAL_NODE_COUNT = `MATCH (n) RETURN count(n) AS total`;

export const TOTAL_RELATIONSHIP_COUNT = `MATCH ()-[r]->() RETURN count(r) AS total`;

export const NODE_COUNTS_BY_LABEL = `
  MATCH (n)
  UNWIND labels(n) AS label
  RETURN label, count(*) AS count
  ORDER BY count DESC
`;

export const RELATIONSHIP_COUNTS_BY_TYPE = `
  MATCH ()-[r]->()
  RETURN type(r) AS type, count(r) AS count
  ORDER BY count DESC
`;

export const SKILLS_BY_CATEGORY = `
  MATCH (s:Skill)
  RETURN coalesce(s.category, 'Uncategorized') AS category, count(*) AS count
  ORDER BY count DESC
`;
