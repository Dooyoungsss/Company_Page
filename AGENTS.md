# AGENTS.md

이 저장소는 **회사 홈페이지** 프로젝트입니다. 아래 규칙은 이 저장소에서 작업하는 모든 AI 에이전트 및 개발자에게 적용됩니다.

---

## 1. 프로젝트 개요

- 목적: 회사 소개 및 서비스 홍보를 위한 정적 홈페이지
- 결과물: 실제 서비스로 운영되는 프로덕션 사이트
- 언어: 한국어를 기본으로 하며, 필요 시 영어를 병기합니다.

## 2. 기술 스택

- **기본: 순수 HTML5**
  - 모든 페이지는 `.html` 파일로 작성합니다.
  - 시맨틱 태그(`header`, `nav`, `main`, `section`, `article`, `footer`)를 사용합니다.
- **스타일: CSS3 (외부 `.css` 파일)**
  - 인라인 스타일 및 `<style>` 태그 남용을 금지합니다.
  - `assets/css/` 아래에 파일을 분리하고, 공통 스타일은 `base.css`에 둡니다.
  - 반응형 디자인(모바일 우선)을 기본으로 합니다.
  - CSS 프레임워크(예: Tailwind, Bootstrap)는 도입 전 사용자와 상의합니다.
- **동작: Vanilla JavaScript (ES6+)**
  - 프레임워크/번들러 없이 동작하는 것을 원칙으로 합니다.
  - 스크립트는 `assets/js/` 아래에 두고, 페이지별로 필요한 것만 로드합니다.
  - 외부 CDN 라이브러리는 꼭 필요할 때만 사용하며, 이유를 커밋 메시지나 주석에 남깁니다.
- **이미지/폰트**
  - 이미지는 `assets/images/`에 두고, 가능한 한 WebP/AVIF 등 경량 포맷을 사용합니다.
  - 모든 `<img>`에는 `alt` 속성을 필수로 작성합니다.
  - 폰트는 시스템 폰트 또는 로컬 폰트 우선, 웹폰트 사용 시 `font-display: swap`을 적용합니다.

## 3. 파일 및 폴더 구조

아래 구조를 기본으로 유지합니다. 구조 변경이 필요하면 먼저 사용자와 상의합니다.

```
/
├─ AGENTS.md
├─ index.html            # 메인(랜딩) 페이지
├─ about.html            # 회사 소개
├─ services.html         # 서비스/제품 소개
├─ contact.html          # 문의
├─ netlify.toml          # Netlify 배포 설정
├─ robots.txt
├─ sitemap.xml
└─ assets/
   ├─ css/
   │  ├─ base.css
   │  └─ layout.css
   ├─ js/
   │  └─ main.js
   └─ images/
```

- 새 페이지를 추가하면 `nav` 링크와 `sitemap.xml`을 함께 갱신합니다.
- 파일명은 소문자 + 하이픈(`kebab-case`)을 사용합니다.

## 4. HTML/CSS/JS 작성 규칙

- HTML은 들여쓰기 2칸, 속성값은 큰따옴표(`"`)를 사용합니다.
- 모든 페이지에 아래 기본 구조를 포함합니다.
  - `<!DOCTYPE html>`, `<html lang="ko">`, `<meta charset="UTF-8">`
  - 반응형 `<meta name="viewport" content="width=device-width, initial-scale=1">`
  - 고유한 `<title>` 및 `<meta name="description">`
  - Open Graph(`og:title`, `og:description`, `og:image`) 태그
- 접근성(a11y)을 준수합니다.
  - 이미지 `alt`, 폼 `label`, 키보드 포커스 스타일, 충분한 색 대비를 보장합니다.
- CSS 클래스는 `kebab-case`, 가능한 한 의미 있는 이름을 사용합니다.
- JavaScript는 `const`/`let`만 사용하고, 전역 변수 오염을 피합니다(`IIFE` 또는 모듈 패턴).
- 콘솔에 불필요한 `console.log`를 남기지 않습니다.

## 5. 성능 및 SEO

- 프로덕션 페이지는 Lighthouse 기준 **Performance / Accessibility / Best Practices / SEO 각 90점 이상**을 목표로 합니다.
- 이미지에 `width`/`height`를 명시하고, 필요 시 `loading="lazy"`를 사용합니다.
- CSS/JS는 최소화하고, 렌더링을 막는 리소스를 줄입니다.
- 모든 페이지에 고유한 제목/설명을 작성하고, 구조화 데이터(JSON-LD)는 필요 시 추가합니다.

## 6. 배포 (Netlify)

- 배포 대상: **Netlify** (실제 서비스 운영)
- 배포 방식: Git 저장소 연동을 통한 자동 배포를 기본으로 합니다.
  - `main` 브랜치 push → 프로덕션 자동 배포
  - 그 외 브랜치/PR → Deploy Preview 사용
- 정적 사이트이므로 빌드 명령이 필요 없습니다. `publish` 디렉터리는 저장소 루트(`.`)입니다.
- `netlify.toml`에 아래 항목을 명시합니다.
  - `publish = "."`
  - 보안 헤더(`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` 등)
  - 캐시 정책(`assets/*`는 장기 캐시, HTML은 `no-cache`)
  - 404 페이지 및 리다이렉트 규칙
- 환경 변수나 시크릿(API 키, 토큰)은 절대 저장소에 커밋하지 않습니다. Netlify UI 또는 환경 변수로 관리합니다.
- 커스텀 도메인 및 HTTPS는 Netlify 설정에서 관리합니다.

`netlify.toml` 기본 예시:

```toml
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

## 7. Git 및 변경 관리

- 커밋 메시지는 Conventional Commits 형식을 따릅니다. (예: `feat: add contact form`, `fix: correct nav link`)
- 하나의 커밋에는 하나의 논리적 변경만 담습니다.
- 기존 사용자 작업물을 임의로 삭제하거나 덮어쓰지 않습니다. 변경 전 내용을 확인합니다.
- 대규모 구조 변경, 새 라이브러리 도입, 디자인 전면 개편은 **먼저 사용자와 상의**합니다.

## 8. 품질 체크리스트 (배포 전)

- [ ] 모든 링크와 내비게이션이 정상 동작하는가
- [ ] 모바일/태블릿/데스크톱에서 레이아웃이 깨지지 않는가
- [ ] 이미지 `alt`, 폼 `label`, 키보드 접근이 보장되는가
- [ ] 콘솔 에러 및 404 리소스가 없는가
- [ ] `<title>`, `meta description`, OG 태그가 페이지별로 올바른가
- [ ] 시크릿/민감 정보가 커밋되지 않았는가
- [ ] Netlify Deploy Preview에서 최종 확인했는가

## 9. 커뮤니케이션

- 응답과 문서는 한국어로 작성합니다.
- 모호한 요구사항은 추측하지 말고 질문합니다.
- 작업 완료 시 변경 파일, 배포 영향, 확인 방법을 간단히 요약합니다.
