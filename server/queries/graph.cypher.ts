/**
 * Fetch a single node by its internal element id, plus its degree
 * (connection count) so the UI can show "Connections: 12" without a second
 * round trip.
 */
export const GET_NODE_BY_ID = `
  MATCH (n)
  WHERE elementId(n) = $id
  OPTIONAL MATCH (n)-[r]-()
  RETURN labels(n) AS labels, elementId(n) AS id, properties(n) AS props,
         count(r) AS degree
`;

/**
 * Required Query 2 - Direct Connections
 *
 * One hop out from a node in either direction. This is what powers
 * "Explore Connections" from the node details panel.
 */
export const GET_NODE_NEIGHBORS = `
  MATCH (n)-[r]-(connected)
  WHERE elementId(n) = $nodeId
  RETURN elementId(n) AS sourceId, labels(n) AS sourceLabels, properties(n) AS sourceProps,
         type(r) AS relType, elementId(r) AS relId,
         elementId(connected) AS targetId, labels(connected) AS targetLabels,
         properties(connected) AS targetProps
  LIMIT $limit
`;

/**
 * Bounded graph exploration used by the Explore page's default view.
 * Depth and node count are both capped (see server/src/services/graph.service.ts)
 * because CognoDB's free tier has limited resources and an unbounded
 * traversal from a hub node could return the whole graph.
 *
 * NOTE: openCypher does not allow a bound parameter inside a variable-length
 * relationship pattern (`*1..$maxDepth` is not valid Cypher). maxDepth is
 * therefore interpolated directly into the query text - but it is never a
 * raw user string. The service layer clamps it to a validated integer
 * (Math.min(requested, MAX_EXPLORE_DEPTH)) before this function is called,
 * so it can never be used to inject arbitrary Cypher. All *values* (nodeId,
 * maxNodes) remain real bound parameters.
 */
export const EXPLORE_FROM_NODE = (maxDepth: number) => `
  MATCH path = (start)-[*1..${maxDepth}]-(other)
  WHERE elementId(start) = $nodeId
  WITH DISTINCT start, other, path
  ORDER BY length(path) ASC
  LIMIT $maxNodes
  UNWIND relationships(path) AS rel
  WITH start, other, rel
  RETURN DISTINCT
    elementId(startNode(rel)) AS sourceId, labels(startNode(rel)) AS sourceLabels, properties(startNode(rel)) AS sourceProps,
    type(rel) AS relType, elementId(rel) AS relId,
    elementId(endNode(rel)) AS targetId, labels(endNode(rel)) AS targetLabels, properties(endNode(rel)) AS targetProps
`;

/** A small, random-ish sample of the graph for the Explore page's initial load (no node selected yet). */
export const EXPLORE_SAMPLE = `
  MATCH (n)-[r]-(m)
  WITH n, r, m, rand() AS rnd
  ORDER BY rnd
  RETURN elementId(n) AS sourceId, labels(n) AS sourceLabels, properties(n) AS sourceProps,
         type(r) AS relType, elementId(r) AS relId,
         elementId(m) AS targetId, labels(m) AS targetLabels, properties(m) AS targetProps
  LIMIT $limit
`;

/**
 * Labels can't be bound parameters in Cypher either. `label` here is never
 * user-supplied text - it is one of a hardcoded whitelist (see NODE_LABELS
 * in server/src/services/graph.service.ts), so interpolation is safe.
 */
export const LIST_BY_LABEL = (label: string) => `
  MATCH (n:${label})
  RETURN elementId(n) AS id, properties(n) AS props
  ORDER BY coalesce(n.name, n.title)
  LIMIT $limit
`;
