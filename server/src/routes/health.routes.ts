import { Router } from "express";
import * as healthController from "../controllers/health.controller";
import { asyncHandler } from "../middleware/errorHandler";

const router = Router();

// GET /api/health
router.get("/", asyncHandler(healthController.getHealth));

export default router;
