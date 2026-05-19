import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

type MarkdownFile = {
  fileName: string;
  path: string;
  content: string;
};

type ContentPayload = {
  json: Record<string, string>;
  projects: MarkdownFile[];
  awards: MarkdownFile[];
};

type EditableFile = {
  label: string;
  path: string;
  kind: 'json' | 'markdown';
  content: string;
};

const jsonLabels: Record<string, string> = {
  'profile.json': '기본 정보',
  'education.json': '학력',
  'skills.json': '스킬',
  'certifications.json': '자격증',
  'links.json': '외부 링크'
};

function createProjectTemplate(slug: string) {
  return `---
title: "새 프로젝트"
slug: "${slug}"
period: "2026"
role: "Developer"
summary: "프로젝트 요약을 입력하세요."
techStack:
  - "Next.js"
highlights:
  - "핵심 기여 내용을 입력하세요."
github: ""
demo: ""
docs: ""
thumbnailUrl: ""
isFeatured: false
isPublic: true
sortOrder: 99
---

## 프로젝트 개요

내용을 입력하세요.
`;
}

function createAwardTemplate(slug: string) {
  return `---
title: "새 수상 내역"
slug: "${slug}"
organizer: "주최 기관"
awardedAt: "2026"
summary: "수상 요약을 입력하세요."
relatedProjectIds: []
isPublic: false
sortOrder: 99
---

## 수상 개요

내용을 입력하세요.
`;
}

function formatJson(content: string) {
  return JSON.stringify(JSON.parse(content), null, 2);
}

function App() {
  const [payload, setPayload] = useState<ContentPayload | null>(null);
  const [activePath, setActivePath] = useState('profile.json');
  const [draft, setDraft] = useState('');
  const [status, setStatus] = useState('');

  async function loadContent(nextActivePath = activePath) {
    const response = await fetch('/api/content');
    const data = (await response.json()) as ContentPayload;
    setPayload(data);
    setActivePath(nextActivePath);
  }

  useEffect(() => {
    void loadContent('profile.json');
  }, []);

  const files = useMemo<EditableFile[]>(() => {
    if (!payload) return [];

    return [
      ...Object.entries(payload.json).map(([path, content]) => ({
        label: jsonLabels[path] ?? path,
        path,
        kind: 'json' as const,
        content
      })),
      ...payload.projects.map((file) => ({
        label: `프로젝트: ${file.fileName}`,
        path: file.path,
        kind: 'markdown' as const,
        content: file.content
      })),
      ...payload.awards.map((file) => ({
        label: `수상: ${file.fileName}`,
        path: file.path,
        kind: 'markdown' as const,
        content: file.content
      }))
    ];
  }, [payload]);

  const activeFile = files.find((file) => file.path === activePath) ?? files[0];

  useEffect(() => {
    if (activeFile) {
      setDraft(activeFile.content);
      setStatus('');
    }
  }, [activeFile?.path]);

  async function save() {
    if (!activeFile) return;

    try {
      const content = activeFile.kind === 'json' ? formatJson(draft) : draft;
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          path: activeFile.path,
          content
        })
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? '저장 실패');
      }

      setStatus('저장했습니다. Git diff를 확인하세요.');
      await loadContent(activeFile.path);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : '저장 실패');
    }
  }

  async function createMarkdown(type: 'projects' | 'awards') {
    const slug = window.prompt(type === 'projects' ? '프로젝트 slug를 입력하세요.' : '수상 slug를 입력하세요.');
    if (!slug) return;

    const safeSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
    const path = `${type}/${safeSlug}.md`;
    const content = type === 'projects' ? createProjectTemplate(safeSlug) : createAwardTemplate(safeSlug);

    const response = await fetch('/api/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ path, content })
    });
    const result = await response.json();

    if (!response.ok) {
      setStatus(result.error ?? '생성 실패');
      return;
    }

    await loadContent(path);
  }

  return (
    <main className="admin-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Local Admin</p>
          <h1>Portfolio Content</h1>
          <p className="hint">이 화면은 로컬에서만 실행합니다. 저장하면 `content/` 파일이 변경됩니다.</p>
        </div>
        <nav className="file-list" aria-label="콘텐츠 파일">
          {files.map((file) => (
            <button
              className={file.path === activeFile?.path ? 'active' : ''}
              key={file.path}
              type="button"
              onClick={() => setActivePath(file.path)}
            >
              <span>{file.label}</span>
              <small>{file.path}</small>
            </button>
          ))}
        </nav>
        <div className="create-actions">
          <button type="button" onClick={() => void createMarkdown('projects')}>
            프로젝트 추가
          </button>
          <button type="button" onClick={() => void createMarkdown('awards')}>
            수상 추가
          </button>
        </div>
      </aside>

      <section className="editor-panel">
        {activeFile ? (
          <>
            <div className="editor-header">
              <div>
                <p className="eyebrow">{activeFile.kind}</p>
                <h2>{activeFile.label}</h2>
                <p>{activeFile.path}</p>
              </div>
              <div className="toolbar">
                {activeFile.kind === 'json' ? (
                  <button type="button" onClick={() => setDraft(formatJson(draft))}>
                    JSON 정리
                  </button>
                ) : null}
                <button className="primary" type="button" onClick={() => void save()}>
                  저장
                </button>
              </div>
            </div>
            <textarea
              spellCheck={false}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              aria-label="콘텐츠 편집기"
            />
            <p className="status">{status}</p>
          </>
        ) : (
          <div className="empty-state">콘텐츠를 불러오는 중입니다.</div>
        )}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
