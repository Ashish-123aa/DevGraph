import {
  Boxes,
  Briefcase,
  Building2,
  FolderGit2,
  GraduationCap,
  User,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { NodeLabel } from "../types";

export interface EntityVisual {
  label: NodeLabel;
  displayName: string;
  color: string;
  icon: LucideIcon;
}

export const ENTITY_VISUALS: Record<NodeLabel, EntityVisual> = {
  Skill: { label: "Skill", displayName: "Skill", color: "#4FD1C5", icon: GraduationCap },
  Technology: { label: "Technology", displayName: "Technology", color: "#7C9EFF", icon: Wrench },
  Project: { label: "Project", displayName: "Project", color: "#F6A65B", icon: FolderGit2 },
  JobRole: { label: "JobRole", displayName: "Job Role", color: "#F27878", icon: Briefcase },
  Company: { label: "Company", displayName: "Company", color: "#B989F5", icon: Building2 },
  Developer: { label: "Developer", displayName: "Developer", color: "#6FCF97", icon: User },
  Resource: { label: "Resource", displayName: "Resource", color: "#E8D170", icon: Boxes },
};

export function visualForLabels(labels: string[]): EntityVisual {
  const match = labels.find((l) => l in ENTITY_VISUALS) as NodeLabel | undefined;
  return match ? ENTITY_VISUALS[match] : ENTITY_VISUALS.Skill;
}

export function primaryLabel(labels: string[]): NodeLabel {
  return (labels.find((l) => l in ENTITY_VISUALS) as NodeLabel | undefined) ?? "Skill";
}

/** Best-effort display name for a node, regardless of whether it uses `name` or `title`. */
export function nodeDisplayName(props: Record<string, any>): string {
  return props?.name ?? props?.title ?? "Untitled";
}
