import { Request, Response } from "express";
import * as graphService from "../services/graph.service";
import { NodeLabel } from "../utils/types";

export async function getNode(req: Request, res: Response) {
  const node = await graphService.getNodeById(req.params.id as string);
  res.json({ node });
}

export async function getNeighbors(req: Request, res: Response) {
  const { limit } = req.query as unknown as { limit?: number };
  const graph = await graphService.getNodeNeighbors(req.params.id as string, limit);
  res.json(graph);
}

export async function explore(req: Request, res: Response) {
  const { nodeId, depth, limit } = req.query as unknown as {
    nodeId?: string;
    depth?: number;
    limit?: number;
  };

  if (!nodeId) {
    const graph = await graphService.exploreSample(limit);
    res.json(graph);
    return;
  }

  const graph = await graphService.exploreFromNode(nodeId, depth, limit);
  res.json(graph);
}

/** Factory: returns a request handler that lists all nodes of a fixed label (e.g. all Skills). */
export function listByLabel(label: NodeLabel) {
  return async (req: Request, res: Response) => {
    const { limit } = req.query as unknown as { limit?: number };
    const items = await graphService.listByLabel(label, limit);
    res.json({ items });
  };
}
