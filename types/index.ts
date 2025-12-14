export interface Project {
  id: number;
  primary: string;
  secondary: string;
  title: string;
  hook: string;
  skills: string[];
  output: string;
  difficulty: number;
  time: string;
  tags: string[];
}

export interface Hobby {
  name: string;
  category: string;
  icon: string;
}
