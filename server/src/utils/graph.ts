import { GraphDTO, GraphEdgeDTO, GraphNodeDTO } from "./types";

interface RawEdgeRow {
  sourceId: string;
  sourceLabels: string[];
  sourceProps: Record<string, unknown>;
  relType: string;
  relId: string;
  targetId: string;
  targetLabels: string[];
  targetProps: Record<string, unknown>;
}

/**
 * Neighbor/explore queries return one row per relationship, with the
 * endpoint node data duplicated on every row that touches it. This collapses
 * those rows into a deduplicated node list + edge list, which is the shape
 * Cytoscape.js (and any other graph renderer) actually wants.
 */
export function rowsToGraph(rows: RawEdgeRow[]): GraphDTO {
  const nodeMap = new Map<string, GraphNodeDTO>();
  const edgeMap = new Map<string, GraphEdgeDTO>();

  for (const row of rows) {
    if (!nodeMap.has(row.sourceId)) {
      nodeMap.set(row.sourceId, {
        id: row.sourceId,
        labels: row.sourceLabels,
        props: row.sourceProps,
      });
    }
    if (!nodeMap.has(row.targetId)) {
      nodeMap.set(row.targetId, {
        id: row.targetId,
        labels: row.targetLabels,
        props: row.targetProps,
      });
    }
    if (!edgeMap.has(row.relId)) {
      edgeMap.set(row.relId, {
        id: row.relId,
        type: row.relType,
        source: row.sourceId,
        target: row.targetId,
      });
    }
  }

  return { nodes: Array.from(nodeMap.values()), edges: Array.from(edgeMap.values()) };
}
