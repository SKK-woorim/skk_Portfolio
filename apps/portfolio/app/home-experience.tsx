'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { PortfolioContent } from '@skk/content-schema';

gsap.registerPlugin(ScrollTrigger);

type HomeExperienceProps = {
  content: PortfolioContent;
};

export function HomeExperience({ content }: HomeExperienceProps) {
  const rootRef = useRef<HTMLElement>(null);
  const featuredProjects = content.projects.filter((project) => project.isFeatured);
  const projects = featuredProjects.length ? featuredProjects : content.projects;
  const skillGroups = content.skills.reduce<Record<string, typeof content.skills>>((groups, skill) => {
    groups[skill.category] ??= [];
    groups[skill.category].push(skill);
    return groups;
  }, {});

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const ctx = gsap.context(() => {
        gsap.from('.hero-word', {
          y: 22,
          opacity: 0,
          duration: 0.7,
          ease: 'power4.out',
          stagger: 0.08
        });

        gsap.from('.hero-media', {
          y: 18,
          scale: 0.98,
          opacity: 0,
          duration: 0.7,
          delay: 0.2,
          ease: 'power2.out'
        });

        gsap.utils.toArray<HTMLElement>('.reveal-copy').forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0.64, y: 18 },
            {
              opacity: 1,
              y: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: element,
                start: 'top 82%',
                end: 'top 42%',
                scrub: true
              }
            }
          );
        });

        gsap.utils.toArray<HTMLElement>('.motion-media').forEach((element) => {
          gsap.fromTo(
            element,
            { scale: 0.98, opacity: 0.74 },
            {
              scale: 1,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: element,
                start: 'top 92%',
                end: 'bottom 22%',
                scrub: true
              }
            }
          );
        });
      }, root);

      return () => ctx.revert();
    },
    { scope: rootRef }
  );

  return (
    <main ref={rootRef} className="experience-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="홈으로 이동">
          {content.profile.displayName}
        </a>
        <nav aria-label="주요 섹션">
          <a href="#projects">Projects</a>
          <a href="#capability">Skills</a>
          <a href="#record">Record</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section id="top" className="hero">
        <div className="hero-copy">
          <p className="kicker">Developer Portfolio</p>
          <h1>
            <span className="hero-word">{content.profile.displayName}</span>
          </h1>
          <p className="headline reveal-copy">{content.profile.headline}</p>
          <p className="bio reveal-copy">{content.profile.bio}</p>
          <div className="hero-actions">
            <a className="primary-button" href="#projects">
              프로젝트 보기
            </a>
            <a className="secondary-button" href="#contact">
              연락 정보
            </a>
          </div>
        </div>
        <aside className="hero-media motion-media" aria-label="포트폴리오 요약">
          <div className="hero-media-caption">
            <span>Focus Area</span>
            <strong>{content.profile.interests.slice(0, 3).join(' / ')}</strong>
          </div>
          <div className="hero-summary-list">
            <section>
              <span>Role</span>
              <strong>Developer</strong>
            </section>
            <section>
              <span>Work Style</span>
              <strong>Structure first, product focused</strong>
            </section>
          </div>
        </aside>
      </section>

      <section id="projects" className="section project-section">
        <div className="section-heading wide-heading">
          <p className="kicker">Selected Work</p>
          <h2 className="reveal-copy">프로젝트는 결과보다 구조를 먼저 보여줘야 합니다.</h2>
        </div>
        <div className="project-bento">
          {projects.map((project, index) => (
            <Link
              href={`/projects/${project.slug}`}
              className={index === 0 ? 'project-tile project-tile-large' : 'project-tile'}
              key={project.slug}
            >
              <div
                className="tile-image motion-media"
                style={{
                  backgroundImage: project.thumbnailUrl ? `url(${project.thumbnailUrl})` : undefined
                }}
              />
              <div className="tile-content">
                <p>{project.period} / {project.role}</p>
                <h3>{project.title}</h3>
                <span>{project.summary}</span>
                <div className="tag-list">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <strong key={tech}>{tech}</strong>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="capability" className="section capability-section">
        <div className="section-heading sticky-heading">
          <p className="kicker">Capability</p>
          <h2 className="reveal-copy">기술은 목록이 아니라 판단의 흔적입니다.</h2>
        </div>
        <div className="accordion-stack">
          {Object.entries(skillGroups).map(([category, skills], index) => (
            <article className="skill-accordion motion-media" key={category}>
              <div>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{category}</h3>
              </div>
              <div className="skill-rail">
                {skills.map((skill) => (
                  <section key={skill.name}>
                    <strong>{skill.name}</strong>
                    <p>{skill.description || skill.level || 'project-ready'}</p>
                  </section>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="record" className="section record-section">
        <div className="section-heading wide-heading">
          <p className="kicker">Record</p>
          <h2 className="reveal-copy">학력, 수상, 자격은 신뢰를 보강하는 기록입니다.</h2>
        </div>
        <div className="record-grid">
          <div className="record-column">
            <h3>Education</h3>
            {content.education.map((item) => (
              <article className="record-card" key={`${item.school}-${item.major}`}>
                <p>{[item.startDate, item.endDate].filter(Boolean).join(' - ') || 'Period'}</p>
                <strong>{item.school}</strong>
                <span>{item.major}</span>
              </article>
            ))}
          </div>
          <div className="record-column">
            <h3>Awards</h3>
            {content.awards.length ? (
              content.awards.map((award) => (
                <Link href={`/awards/${award.slug}`} className="record-card" key={award.slug}>
                  <p>{award.awardedAt} / {award.organizer}</p>
                  <strong>{award.title}</strong>
                  <span>{award.summary}</span>
                </Link>
              ))
            ) : (
              <article className="record-card">
                <strong>공개된 수상 내역이 없습니다.</strong>
              </article>
            )}
          </div>
          <div className="record-column">
            <h3>Certifications</h3>
            {content.certifications.length ? (
              content.certifications.map((certification) => (
                <article className="record-card" key={`${certification.title}-${certification.issuer}`}>
                  <p>{certification.issuedAt || 'Issued'}</p>
                  <strong>{certification.title}</strong>
                  <span>{certification.issuer}</span>
                </article>
              ))
            ) : (
              <article className="record-card">
                <strong>공개된 자격증 정보가 없습니다.</strong>
              </article>
            )}
          </div>
        </div>
      </section>

      <footer id="contact" className="footer">
        <div>
          <p className="kicker">Contact</p>
          <h2>함께 만들 다음 제품을 이야기해요.</h2>
          <span>{content.profile.location}</span>
        </div>
        <div className="footer-links">
          {content.profile.email ? <a href={`mailto:${content.profile.email}`}>{content.profile.email}</a> : null}
          {content.links.map((link) => (
            <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </main>
  );
}
