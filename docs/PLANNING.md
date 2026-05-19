# skk_Portfolio Planning

## 1. Product Goal

개발자로서의 역량, 성장 과정, 프로젝트 경험을 신뢰감 있게 보여주는 개인 포트폴리오 사이트를 만든다. 데스크톱과 모바일에서 모두 읽기 쉬운 반응형 웹/앱으로 구성한다.

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

### Awards

- 수상명
- 주최 기관
- 수상일
- 수상 내용
- 관련 프로젝트 또는 활동

### Certifications

- 자격증명
- 발급 기관
- 취득일
- 만료일이 있으면 만료일
- 공개 가능한 검증 링크가 있으면 링크

## 5. Information Architecture

초기 구조는 단일 페이지 기반을 우선 검토한다.

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

프로젝트 수가 많아지면 다음 구조를 고려한다.

```text
/
/projects
/projects/[slug]
/resume
```

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

### Option A: Astro

- 장점: 빠른 정적 사이트, 콘텐츠 중심 포트폴리오에 적합
- 단점: 복잡한 앱 인터랙션이 많아지면 React/Vue island 설계가 필요

### Option B: Vite + React

- 장점: 빠른 개발, SPA 인터랙션 구현 쉬움
- 단점: SEO와 정적 콘텐츠 최적화는 별도 신경 필요

### Option C: Next.js

- 장점: 라우팅, SEO, 배포 생태계가 좋음
- 단점: 단순 포트폴리오에는 다소 무거울 수 있음

현재 추천 초안: 콘텐츠 중심이면 Astro, 앱 같은 인터랙션을 더 강조하면 Vite + React.

## 9. Data Model Draft

구현 단계에서는 콘텐츠를 코드와 분리하기 위해 `data` 파일 또는 Markdown/MDX를 고려한다.

```ts
type Project = {
  title: string;
  period: string;
  role: string;
  summary: string;
  techStack: string[];
  highlights: string[];
  links: {
    github?: string;
    demo?: string;
    docs?: string;
  };
};
```

## 10. Planning Questions

다음 정보가 확정되면 구현 정확도가 높아진다.

- 포트폴리오의 주 대상은 취업, 프리랜스, 연구/학업, 개인 브랜딩 중 무엇인가?
- 표시할 이름과 한 줄 소개는 무엇인가?
- 주요 기술 스택은 무엇인가?
- 대표 프로젝트 3개는 무엇인가?
- 외부 공개 가능한 GitHub, 블로그, 이메일 링크가 있는가?
- 원하는 톤은 미니멀, 터미널 스타일, 앱 대시보드 스타일, 인터랙티브 스타일 중 어디에 가까운가?

## 11. Milestones

1. 기획 문서 작성
2. 콘텐츠 수집
3. 기술 스택 확정
4. 와이어프레임 작성
5. 기본 앱 구현
6. 반응형 UI polish
7. 콘텐츠 입력
8. 배포 준비
