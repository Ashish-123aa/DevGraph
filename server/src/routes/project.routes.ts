import { Router } from "express";
import { z } from "zod";
import * as projectController from "../controllers/project.controller";
import { asyncHandler } from "../middleware/errorHandler";
import { validateBody } from "../middleware/validate";

const router = Router();

const recommendBodySchema = z.object({
  skills: z.array(z.string()).min(1, "Provide at least one skill."),
  limit: z.number().int().min(1).max(50).optional().default(20),
});

// GET /api/projects/:id
router.get("/:id", asyncHandler(projectController.getProject));

// POST /api/projects/recommend  { skills: string[] }
router.post(
  "/recommend",
  validateBody(recommendBodySchema),
  asyncHandler(projectController.recommendProjects)
);

export default router;
