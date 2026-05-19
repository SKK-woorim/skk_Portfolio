# skk_Portfolio Planning

## 1. Product Goal

개발자로서의 역량, 성장 과정, 프로젝트 경험을 신뢰감 있게 보여주는 개인 포트폴리오 사이트를 만든다. 데스크톱과 모바일에서 모두 읽기 쉬운 반응형 웹/앱으로 구성한다.

단순 정적 포트폴리오가 아니라, 개인정보와 이력 정보를 한곳에서 관리하고 비공개 개발자 페이지에서 프로젝트와 수상 내역의 상세 게시글을 작성/수정할 수 있는 관리형 포트폴리오 앱을 목표로 한다.

## 2. Target Visitors

- 채용 담당자
- 개발 리드 또는 면접관
- 협업 제안을 검토하는 사람
- 프로젝트 이력을 빠르게 확인하려는 지인 또는 동료

## 3. Core Message

아직 확정 전.

초안 방향:

- 문제를 구조화하고 끝까지 구현하는 개발자
- 프로젝트 경험과 학습 이력을 명확하게 설명할 수 있는 개발자
- 기술 선택의 이유와 결과물을 함께 보여주는 개발자

## 4. Required Content

### Owner

- 이름: 송경근

### Basic Info

- 이름 또는 표시명
- 한 줄 소개
- 짧은 자기소개
- 관심 분야
- 이메일 또는 연락 방법
- GitHub, LinkedIn, Blog 등 외부 링크

### Education

- 학교명
- 전공
- 재학 기간 또는 졸업 연도
- 관련 활동 또는 주요 과목

### Skills

- Language
- Frontend
- Backend
- Database
- DevOps / Infra
- Tools
- AI / Data 등 필요 시 별도 분류

각 스킬은 단순 나열보다 사용 경험 수준과 적용 프로젝트를 연결하는 방식이 좋다.

### Projects

프로젝트마다 다음 정보를 권장한다.

- 프로젝트명
- 기간
- 역할
- 사용 기술
- 핵심 기능
- 해결한 문제
- 본인이 기여한 부분
- 성과 또는 배운 점
- GitHub / Demo / 문서 링크
- 대표 이미지 또는 스크린샷
- 상세 게시글 본문
- 공개 여부
- 대표 프로젝트 여부
- 정렬 순서

### Awards

- 수상명
- 주최 기관
- 수상일
- 수상 내용
- 관련 프로젝트 또는 활동
- 상세 게시글 본문
- 공개 여부

### Certifications

- 자격증명
- 발급 기관
- 취득일
- 만료일이 있으면 만료일
- 공개 가능한 검증 링크가 있으면 링크

## 5. Information Architecture

공개 페이지와 비공개 개발자 페이지를 분리한다.

### Public Site

```text
Home
├─ Intro
├─ About
├─ Skills
├─ Projects
├─ Education
├─ Awards
├─ Certifications
└─ Contact
```

상세 페이지가 필요한 콘텐츠는 별도 라우트를 둔다.

```text
/
/projects
/projects/[slug]
/awards
/awards/[slug]
/resume
```

### Private Developer Page

개발자 페이지는 소유자만 접근할 수 있는 관리 화면이다.

```text
/admin/login
/admin
/admin/profile
/admin/education
/admin/skills
/admin/projects
/admin/projects/new
/admin/projects/[id]/edit
/admin/awards
/admin/awards/new
/admin/awards/[id]/edit
/admin/certifications
/admin/links
/admin/settings
```

관리 화면에서 수정 가능한 정보:

- 개인정보 및 기본 소개
- 학력
- 스킬
- 프로젝트 목록과 상세 게시글
- 수상 내역 목록과 상세 게시글
- 자격증
- 외부 링크
- 공개 여부, 정렬 순서, 대표 노출 여부

## 6. UX Direction

- 첫 화면에서 이름, 역할, 핵심 강점, 주요 링크를 바로 보여준다.
- 프로젝트 섹션은 가장 중요한 콘텐츠로 다룬다.
- 모바일에서는 카드형 목록과 접이식 상세 정보를 우선 고려한다.
- 데스크톱에서는 좌측 내비게이션 또는 상단 고정 내비게이션을 고려한다.
- 포트폴리오 사이트지만 마케팅 랜딩 페이지보다 실제 이력 검토에 적합한 밀도와 가독성을 우선한다.

## 7. Visual Direction

초기 후보:

- 조용하고 전문적인 개발자 포트폴리오
- 과한 장식보다 읽기 쉬운 타이포그래피와 명확한 섹션 구분
- 프로젝트 스크린샷, 기술 배지, 타임라인 요소 활용
- 다크 모드 또는 시스템 테마 연동은 구현 단계에서 검토

## 8. Tech Stack Candidates

관리자 페이지, 인증, 게시글 작성/수정이 필요하므로 정적 사이트보다 풀스택 웹 앱 구성이 적합하다.

### Option A: Next.js

- 장점: 공개 페이지와 관리자 페이지를 같은 프로젝트에서 관리하기 좋고, 라우팅/SEO/서버 기능/배포 생태계가 좋음
- 단점: 단순 정적 포트폴리오보다 설계할 요소가 많음

### Option B: Vite + React + Backend API

- 장점: 프론트엔드 앱 구조가 명확하고 자유도가 높음
- 단점: 인증, API 서버, SEO, 배포 구성을 별도로 설계해야 함

