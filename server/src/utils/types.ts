export type NodeLabel =
  | "Developer"
  | "Skill"
  | "Technology"
  | "Project"
  | "JobRole"
  | "Company"
  | "Resource";

/** The only labels DevGraph knows about - used to whitelist any query that interpolates a label. */
export const NODE_LABELS: NodeLabel[] = [
  "Developer",
  "Skill",
  "Technology",
  "Project",
  "JobRole",
  "Company",
  "Resource",
];

export interface GraphNodeDTO {
  id: string;
  labels: string[];
  props: Record<string, unknown>;
  degree?: number;
}

export interface GraphEdgeDTO {
  id: string;
  type: string;
  source: string;
  target: string;
}

export interface GraphDTO {
  nodes: GraphNodeDTO[];
  edges: GraphEdgeDTO[];
}

export class NotFoundError extends Error {
  status = 404;
}

export class ValidationError extends Error {
  status = 400;
}

export class DatabaseUnavailableError extends Error {
  status = 503;
  constructor(message = "The graph database is currently unavailable.") {
    super(message);
  }
}
