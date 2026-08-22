import { Router } from "express";
import { z } from "zod";
import * as graphController from "../controllers/graph.controller";
import { asyncHandler } from "../middleware/errorHandler";
import { validateQuery } from "../middleware/validate";
import { MAX_EXPLORE_DEPTH, MAX_EXPLORE_NODES } from "../services/graph.service";

// Mounted at /api/graph
const router = Router();

const exploreQuerySchema = z.object({
  nodeId: z.string().optional(),
  depth: z.coerce.number().int().min(1).max(MAX_EXPLORE_DEPTH).optional().default(MAX_EXPLORE_DEPTH),
  limit: z.coerce.number().int().min(1).max(MAX_EXPLORE_NODES).optional().default(MAX_EXPLORE_NODES),
});

// GET /api/graph/explore?nodeId=&depth=&limit=
router.get("/explore", validateQuery(exploreQuerySchema), asyncHandler(graphController.explore));

export default router;
