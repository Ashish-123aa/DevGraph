import { Router } from "express";
import { z } from "zod";
import * as graphController from "../controllers/graph.controller";
import { asyncHandler } from "../middleware/errorHandler";
import { validateQuery } from "../middleware/validate";

// Mounted at /api/nodes
const router = Router();

const limitSchema = z.object({
  limit: z.coerce.number().int().min(1).max(200).optional().default(50),
});

// GET /api/nodes/:id
router.get("/:id", asyncHandler(graphController.getNode));

// GET /api/nodes/:id/neighbors?limit=
router.get(
  "/:id/neighbors",
  validateQuery(limitSchema),
  asyncHandler(graphController.getNeighbors)
);

export default router;
