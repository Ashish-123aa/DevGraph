import { Request, Response } from "express";
import * as companyService from "../services/company.service";

export async function getCompaniesForTechnology(req: Request, res: Response) {
  const companies = await companyService.findCompaniesForTechnology(req.params.technology as string);
  res.json({ companies });
}

export async function getCompany(req: Request, res: Response) {
  const company = await companyService.getCompanyDetail(req.params.id as string);
  res.json({ company });
}
