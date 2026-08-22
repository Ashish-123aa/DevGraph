import { Router } from "express";
import { z } from "zod";
import * as graphController from "../controllers/graph.controller";
import { asyncHandler } from "../middleware/errorHandler";
import { validateQuery } from "../middleware/validate";

// Typed listing endpoints backing dropdowns and browse views:
// GET /api/skills, /api/technologies, /api/job-roles, /api/projects, /api/companies
const router = Router();

const limitSchema = z.object({
  limit: z.coerce.number().int().min(1).max(500).optional().default(200),
});

router.get("/skills", validateQuery(limitSchema), asyncHandler(graphController.listByLabel("Skill")));
router.get(
  "/technologies",
  validateQuery(limitSchema),
  asyncHandler(graphController.listByLabel("Technology"))
);
router.get(
  "/job-roles",
  validateQuery(limitSchema),
  asyncHandler(graphController.listByLabel("JobRole"))
);
router.get(
  "/projects",
  validateQuery(limitSchema),
  asyncHandler(graphController.listByLabel("Project"))
);
router.get(
  "/companies",
  validateQuery(limitSchema),
  asyncHandler(graphController.listByLabel("Company"))
);
router.get(
  "/resources",
  validateQuery(limitSchema),
  asyncHandler(graphController.listByLabel("Resource"))
);

export default router;