### Option C: Astro

- 장점: 공개 포트폴리오 성능이 좋고 콘텐츠 중심에 적합
- 단점: 관리자 페이지와 인증/수정 흐름을 만들려면 별도 백엔드 또는 외부 CMS가 필요

현재 추천 초안: Next.js.

이유: 공개 포트폴리오, 상세 페이지, 관리자 페이지, 인증, 데이터 수정 흐름을 한 프로젝트에서 다루기 쉽다.

## 9. Data Model Draft

개인정보, 학력, 수상 내역, 자격증, 링크는 추후 쉽게 수정할 수 있도록 한곳에서 관리한다. 초기 구현에서는 데이터 모델을 명확히 분리하고, 실제 저장소는 기술 스택 결정 후 선택한다.

저장 방식 후보:

- 로컬 JSON/Markdown: 빠른 초기 구현에 적합하지만 배포 환경에서 관리자 페이지 수정 내용을 저장하기 어려움
- SQLite + Prisma: 개인 포트폴리오 앱에 적합하고 로컬 개발이 쉬움
- Supabase/PostgreSQL: 인증과 DB를 함께 쓰기 좋고 배포 후 관리가 쉬움
- Headless CMS: 관리자 화면을 직접 만들 필요는 줄지만, 원하는 개발자 페이지 UX를 직접 통제하기 어려움

현재 추천 초안: Next.js + Prisma + SQLite로 시작하고, 배포 단계에서 Supabase/PostgreSQL 전환을 검토한다.

```ts
type Profile = {
  displayName: string;
  legalName?: string;
  headline: string;
  bio: string;
  interests: string[];
  email?: string;
  location?: string;
};

type Link = {
  label: string;
  url: string;
  type: 'github' | 'blog' | 'linkedin' | 'email' | 'other';
  isPublic: boolean;
  sortOrder: number;
};

type Education = {
  school: string;
  major: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  isPublic: boolean;
  sortOrder: number;
};

type Skill = {
  name: string;
  category: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  description?: string;
  relatedProjectIds: string[];
  isPublic: boolean;
  sortOrder: number;
};

type Project = {
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
  isPublic: boolean;
  sortOrder: number;
};

type Award = {
  title: string;
  slug: string;
  organizer: string;
  awardedAt: string;
  summary: string;
  body: string;
  relatedProjectIds: string[];
  isPublic: boolean;
  sortOrder: number;
};

type Certification = {
  title: string;
  issuer: string;
  issuedAt: string;
  expiresAt?: string;
  credentialUrl?: string;
  isPublic: boolean;
  sortOrder: number;
};
```

## 10. Admin Requirements

### Authentication

- 관리자 페이지는 소유자만 접근 가능해야 한다.
- 초기 구현에서는 단일 관리자 계정을 전제로 한다.
- 비밀번호, 세션 secret, OAuth secret 등은 `.env`로 관리하고 Git에 커밋하지 않는다.
- 배포 전 인증 방식을 확정한다.

인증 후보:

- NextAuth/Auth.js Credentials Provider
- Supabase Auth
- Clerk

### Content Editing

- 프로필, 학력, 스킬, 자격증, 링크는 폼 기반으로 수정한다.
- 프로젝트와 수상 내역은 목록 화면, 생성 화면, 수정 화면을 제공한다.
- 프로젝트와 수상 내역은 긴 본문을 작성할 수 있어야 한다.
- 본문 입력 방식은 Markdown 에디터를 우선 검토한다.
- 각 콘텐츠는 공개 여부와 정렬 순서를 설정할 수 있어야 한다.

### Security Notes

- 관리자 라우트는 서버 측에서 접근 제어한다.
- 비공개 정보는 공개 API 응답에 포함하지 않는다.
- 공개 페이지는 `isPublic` 기준으로만 데이터를 조회한다.
- 업로드 기능을 만들 경우 파일 크기, 확장자, 저장 위치를 별도 정책으로 정한다.

## 11. Planning Questions

다음 정보가 확정되면 구현 정확도가 높아진다.

- 포트폴리오의 주 대상은 취업, 프리랜스, 연구/학업, 개인 브랜딩 중 무엇인가?
- 표시할 이름은 송경근으로 확정해도 되는가?
- 한 줄 소개는 무엇인가?
- 주요 기술 스택은 무엇인가?
- 대표 프로젝트 3개는 무엇인가?
- 외부 공개 가능한 GitHub, 블로그, 이메일 링크가 있는가?
- 원하는 톤은 미니멀, 터미널 스타일, 앱 대시보드 스타일, 인터랙티브 스타일 중 어디에 가까운가?
- 관리자 로그인 방식은 이메일/비밀번호, GitHub 로그인, 별도 관리자 비밀번호 중 무엇을 선호하는가?
- 상세 게시글 본문은 Markdown 방식으로 작성해도 되는가?
- 배포 대상은 Vercel, 개인 서버, GitHub Pages 중 어디를 생각하는가?

## 12. Milestones

1. 기획 문서 작성
2. 콘텐츠 수집
3. 기술 스택 확정
4. 데이터 모델 확정
5. 인증 및 관리자 페이지 설계
6. 와이어프레임 작성
7. 기본 앱 구현
8. 관리자 CRUD 구현
9. 반응형 UI polish
10. 콘텐츠 입력
11. 배포 준비
