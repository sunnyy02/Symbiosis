import { Project } from "@/types";

let cachedProjects: Project[] | null = null;

export async function loadProjects(): Promise<Project[]> {
  if (cachedProjects) {
    return cachedProjects;
  }

  try {
    // Determine base path for GitHub Pages
    const isProd = process.env.NODE_ENV === 'production';
    const basePath = isProd ? '/Symbiosis' : '';
    
    const response = await fetch(`${basePath}/projects.json`);
    if (!response.ok) {
      throw new Error("Failed to load projects");
    }
    const data = await response.json();
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

