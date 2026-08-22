import { Request, Response } from "express";
import * as searchService from "../services/search.service";

export async function search(req: Request, res: Response) {
  const { q, limit } = req.query as unknown as { q: string; limit?: number };
  const results = await searchService.searchNodes(q, limit);
  res.json({ results });
}
