import fs from 'node:fs';
import path from 'node:path';
import {
  bySortOrder,
  publicItems,
  type Award,
  type Certification,
  type Education,
  type PortfolioContent,
  type PortfolioLink,
  type Profile,
  type Project,
  type Skill
} from '@skk/content-schema';

const contentDir = path.join(process.cwd(), '../../content');

function readJson<T>(fileName: string): T {
  const filePath = path.join(contentDir, fileName);
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
}

function parseScalar(value: string) {
  const trimmed = value.trim();

  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function parseFrontmatter(markdown: string) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    return { data: {}, body: markdown };
  }

  const data: Record<string, unknown> = {};
  const lines = match[1].split('\n');

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const pair = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);

    if (!pair) continue;

    const key = pair[1];
    const rawValue = pair[2];

    if (rawValue === '') {
      const values: string[] = [];
      while (lines[index + 1]?.trim().startsWith('- ')) {
        index += 1;
        values.push(String(parseScalar(lines[index].trim().slice(2))));
      }
      data[key] = values;
    } else {
      data[key] = parseScalar(rawValue);
    }
  }

  return { data, body: match[2].trim() };
}

function readMarkdownCollection<T>(directory: string, map: (data: Record<string, unknown>, body: string) => T): T[] {
  const dirPath = path.join(contentDir, directory);

  if (!fs.existsSync(dirPath)) return [];

  return fs
    .readdirSync(dirPath)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const markdown = fs.readFileSync(path.join(dirPath, fileName), 'utf8');
      const { data, body } = parseFrontmatter(markdown);
      return map(data, body);
    });
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String) : [];
}

export function getContent(): PortfolioContent {
  const profile = readJson<Profile>('profile.json');
  const links = readJson<PortfolioLink[]>('links.json');
  const education = readJson<Education[]>('education.json');
  const skills = readJson<Skill[]>('skills.json');
  const certifications = readJson<Certification[]>('certifications.json');
  const projects = readMarkdownCollection<Project>('projects', (data, body) => ({
    title: String(data.title ?? ''),
    slug: String(data.slug ?? ''),
    period: String(data.period ?? ''),
    role: String(data.role ?? ''),
    summary: String(data.summary ?? ''),
    body,
    techStack: asStringArray(data.techStack),
    highlights: asStringArray(data.highlights),
    links: {
      github: String(data.github ?? ''),
      demo: String(data.demo ?? ''),
      docs: String(data.docs ?? '')
    },
    thumbnailUrl: String(data.thumbnailUrl ?? ''),
    isFeatured: Boolean(data.isFeatured),
    isPublic: Boolean(data.isPublic),
    sortOrder: Number(data.sortOrder ?? 0)
  }));
  const awards = readMarkdownCollection<Award>('awards', (data, body) => ({
    title: String(data.title ?? ''),
    slug: String(data.slug ?? ''),
    organizer: String(data.organizer ?? ''),
    awardedAt: String(data.awardedAt ?? ''),
    summary: String(data.summary ?? ''),
    body,
    relatedProjectIds: asStringArray(data.relatedProjectIds),
    isPublic: Boolean(data.isPublic),
    sortOrder: Number(data.sortOrder ?? 0)
  }));

  return {
    profile,
    links: bySortOrder(links),
    education: bySortOrder(education),
    skills: bySortOrder(skills),
    projects: bySortOrder(projects),
    awards: bySortOrder(awards),
    certifications: bySortOrder(certifications)
  };
}

export function getPublicContent() {
  const content = getContent();

  return {
    ...content,
    links: publicItems(content.links).filter((link) => link.url),
    education: publicItems(content.education),
    skills: publicItems(content.skills),
    projects: publicItems(content.projects),
    awards: publicItems(content.awards),
    certifications: publicItems(content.certifications)
  };
}

export function getPublicProject(slug: string) {
  return getPublicContent().projects.find((project) => project.slug === slug);
}

export function getPublicAward(slug: string) {
  return getPublicContent().awards.find((award) => award.slug === slug);
}
