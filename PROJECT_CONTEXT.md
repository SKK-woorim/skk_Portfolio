# Project Context

## 1. Project Purpose

개발자 포트폴리오 사이트를 제작한다. 웹/앱 형태의 반응형 UI를 제공하고, 방문자가 지원자의 핵심 정보와 프로젝트 역량을 빠르게 파악할 수 있게 한다.

단순 정적 사이트가 아니라 로컬 전용 개발자 페이지에서 개인정보, 학력, 스킬, 프로젝트, 수상 내역, 자격증, 링크를 수정할 수 있는 관리형 포트폴리오 앱을 목표로 한다. 공개 배포 대상은 포트폴리오 사이트만이다.

## 2. Tech Stack

공개 사이트는 Next.js로 확정. 배포는 Netlify로 확정. 관리자 페이지는 배포하지 않고 로컬에서만 실행한다.

현재 방향:

- 공개 포트폴리오: Next.js
- 로컬 관리자 앱: Vite + React
- 데이터 저장: JSON + Markdown 파일
- 게시글 작성: Markdown
- 스타일링: plain CSS
- 배포: Netlify에는 공개 포트폴리오만 배포

## 3. How to Run

```bash
npm install
npm run dev:portfolio
npm run dev:admin
```

- 공개 포트폴리오: `http://localhost:3000`
- 로컬 관리자 앱: `http://127.0.0.1:5174`

## 4. Important Files

- `README.md`: 프로젝트 개요와 실행 정보
- `docs/PLANNING.md`: 포트폴리오 기획 문서
- `PROJECT_CONTEXT.md`: AI 협업 및 인수인계용 현재 맥락
- `apps/portfolio`: Next.js 공개 포트폴리오
- `apps/admin`: Vite + React 로컬 관리자 앱
- `content`: JSON/Markdown 콘텐츠 원본
- `packages/content-schema`: 공유 타입과 공개 필터 유틸
- `netlify.toml`: Netlify 공개 사이트 배포 설정

## 5. Recent Changes

- 2026-05-19: 프로젝트 폴더 생성 및 기획 단계 문서 시작.
- 2026-05-19: 사용자 요구사항 반영. 이름은 송경근. 콘텐츠를 한곳에서 관리하고, 소유자 전용 개발자 페이지에서 개인정보 및 이력 정보 수정, 프로젝트/수상 상세 게시글 작성이 가능해야 함.
- 2026-05-19: 공개 사이트는 Next.js, Netlify 배포로 확정. 관리자 페이지는 로컬 전용으로 운영하고, 데이터는 JSON/Markdown 파일 기반으로 관리하는 방향 확정.
- 2026-05-19: `apps/portfolio`, `apps/admin`, `content`, `packages/content-schema` 초기 구현. 공개 사이트와 로컬 관리자 앱 빌드 통과.

## 6. Current Task

초기 앱 골격 구현 완료. 다음 작업은 실제 콘텐츠 입력, UI polish, 관리자 편집 UX 개선이다.

## 7. Next Steps

- 실제 프로필 정보 수집
- 포트폴리오 톤과 목표 독자 확정
- 주요 화면 와이어프레임 작성
- 관리자 앱을 JSON textarea 중심에서 폼 기반 편집 UX로 개선
- 프로젝트/수상 Markdown 미리보기 추가
- Netlify 연결 및 배포 검증

## 8. Cautions

- 개인정보, 전화번호, 이메일, 외부 계정 링크는 공개 범위를 확인한 뒤 문서나 코드에 넣는다.
- 자격증 번호, 주민등록번호, 내부 프로젝트 보안 정보, 비공개 저장소 URL은 공개 포트폴리오에 노출하지 않는다.
- 관리자 페이지는 Netlify에 배포하지 않는다.
- 공개 사이트 빌드 결과물에 관리자 코드와 비공개 정보가 포함되지 않도록 한다.
- 공개 페이지는 `isPublic` 기준으로만 데이터를 노출해야 한다.
- 공개 저장소에 올릴 수 없는 개인정보는 `content/`에 넣지 않는다.
- 개인 프로젝트이지만 Git 기록을 유지한다.
- `npm audit --omit=dev`에서 Next.js 하위 `postcss` moderate 경고 2건이 남아 있다. `npm audit fix`는 변경을 만들지 못했고, 강제 수정은 부적절한 Next.js 다운그레이드를 유도한다.

## 9. AI Handoff Notes

사용자는 `personal/skk_Portfolio`에 개발자 포트폴리오 사이트를 만들고 싶어 한다. 현재 요청은 구현이 아니라 기획 단계다. 반응형 웹/앱 형태가 필요하며 포함 정보는 기본 정보, 학력, 스킬, 프로젝트 이력, 수상 내역, 자격증이다.

추가 요구사항: 이름은 송경근. 개인정보, 학력, 수상 내역, 자격증, 링크는 추후 쉽게 수정할 수 있도록 한곳에서 관리해야 한다. 프로젝트와 수상 내역은 Markdown 상세 본문이 필요하며, 소유자만 로컬에서 실행하는 개발자 페이지에서 게시글 생성/수정 및 개인정보 수정을 할 수 있어야 한다.

확정 사항: 공개 사이트는 Next.js로 만들고 Netlify에 배포한다. 관리자 페이지는 배포하지 않고 로컬에서만 실행한다. 데이터는 JSON/Markdown 파일 기반으로 관리한다.

구현 상태: 공개 사이트는 `apps/portfolio`, 로컬 관리자 앱은 `apps/admin`에 있다. 관리자 앱은 Vite dev server middleware로 `content/` 파일을 읽고 쓴다. 공개 사이트는 정적 export로 `apps/portfolio/out`을 생성한다.
