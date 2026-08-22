/**
 * Required Query 7 - Find Companies
 *
 * Given a Technology, finds companies that use it and the job roles those
 * companies hire for. Traversal: Technology <- Company -> JobRole.
 */
export const COMPANIES_FOR_TECHNOLOGY = `
  MATCH (t:Technology {name: $technology})
  MATCH (company:Company)-[:USES]->(t)
  OPTIONAL MATCH (company)-[:HIRES_FOR]->(role:JobRole)
  RETURN elementId(company) AS id, properties(company) AS props,
         collect(DISTINCT {id: elementId(role), title: role.title}) AS roles
  ORDER BY company.name
`;

/** All technologies a company uses and roles it hires for, for the company detail view. */
export const COMPANY_DETAIL = `
  MATCH (c:Company)
  WHERE elementId(c) = $id
  OPTIONAL MATCH (c)-[:USES]->(t:Technology)
  OPTIONAL MATCH (c)-[:HIRES_FOR]->(role:JobRole)
  RETURN properties(c) AS props,
         collect(DISTINCT {id: elementId(t), name: t.name}) AS technologies,
         collect(DISTINCT {id: elementId(role), title: role.title}) AS roles
`;
