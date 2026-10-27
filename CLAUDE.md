# english-conversation — 나도 잉글리쉬 (1:1 전화영어·화상영어)

- 저장소: `x26589334-cpu/english-conversation` (main) · GitHub Pages · **호스팅 Cloudflare Pages**(2026-10-12 사용자 결정, 지역 과외 18곳과 같은 방식) · 도메인 **nadoglobal.co.kr** · pages.dev 주소 english-conversation-6l2.pages.dev · GitHub Pages 는 끔
- 만든 날: 2026-10-10. 참고한 사이트: plcenter.co.kr(파워잉글리시) — 구조(배너 슬라이드 → About+숫자 → 진행 과정 → Why 3칸 → 서비스 탭 → 추천 과정 4칸 → 후기 → FAQ → 상담 → 푸터)와 색(하늘 `#00baff` + 주황 `#ffa01e`)만 참고. 문구·코드는 새로 썼다.
- 한 페이지 사이트. 파일: `index.html` · `style.css` · `script.js`(배너·후기 슬라이드, 탭, FAQ, 등장효과) · `form.js`(상담폼) · `analytics.js`(GA4, 아직 ID 없음) · `img/`(사진 12장).
- **사진은 전부 Unsplash 무료 사진**(Unsplash License: 상업 사용·출처 표기 불필요). 2026-10-10 디자인 2차 — 참고 사이트처럼 사진 배너·하늘색 숫자 띠·테두리 상자·말풍선 후기·남색 푸터·하단 고정 배너로 재구성. 글꼴: 제목 Pretendard, 본문 나눔고딕(Google Fonts), 아이콘 Font Awesome 6(cdnjs).

## 공통 규칙 (홈 `~/CLAUDE.md` 와 같음)
- 전화번호는 **010-6832-1994** 하나(다른 사이트와 공통). 사업자 정보(상호·대표·사업자번호·주소)는 **넣지 않는다**(사업자 없음, 사용자 방침).
- CSS/JS 고치면 `index.html` 의 `?v=` 를 올린다.
- 상담폼: 허브 Apps Script(`AKfycbznAb0…`)로 `sheet=기존`·`사이트=영어회화` 전송 → "웹 문의" 시트 **"기존" 탭**(2026-10-27 허브 v5, 탭은 허브 TAB_OF 표가 정함). 탭 이름·배포 URL 바꿀 땐 사용자 확인. 텔레그램 알림은 허브 봇(@wawa_sangdam_bot → 단체방 "상담 알림")으로 간다.
- 후기 6개는 **개설용 예시 문구**다(HTML 주석에 표시). 실제 수강 후기가 생기면 교체한다. 수업료는 적지 않았다(FAQ 에 "상담 때 안내").

## 아직 안 한 것
- GA4 측정 ID (`analytics.js` 의 `GA_ID` 비어 있음 → 지금은 아무것도 안 보냄).
- 배포: main push → `.github/workflows/deploy.yml` 이 GitHub Actions 에서 wrangler 로 Cloudflare Pages(Direct Upload 프로젝트 `english-conversation`)에 올림. Secret `CLOUDFLARE_API_TOKEN`·`CLOUDFLARE_ACCOUNT_ID`. DNS 는 Cloudflare 존(`@`·`www` CNAME → pages.dev, 주황 구름), www→기본 301, 항상 HTTPS. 가비아는 네임서버만 Cloudflare 것으로. 대시보드에서 Connect to Git 으로 다시 만들지 말 것(타입 변경 불가). 상세: 사이트대장 12절.
- 데일리 자동게시 미등록(`사이트관리/데일리/설정.json`). 블로그 폴더도 아직 없음.
