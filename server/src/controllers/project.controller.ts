import { Request, Response } from "express";
import * as projectService from "../services/project.service";

export async function recommendProjects(req: Request, res: Response) {
  const { skills, limit } = req.body as { skills: string[]; limit?: number };
  const projects = await projectService.findProjectsForSkills(skills, limit);
  res.json({ projects });
}

export async function getProject(req: Request, res: Response) {
  const project = await projectService.getProjectDetail(req.params.id as string);
  res.json({ project });
}
