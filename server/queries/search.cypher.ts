/**
 * Required Query 1 - Node Search
 *
 * Finds any node (regardless of label) whose name/title contains the search
 * term, case-insensitively. Every runtime value is passed as a parameter -
 * never string-concatenated into the query text.
 */
export const SEARCH_NODES = `
  MATCH (n)
  WHERE (n.name IS NOT NULL AND toLower(n.name) CONTAINS toLower($search))
     OR (n.title IS NOT NULL AND toLower(n.title) CONTAINS toLower($search))
  RETURN labels(n) AS labels, elementId(n) AS id, properties(n) AS props
  ORDER BY n.name, n.title
  LIMIT $limit
`;

/**
 * Same search, but restricted to a single label (used by typed dropdowns,
 * e.g. "pick a skill" in the Skill Gap Analyzer).
 */
export const SEARCH_NODES_BY_LABEL = `
  MATCH (n)
  WHERE $label IN labels(n)
    AND ((n.name IS NOT NULL AND toLower(n.name) CONTAINS toLower($search))
      OR (n.title IS NOT NULL AND toLower(n.title) CONTAINS toLower($search)))
  RETURN labels(n) AS labels, elementId(n) AS id, properties(n) AS props
  ORDER BY n.name, n.title
  LIMIT $limit
`;
