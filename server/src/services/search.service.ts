import { withSession } from "../db/session";
import { SEARCH_NODES, SEARCH_NODES_BY_LABEL } from "../../queries/search.cypher";
import { GraphNodeDTO, NodeLabel, ValidationError } from "../utils/types";

export async function searchNodes(query: string, limit = 25): Promise<GraphNodeDTO[]> {
  if (!query || query.trim().length === 0) {
    throw new ValidationError("Search query cannot be empty.");
  }
  return withSession(async (session) => {
    const result = await session.run(SEARCH_NODES, { search: query.trim(), limit });
    return result.records.map((r) => ({
      id: r.get("id"),
      labels: r.get("labels"),
      props: r.get("props"),
    }));
  });
}

export async function searchNodesByLabel(
  query: string,
  label: NodeLabel,
  limit = 25
): Promise<GraphNodeDTO[]> {
  return withSession(async (session) => {
    const result = await session.run(SEARCH_NODES_BY_LABEL, {
      search: query.trim(),
      label,
      limit,
    });
    return result.records.map((r) => ({
      id: r.get("id"),
      labels: r.get("labels"),
      props: r.get("props"),
    }));
  });
}
