# skk_Portfolio

## Project Purpose

송경근 개발자 포트폴리오 사이트를 제작하는 개인 프로젝트다. 공개 사이트는 반응형 웹으로 제공하고, 개인정보와 이력 콘텐츠는 로컬 전용 관리자 앱에서 수정한다.

## Architecture

```text
skk_Portfolio/
├─ apps/
│  ├─ portfolio/      # Next.js 공개 포트폴리오, Netlify 배포 대상
│  └─ admin/          # Vite + React 로컬 전용 관리자 앱
├─ content/           # JSON / Markdown 콘텐츠 원본
├─ packages/
│  └─ content-schema/ # 공유 타입과 공개 필터 유틸
├─ docs/
├─ netlify.toml
└─ README.md
```

공개 사이트는 `content/` 파일을 읽어 정적 페이지로 빌드한다. 관리자 앱은 로컬에서만 실행하며 같은 `content/` 파일을 수정한다.

## Installation

```bash
npm install
```

## How to Run

공개 포트폴리오:

```bash
npm run dev:portfolio
```

기본 주소는 `http://localhost:3000`이다.

로컬 관리자 앱:

```bash
npm run dev:admin
```

기본 주소는 `http://127.0.0.1:5174`이다. 관리자 앱은 Netlify에 배포하지 않는다.

## Content Editing

1. `npm run dev:admin`을 실행한다.
2. 브라우저에서 `http://127.0.0.1:5174`에 접속한다.
3. 왼쪽 목록에서 기본 정보, 학력, 스킬, 자격증, 외부 링크, 프로젝트 Markdown, 수상 Markdown을 선택한다.
4. 내용을 수정한 뒤 `저장`을 누른다.
5. `git diff`로 변경 내용을 확인한다.
6. 공개 사이트에서 확인하려면 `npm run dev:portfolio` 또는 `npm run build:portfolio`를 실행한다.

프로젝트와 수상 내역은 Markdown frontmatter와 본문으로 관리한다. `isPublic`이 `true`인 항목만 공개 사이트에 노출된다.

## Build

```bash
npm run typecheck
npm run build:portfolio
npm run build:admin
```

## Netlify Deployment

Netlify에는 공개 사이트만 배포한다. 저장소 루트의 `netlify.toml` 기준:

```toml
[build]
  command = "npm run build:portfolio"
  publish = "apps/portfolio/out"
```

## Current Verification

- `npm run typecheck`: 통과
- `npm run build:portfolio`: 통과
- `npm run build:admin`: 통과
- `npm audit --omit=dev`: Next.js 하위 `postcss` 관련 moderate 경고 2건이 남아 있음. `npm audit fix`는 실제 변경을 만들지 못했고, 강제 수정은 부적절한 Next.js 다운그레이드를 유도하므로 적용하지 않았다.

## Git Management

이 프로젝트는 `personal/` 내부 개인 프로젝트이므로 Git 저장소로 관리한다.

```bash
git status
git add .
git commit -m "chore: update project"
```

## AI Handoff

작업 맥락은 `PROJECT_CONTEXT.md`에 기록한다. Codex와 Claude Code 모두 같은 문서를 기준으로 이어받아 작업한다.
