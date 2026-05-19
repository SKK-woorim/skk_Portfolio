# skk_Portfolio Planning

## 1. Product Goal

개발자로서의 역량, 성장 과정, 프로젝트 경험을 신뢰감 있게 보여주는 개인 포트폴리오 사이트를 만든다. 데스크톱과 모바일에서 모두 읽기 쉬운 반응형 웹/앱으로 구성한다.

단순 정적 포트폴리오가 아니라, 개인정보와 이력 정보를 한곳에서 관리하고 로컬 전용 개발자 페이지에서 프로젝트와 수상 내역의 상세 게시글을 작성/수정할 수 있는 관리형 포트폴리오 앱을 목표로 한다.

공개 배포 대상은 포트폴리오 사이트만이며, 관리자 페이지는 배포하지 않고 소유자 PC에서만 실행한다.

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

공개 페이지와 로컬 전용 개발자 페이지를 분리한다.

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

### Local Developer Page

개발자 페이지는 소유자 PC에서만 실행하는 로컬 전용 관리 화면이다. Netlify에는 배포하지 않는다.

```text
apps/admin
├─ dashboard
├─ profile
├─ education
├─ skills
├─ projects
├─ projects/new
├─ projects/[id]/edit
├─ awards
├─ awards/new
├─ awards/[id]/edit
├─ certifications
├─ links
└─ settings
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

공개 사이트는 Next.js로 만들고 Netlify에 배포한다. 관리자 페이지는 배포하지 않는 로컬 전용 앱으로 만들며, `content/`의 JSON/Markdown 파일을 수정한다.

### Selected Direction

- 공개 사이트: Next.js
- 배포: Netlify
- 관리자 페이지: 로컬 전용 앱
- 데이터 저장: JSON + Markdown 파일
- 게시글 본문: Markdown
- 인증: 배포하지 않으므로 운영 인증은 불필요. 필요하면 로컬 앱 실행 시 간단한 잠금 화면만 검토

### Repository Shape Draft

```text
skk_Portfolio/
├─ apps/
│  ├─ portfolio/     # Next.js 공개 포트폴리오, Netlify 배포 대상
│  └─ admin/         # 로컬 전용 관리자 페이지, 배포 제외
├─ content/
│  ├─ profile.json
│  ├─ education.json
│  ├─ skills.json
│  ├─ certifications.json
│  ├─ links.json
│  ├─ projects/
│  │  └─ example-project.md
│  └─ awards/
│     └─ example-award.md
├─ packages/
│  └─ content-schema/ # 공개 사이트와 관리자 앱이 공유하는 타입/검증 로직
└─ docs/
```

## 9. Data Model Draft

개인정보, 학력, 수상 내역, 자격증, 링크는 추후 쉽게 수정할 수 있도록 `content/` 아래에서 한곳에 관리한다. 공개 사이트는 빌드 시 `content/` 파일을 읽어 정적 페이지를 생성하고, 로컬 관리자 앱은 같은 파일을 수정한다.

저장 방식:

- 구조화 데이터: JSON
- 프로젝트 상세 본문: Markdown with frontmatter
- 수상 상세 본문: Markdown with frontmatter
- 데이터 검증: Zod 등 schema 기반 검증을 구현 단계에서 검토

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

### Local-Only Policy

- 관리자 페이지는 Netlify에 배포하지 않는다.
- 관리자 앱은 로컬 개발 서버에서만 실행한다.
- 공개 사이트 빌드 결과물에는 관리자 라우트와 관리자 코드를 포함하지 않는다.
- 운영 인증 시스템은 만들지 않는다.
- 로컬 PC 공유 상황이 있다면 관리자 앱에 간단한 로컬 잠금 화면을 추가할 수 있다.

### Content Editing

- 프로필, 학력, 스킬, 자격증, 링크는 폼 기반으로 수정한다.
- 프로젝트와 수상 내역은 목록 화면, 생성 화면, 수정 화면을 제공한다.
- 프로젝트와 수상 내역은 긴 본문을 작성할 수 있어야 한다.
- 본문 입력 방식은 Markdown 에디터로 한다.
- 각 콘텐츠는 공개 여부와 정렬 순서를 설정할 수 있어야 한다.
- 저장 시 JSON/Markdown 파일을 갱신한다.
- 수정 후 Git diff로 변경 내용을 확인하고 커밋한다.

### Security Notes

- 공개 사이트에는 관리자 화면을 배포하지 않는다.
- 비공개 정보는 공개 빌드에 포함하지 않는다.
- 공개 페이지는 `isPublic` 기준으로만 데이터를 조회한다.
- 공개 저장소에 올릴 수 없는 개인정보는 `content/`에 넣지 않는다.
- 업로드 기능을 만들 경우 이미지 파일 크기, 확장자, 저장 위치를 별도 정책으로 정한다.

## 11. Planning Questions

다음 정보가 확정되면 구현 정확도가 높아진다.

- 포트폴리오의 주 대상은 취업, 프리랜스, 연구/학업, 개인 브랜딩 중 무엇인가?
- 표시할 이름은 송경근으로 확정해도 되는가?
- 한 줄 소개는 무엇인가?
- 주요 기술 스택은 무엇인가?
- 대표 프로젝트 3개는 무엇인가?
- 외부 공개 가능한 GitHub, 블로그, 이메일 링크가 있는가?
- 원하는 톤은 미니멀, 터미널 스타일, 앱 대시보드 스타일, 인터랙티브 스타일 중 어디에 가까운가?
- 공개 사이트는 Netlify 배포로 확정.
- 공개 사이트는 Next.js로 확정.
- 상세 게시글 본문은 Markdown으로 확정.
- 로컬 관리자 앱에도 잠금 화면이 필요한가?

## 12. Milestones

1. 기획 문서 작성
2. 콘텐츠 수집
3. 기술 스택 확정
4. 로컬 관리자 앱과 공개 사이트 구조 확정
5. 콘텐츠 파일 구조와 데이터 모델 확정
6. 와이어프레임 작성
7. 기본 앱 구현
8. 로컬 관리자 CRUD 구현
9. 반응형 UI polish
10. 콘텐츠 입력
11. Netlify 배포 준비
