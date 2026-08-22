import { Router } from "express";
import * as companyController from "../controllers/company.controller";
import { asyncHandler } from "../middleware/errorHandler";

const router = Router();

// GET /api/companies/technology/:technology
router.get("/technology/:technology", asyncHandler(companyController.getCompaniesForTechnology));

// GET /api/companies/:id
router.get("/:id", asyncHandler(companyController.getCompany));

export default router;
