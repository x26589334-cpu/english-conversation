// Google Analytics 4 (GA4) — 전 페이지 공용. 측정 ID 를 바꿀 땐 이 파일만 고친다.
// ⚠ 아직 GA4 속성이 없다. 사장님 GA 계정(H정보통신)에서 "나도 잉글리쉬" 속성을 만들고 G-XXXX 를 아래에 넣을 것.
(function () {
  var GA_ID = '';
  if (!GA_ID) return;
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID);
})();
