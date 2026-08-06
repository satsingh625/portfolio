export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string; // "Present" allowed
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured: boolean;
  year: number;
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  year: string;
  score?: string;
  note?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  readingTime: string;
  tags: string[];
  content: string; // markdown-ish body
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

export interface GitHubActivity {
  username: string;
  publicRepos: number;
  followers: number;
  topRepos: GitHubRepo[];
  contributionsLastYear: number | null;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
