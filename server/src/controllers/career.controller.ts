import { Request, Response } from "express";
import * as careerService from "../services/career.service";

export async function getCareerPaths(req: Request, res: Response) {
  const { skill, role, limit } = req.query as unknown as {
    skill: string;
    role: string;
    limit?: number;
  };
  const paths = await careerService.findCareerPaths(skill, role, limit);
  res.json({ paths });
}

export async function postSkillGap(req: Request, res: Response) {
  const { knownSkills, targetRole } = req.body as { knownSkills: string[]; targetRole: string };
  const result = await careerService.analyzeSkillGap(knownSkills, targetRole);
  res.json(result);
}

export async function getRecommendations(req: Request, res: Response) {
  const { knownSkills, targetRole } = req.body as { knownSkills: string[]; targetRole: string };
  const recommendations = await careerService.recommendNextSkills(knownSkills, targetRole);
  res.json({ recommendations });
}
