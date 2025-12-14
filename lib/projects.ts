import { Project } from "@/types";
import fs from "fs/promises";
import path from "path";

let cachedProjects: Project[] | null = null;

export async function loadProjects(): Promise<Project[]> {
  if (cachedProjects) {
    return cachedProjects;
  }

  try {
    const filePath = path.join(process.cwd(), "public", "projects.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(fileContent);
    cachedProjects = data.projects;
    return cachedProjects || [];
  } catch (error) {
    console.error("Error loading projects:", error);
    return [];
  }
}

export async function getProjectByCombo(
  primary: string,
  secondary: string
): Promise<Project | null> {
  const projects = await loadProjects();

  // Try exact match first
  const exactMatches = projects.filter(
    (p) =>
      p.primary.toLowerCase() === primary.toLowerCase() &&
      p.secondary.toLowerCase() === secondary.toLowerCase()
  );

  if (exactMatches.length > 0) {
    return exactMatches[Math.floor(Math.random() * exactMatches.length)];
  }

  // Fallback: match primary only
  const primaryMatches = projects.filter(
    (p) => p.primary.toLowerCase() === primary.toLowerCase()
  );

  if (primaryMatches.length > 0) {
    return primaryMatches[Math.floor(Math.random() * primaryMatches.length)];
  }

  // Final fallback: random project
  return projects.length > 0
    ? projects[Math.floor(Math.random() * projects.length)]
    : null;
}

export function getRandomProject(): Promise<Project | null> {
  return getProjectByCombo("", "");
}

