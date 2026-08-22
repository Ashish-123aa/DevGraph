import { Router } from "express";
import { z } from "zod";
import * as careerController from "../controllers/career.controller";
import { asyncHandler } from "../middleware/errorHandler";
import { validateBody, validateQuery } from "../middleware/validate";

const router = Router();

const pathQuerySchema = z.object({
  skill: z.string().min(1, "A starting skill is required."),
  role: z.string().min(1, "A target job role is required."),
  limit: z.coerce.number().int().min(1).max(20).optional().default(5),
});

const skillGapBodySchema = z.object({
  knownSkills: z.array(z.string()).default([]),
  targetRole: z.string().min(1, "A target job role is required."),
});

const recommendBodySchema = z.object({
  knownSkills: z.array(z.string()).default([]),
  targetRole: z.string().min(1, "A target job role is required."),
});

// GET /api/career/path?skill=Java&role=Backend%20Engineer
router.get("/path", validateQuery(pathQuerySchema), asyncHandler(careerController.getCareerPaths));

// POST /api/career/skill-gap  { knownSkills: string[], targetRole: string }
router.post(
  "/skill-gap",
  validateBody(skillGapBodySchema),
  asyncHandler(careerController.postSkillGap)
);

// POST /api/career/recommendations  { knownSkills: string[], targetRole: string }
router.post(
  "/recommendations",
  validateBody(recommendBodySchema),
  asyncHandler(careerController.getRecommendations)
);

export default router;
