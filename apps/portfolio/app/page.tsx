import Link from 'next/link';
import { getPublicContent } from '@/lib/content';

export default function HomePage() {
  const content = getPublicContent();
  const featuredProjects = content.projects.filter((project) => project.isFeatured);
  const skillGroups = content.skills.reduce<Record<string, typeof content.skills>>((groups, skill) => {
    groups[skill.category] ??= [];
    groups[skill.category].push(skill);
    return groups;
  }, {});

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top">
          {content.profile.displayName}
        </a>
        <nav aria-label="주요 섹션">
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#timeline">Timeline</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section id="top" className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Developer Portfolio</p>
          <h1>{content.profile.displayName}</h1>
          <p className="headline">{content.profile.headline}</p>
          <p className="bio">{content.profile.bio}</p>
          <div className="hero-actions">
            <a className="primary-button" href="#projects">
              프로젝트 보기
            </a>
            <a className="secondary-button" href="#contact">
              연락 정보
            </a>
          </div>
        </div>
        <aside className="hero-panel" aria-label="관심 분야">
          <span>Interests</span>
          <div className="interest-list">
            {content.profile.interests.map((interest) => (
              <strong key={interest}>{interest}</strong>
            ))}
          </div>
        </aside>
      </section>

      <section id="projects" className="section">
        <div className="section-heading">
          <p className="eyebrow">Selected Work</p>
          <h2>Projects</h2>
        </div>
        <div className="project-grid">
          {(featuredProjects.length ? featuredProjects : content.projects).map((project) => (
            <article className="card project-card" key={project.slug}>
              <div>
                <p className="meta">{project.period} · {project.role}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
              <div className="tag-list">
                {project.techStack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <Link href={`/projects/${project.slug}`} className="text-link">
                상세 보기
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="section split-section">
        <div className="section-heading">
          <p className="eyebrow">Capability</p>
          <h2>Skills</h2>
        </div>
        <div className="skill-groups">
          {Object.entries(skillGroups).map(([category, skills]) => (
            <article className="card" key={category}>
              <h3>{category}</h3>
              <div className="skill-list">
                {skills.map((skill) => (
                  <div key={skill.name} className="skill-row">
                    <strong>{skill.name}</strong>
                    <span>{skill.level ?? 'learning'}</span>
                    {skill.description ? <p>{skill.description}</p> : null}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="timeline" className="section timeline-section">
        <div>
          <div className="section-heading">
            <p className="eyebrow">Education</p>
            <h2>Education</h2>
          </div>
          <div className="stack">
            {content.education.map((item) => (
              <article className="card" key={`${item.school}-${item.major}`}>
                <p className="meta">{[item.startDate, item.endDate].filter(Boolean).join(' - ')}</p>
                <h3>{item.school}</h3>
                <p>{item.major}</p>
                {item.description ? <p>{item.description}</p> : null}
              </article>
            ))}
          </div>
        </div>
        <div>
          <div className="section-heading">
            <p className="eyebrow">Awards</p>
            <h2>Awards</h2>
          </div>
          <div className="stack">
            {content.awards.length ? (
              content.awards.map((award) => (
                <article className="card" key={award.slug}>
                  <p className="meta">{award.awardedAt} · {award.organizer}</p>
                  <h3>{award.title}</h3>
                  <p>{award.summary}</p>
                  <Link href={`/awards/${award.slug}`} className="text-link">
                    상세 보기
                  </Link>
                </article>
              ))
            ) : (
              <article className="card muted-card">
                <p>공개된 수상 내역이 없습니다.</p>
              </article>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Credentials</p>
          <h2>Certifications</h2>
        </div>
        <div className="compact-list">
          {content.certifications.length ? (
            content.certifications.map((certification) => (
              <article className="compact-item" key={`${certification.title}-${certification.issuer}`}>
                <strong>{certification.title}</strong>
                <span>{certification.issuer}</span>
                <span>{certification.issuedAt}</span>
              </article>
            ))
          ) : (
            <p className="empty-text">공개된 자격증 정보가 없습니다.</p>
          )}
        </div>
      </section>

      <footer id="contact" className="footer">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>{content.profile.displayName}</h2>
          <p>{content.profile.location}</p>
        </div>
        <div className="footer-links">
          {content.profile.email ? <a href={`mailto:${content.profile.email}`}>{content.profile.email}</a> : null}
          {content.links.map((link) => (
            <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}
