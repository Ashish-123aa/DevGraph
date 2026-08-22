export type NodeLabel =
  | "Developer"
  | "Skill"
  | "Technology"
  | "Project"
  | "JobRole"
  | "Company"
  | "Resource";

export interface GraphNode {
  id: string;
  labels: string[];
  props: Record<string, any>;
  degree?: number;
}

export interface GraphEdge {
  id: string;
  type: string;
  source: string;
  target: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface CareerPathResult {
  hops: number;
  nodes: { id: string; labels: string[]; props: Record<string, any> }[];
  relationships: { id: string; type: string }[];
}

export interface SkillGapItem {
  id: string;
  props: Record<string, any>;
  priority: "high" | "medium";
  reason: string;
}

export interface PrerequisiteGapItem {
  id: string;
  props: Record<string, any>;
  unlocksSkill: string;
}

export interface SkillGapResult {
  role: string;
  knownSkills: string[];
  gaps: SkillGapItem[];
  prerequisiteGaps: PrerequisiteGapItem[];
}

export interface SkillRecommendation {
  id: string;
  props: Record<string, any>;
  connectedTo: string | null;
  distance: number;
}

export interface ProjectMatch {
  id: string;
  props: Record<string, any>;
  matchedSkills: string[];
  matchCount: number;
}

export interface CompanyMatch {
  id: string;
  props: Record<string, any>;
  roles: { id: string; title: string }[];
}

export interface StatsResult {
  totalNodes: number;
  totalRelationships: number;
  nodesByLabel: { label: string; count: number }[];
  relationshipsByType: { type: string; count: number }[];
  skillsByCategory: { category: string; count: number }[];
}

export interface HealthResult {
  status: "ok" | "error";
  database: "connected" | "unavailable";
}
