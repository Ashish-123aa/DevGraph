import { Router } from "express";
import * as statsController from "../controllers/stats.controller";
import { asyncHandler } from "../middleware/errorHandler";

const router = Router();

// GET /api/stats
router.get("/", asyncHandler(statsController.getStats));

export default router;
