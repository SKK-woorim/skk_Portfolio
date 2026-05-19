export type Visibility = {
  isPublic: boolean;
  sortOrder: number;
};

export type Profile = {
  displayName: string;
  legalName?: string;
  headline: string;
  bio: string;
  interests: string[];
  email?: string;
  location?: string;
  isPublic: boolean;
};

export type PortfolioLink = Visibility & {
  label: string;
  url: string;
  type: 'github' | 'blog' | 'linkedin' | 'email' | 'other';
};

export type Education = Visibility & {
  school: string;
  major: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
};

export type Skill = Visibility & {
  name: string;
  category: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  description?: string;
  relatedProjectIds: string[];
};

export type Project = Visibility & {
  title: string;
  slug: string;
  period: string;
  role: string;
  summary: string;
  body: string;
  techStack: string[];
  highlights: string[];
  links: {
    github?: string;
    demo?: string;
    docs?: string;
  };
  thumbnailUrl?: string;
  isFeatured: boolean;
};

export type Award = Visibility & {
  title: string;
  slug: string;
  organizer: string;
  awardedAt: string;
  summary: string;
  body: string;
  relatedProjectIds: string[];
};

export type Certification = Visibility & {
  title: string;
  issuer: string;
  issuedAt: string;
  expiresAt?: string;
  credentialUrl?: string;
};

export type PortfolioContent = {
  profile: Profile;
  links: PortfolioLink[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  awards: Award[];
  certifications: Certification[];
};

export type ContentCollection =
  | 'profile'
  | 'education'
  | 'skills'
  | 'certifications'
  | 'links'
  | 'projects'
  | 'awards';

export function bySortOrder<T extends Visibility>(items: T[]): T[] {
  return [...items].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function publicItems<T extends Visibility>(items: T[]): T[] {
  return bySortOrder(items.filter((item) => item.isPublic));
}
