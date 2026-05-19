import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPublicAward, getPublicContent } from '@/lib/content';
import { markdownToHtml } from '@/lib/markdown';

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublicContent().awards.map((award) => ({
    slug: award.slug
  }));
}

export default function AwardDetailPage({ params }: { params: { slug: string } }) {
  const award = getPublicAward(params.slug);

  if (!award) {
    notFound();
  }

  return (
    <main className="detail-page">
      <Link href="/" className="text-link">
        홈으로
      </Link>
      <article className="detail-article">
        <p className="eyebrow">Award</p>
        <h1>{award.title}</h1>
        <p className="headline">{award.summary}</p>
        <div className="detail-meta">
          <span>{award.awardedAt}</span>
          <span>{award.organizer}</span>
        </div>
        <div className="prose" dangerouslySetInnerHTML={{ __html: markdownToHtml(award.body) }} />
      </article>
    </main>
  );
}
