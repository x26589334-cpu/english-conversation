// ── 헤더 스크롤 그림자 ──────────────────────
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ── 모바일 메뉴 ────────────────────────────
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  hamburger.classList.toggle('is-open', open);
  hamburger.setAttribute('aria-expanded', String(open));
});
nav.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// ── 히어로 슬라이드 (5초 자동, 화살표·점) ──
(function heroSlider(){
  const slides = Array.from(document.querySelectorAll('#heroTrack .hero__slide'));
  const dotsBox = document.getElementById('heroDots');
  if (!slides.length) return;
  let cur = 0, timer;
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', (i + 1) + '번 배너');
    b.addEventListener('click', () => { go(i); restart(); });
    dotsBox.appendChild(b);
  });
  const dots = Array.from(dotsBox.children);
  function go(i){
    cur = (i + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('is-active', k === cur));
    dots.forEach((d, k) => d.classList.toggle('is-active', k === cur));
  }
  function restart(){ clearInterval(timer); timer = setInterval(() => go(cur + 1), 5000); }
  document.getElementById('heroPrev').addEventListener('click', () => { go(cur - 1); restart(); });
  document.getElementById('heroNext').addEventListener('click', () => { go(cur + 1); restart(); });
  const hero = document.getElementById('hero');
  hero.addEventListener('mouseenter', () => clearInterval(timer));
  hero.addEventListener('mouseleave', restart);
  go(0); restart();
})();

// ── 탭 공통 (About 탭 · 서비스 탭) ─────────
function wireTabs(rootId, tabSel, panelSel){
  const root = document.getElementById(rootId);
  if (!root) return;
  root.querySelectorAll(tabSel).forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.tab;
      root.querySelectorAll(tabSel).forEach(t => t.classList.toggle('is-active', t === tab));
      root.querySelectorAll(panelSel).forEach(p => p.classList.toggle('is-active', p.dataset.panel === key));
    });
  });
}
wireTabs('aboutTabs', '.tab', '.tabs__panel');
wireTabs('svcTabs', '.svc__tab', '.svc__panel');

// ── FAQ: 하나 열면 나머지 닫기 ──────────────
const faqItems = document.querySelectorAll('#faqList .faq__item');
faqItems.forEach(item => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    faqItems.forEach(other => { if (other !== item) other.open = false; });
  });
});

// ── 스크롤 등장 애니메이션 ──────────────────
const revealTargets = document.querySelectorAll('.card, .course, .review, .flow li, .stat, .faq__item, .head, .svc');
revealTargets.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-in');
    obs.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealTargets.forEach(el => io.observe(el));

// ── 연도 ──
document.getElementById('year').textContent = new Date().getFullYear();
