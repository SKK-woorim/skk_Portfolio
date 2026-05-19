import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPublicContent, getPublicProject } from '@/lib/content';
import { markdownToHtml } from '@/lib/markdown';

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublicContent().projects.map((project) => ({
    slug: project.slug
  }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getPublicProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="detail-page">
      <Link href="/" className="text-link">
        홈으로
      </Link>
      <article className="detail-article">
        <p className="eyebrow">Project</p>
        <h1>{project.title}</h1>
        <p className="headline">{project.summary}</p>
        <div className="detail-meta">
          <span>{project.period}</span>
          <span>{project.role}</span>
        </div>
        <div className="tag-list">
          {project.techStack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className="prose" dangerouslySetInnerHTML={{ __html: markdownToHtml(project.body) }} />
      </article>
    </main>
  );
}
