import portfolioData from '../data/portfolio.json';

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  description: string;
  stats: {
    experience: string;
    projects: string;
    clients: string;
  };
  social: {
    linkedin: string;
    github: string;
    twitter: string;
  };
}

export interface Skill {
  icon: string;
  title: string;
  description: string;
  subtitle: string;
}

export interface Project {
  icon: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  liveUrl: string;
  githubUrl: string;
}

export interface ExperienceStat {
  icon: string;
  value: string;
  label: string;
}

export interface JourneyItem {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Experience {
  stats: ExperienceStat[];
  journey: JourneyItem[];
}

export interface Contact {
  email: string;
  phone: string;
  location: string;
  availability: string;
}

export interface NavigationItem {
  name: string;
  href: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  skills: Skill[];
  projects: Project[];
  experience: Experience;
  contact: Contact;
  navigation: NavigationItem[];
}

export const getPortfolioData = (): PortfolioData => {
  return portfolioData as PortfolioData;
};

export const getPersonalInfo = (): PersonalInfo => portfolioData.personal as PersonalInfo;
export const getSkills = (): Skill[] => portfolioData.skills as Skill[];
export const getProjects = (): Project[] => portfolioData.projects as Project[];
export const getExperience = (): Experience => portfolioData.experience as Experience;
export const getContact = (): Contact => portfolioData.contact as Contact;
export const getNavigation = (): NavigationItem[] => portfolioData.navigation as NavigationItem[]; 