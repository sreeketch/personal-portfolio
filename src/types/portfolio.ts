export interface HeroStat {
  id: string;
  label: string;
  desc: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
}

export interface ProfileData {
  name: string;
  title: string;
  headline: string;
  tagline: string;
  subheading: string;
  status: string;
  location: string;
  email: string;
  heroStats: HeroStat[];
  socials: SocialLink[];
}

export interface SkillCategory {
  category: string;
  level: number;
  items: string[];
}

export interface PipelineTool {
  name: string;
  role: string;
  badge: string;
}

export interface AboutData {
  bioParagraphs: string[];
  skills: SkillCategory[];
  pipelineTools: PipelineTool[];
}

export interface ShowreelData {
  title: string;
  duration: string;
  year: string;
  description: string;
  videoUrl: string;
  posterImage: string;
}

export interface ProcessStep {
  step: string;
  name: string;
  shortDesc: string;
  details: string;
  tools: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  modelUrl: string | null;
  videoUrl: string | null;
  featured: boolean;
  year: string;
  polycount: string;
  tools: string[];
  stats?: Record<string, string | undefined>;
}

export interface PortfolioData {
  profile: ProfileData;
  about: AboutData;
  showreel: ShowreelData;
  process: ProcessStep[];
  categories: string[];
  projects: ProjectItem[];
}
