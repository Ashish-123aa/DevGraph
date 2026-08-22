import { Router } from "express";
import { z } from "zod";
import * as searchController from "../controllers/search.controller";
import { asyncHandler } from "../middleware/errorHandler";
import { validateQuery } from "../middleware/validate";

const router = Router();

const searchQuerySchema = z.object({
  q: z.string().min(1, "Query parameter 'q' is required."),
  limit: z.coerce.number().int().min(1).max(100).optional().default(25),
});

// GET /api/search?q=java
router.get("/", validateQuery(searchQuerySchema), asyncHandler(searchController.search));

export default router;
