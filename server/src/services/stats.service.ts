import { withSession } from "../db/session";
import {
  NODE_COUNTS_BY_LABEL,
  RELATIONSHIP_COUNTS_BY_TYPE,
  SKILLS_BY_CATEGORY,
  TOTAL_NODE_COUNT,
  TOTAL_RELATIONSHIP_COUNT,
} from "../../queries/stats.cypher";

export interface StatsResult {
  totalNodes: number;
  totalRelationships: number;
  nodesByLabel: { label: string; count: number }[];
  relationshipsByType: { type: string; count: number }[];
  skillsByCategory: { category: string; count: number }[];
}

export async function getGraphStats(): Promise<StatsResult> {
  return withSession(async (session) => {
    const [totalNodes, totalRels, byLabel, byType, byCategory] = await Promise.all([
      session.run(TOTAL_NODE_COUNT),
      session.run(TOTAL_RELATIONSHIP_COUNT),
      session.run(NODE_COUNTS_BY_LABEL),
      session.run(RELATIONSHIP_COUNTS_BY_TYPE),
      session.run(SKILLS_BY_CATEGORY),
    ]);

    return {
      totalNodes: totalNodes.records[0]?.get("total") ?? 0,
      totalRelationships: totalRels.records[0]?.get("total") ?? 0,
      nodesByLabel: byLabel.records.map((r) => ({ label: r.get("label"), count: r.get("count") })),
      relationshipsByType: byType.records.map((r) => ({
        type: r.get("type"),
        count: r.get("count"),
      })),
      skillsByCategory: byCategory.records.map((r) => ({
        category: r.get("category"),
        count: r.get("count"),
      })),
    };
  });
}
