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
  // Same rule as career.service.ts: one session can't run concurrent
  // queries, so each of these five gets its own session from the pool.
  const [totalNodes, totalRels, byLabel, byType, byCategory] = await Promise.all([
    withSession((session) => session.run(TOTAL_NODE_COUNT)),
    withSession((session) => session.run(TOTAL_RELATIONSHIP_COUNT)),
    withSession((session) => session.run(NODE_COUNTS_BY_LABEL)),
    withSession((session) => session.run(RELATIONSHIP_COUNTS_BY_TYPE)),
    withSession((session) => session.run(SKILLS_BY_CATEGORY)),
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
}