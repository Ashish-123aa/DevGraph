import { withSession } from "../db/session";
import { EXPLORE_FROM_NODE, EXPLORE_SAMPLE, GET_NODE_BY_ID, GET_NODE_NEIGHBORS, LIST_BY_LABEL } from "../../queries/graph.cypher";
import { rowsToGraph } from "../utils/graph";
import { GraphDTO, GraphNodeDTO, NODE_LABELS, NodeLabel, NotFoundError } from "../utils/types";

// Performance guardrails (see spec section 42 - CognoDB free tier has limited resources).
export const MAX_EXPLORE_DEPTH = 2;
export const MAX_EXPLORE_NODES = 100;
const DEFAULT_LIST_LIMIT = 200;

export async function getNodeById(id: string): Promise<GraphNodeDTO> {
  return withSession(async (session) => {
    const result = await session.run(GET_NODE_BY_ID, { id });
    const record = result.records[0];
    if (!record) throw new NotFoundError(`No node found with id ${id}`);
    return {
      id: record.get("id"),
      labels: record.get("labels"),
      props: record.get("props"),
      degree: record.get("degree"),
    };
  });
}

export async function getNodeNeighbors(nodeId: string, limit = 50): Promise<GraphDTO> {
  return withSession(async (session) => {
    const result = await session.run(GET_NODE_NEIGHBORS, { nodeId, limit });
    return rowsToGraph(
      result.records.map((r) => ({
        sourceId: r.get("sourceId"),
        sourceLabels: r.get("sourceLabels"),
        sourceProps: r.get("sourceProps"),
        relType: r.get("relType"),
        relId: r.get("relId"),
        targetId: r.get("targetId"),
        targetLabels: r.get("targetLabels"),
        targetProps: r.get("targetProps"),
      }))
    );
  });
}

/**
 * Bounded exploration from a starting node. `depth` is clamped to
 * MAX_EXPLORE_DEPTH before it ever reaches the Cypher template, and
 * `nodeLimit` is always passed as a real bound parameter.
 */
export async function exploreFromNode(
  nodeId: string,
  depth = MAX_EXPLORE_DEPTH,
  nodeLimit = MAX_EXPLORE_NODES
): Promise<GraphDTO> {
  const safeDepth = Math.max(1, Math.min(depth, MAX_EXPLORE_DEPTH));
  const safeLimit = Math.max(1, Math.min(nodeLimit, MAX_EXPLORE_NODES));

  return withSession(async (session) => {
    const result = await session.run(EXPLORE_FROM_NODE(safeDepth), {
      nodeId,
      maxNodes: safeLimit,
    });
    return rowsToGraph(
      result.records.map((r) => ({
        sourceId: r.get("sourceId"),
        sourceLabels: r.get("sourceLabels"),
        sourceProps: r.get("sourceProps"),
        relType: r.get("relType"),
        relId: r.get("relId"),
        targetId: r.get("targetId"),
        targetLabels: r.get("targetLabels"),
        targetProps: r.get("targetProps"),
      }))
    );
  });
}

/** A small random slice of the graph, used to seed the Explore page before the user picks a node. */
export async function exploreSample(limit = 60): Promise<GraphDTO> {
  const safeLimit = Math.max(1, Math.min(limit, MAX_EXPLORE_NODES));
  return withSession(async (session) => {
    const result = await session.run(EXPLORE_SAMPLE, { limit: safeLimit });
    return rowsToGraph(
      result.records.map((r) => ({
        sourceId: r.get("sourceId"),
        sourceLabels: r.get("sourceLabels"),
        sourceProps: r.get("sourceProps"),
        relType: r.get("relType"),
        relId: r.get("relId"),
        targetId: r.get("targetId"),
        targetLabels: r.get("targetLabels"),
        targetProps: r.get("targetProps"),
      }))
    );
  });
}

export async function listByLabel(label: NodeLabel, limit = DEFAULT_LIST_LIMIT) {
  if (!NODE_LABELS.includes(label)) {
    throw new NotFoundError(`Unknown entity type: ${label}`);
  }
  return withSession(async (session) => {
    const result = await session.run(LIST_BY_LABEL(label), { limit });
    return result.records.map((r) => ({ id: r.get("id"), props: r.get("props") }));
  });
}
