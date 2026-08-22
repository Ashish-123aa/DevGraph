import { Request, Response } from "express";
import * as statsService from "../services/stats.service";

export async function getStats(req: Request, res: Response) {
  const stats = await statsService.getGraphStats();
  res.json(stats);
}
