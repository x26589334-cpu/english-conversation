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

// ── 공통: 페이지 넘김(슬라이드) ────────────
function makeSlider(items, dotsBox, { auto = 0, prev, next, pause } = {}) {
  let cur = 0, timer;
  const dots = items.map((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', (i + 1) + '번');
    b.addEventListener('click', () => { go(i); restart(); });
    dotsBox.appendChild(b);
    return b;
  });
  function go(i) {
    cur = (i + items.length) % items.length;
    items.forEach((s, k) => s.classList.toggle('is-active', k === cur));
    dots.forEach((d, k) => d.classList.toggle('is-active', k === cur));
  }
  function restart() { clearInterval(timer); if (auto) timer = setInterval(() => go(cur + 1), auto); }
  if (prev) prev.addEventListener('click', () => { go(cur - 1); restart(); });
  if (next) next.addEventListener('click', () => { go(cur + 1); restart(); });
  if (pause) { pause.addEventListener('mouseenter', () => clearInterval(timer)); pause.addEventListener('mouseleave', restart); }
  go(0); restart();
}

// 메인 배너 (5초 자동)
makeSlider(
  Array.from(document.querySelectorAll('#heroTrack .hero__slide')),
  document.getElementById('heroDots'),
  { auto: 5000, prev: document.getElementById('heroPrev'), next: document.getElementById('heroNext'), pause: document.getElementById('hero') }
);
// 후기 (7초 자동)
makeSlider(
  Array.from(document.querySelectorAll('#tcar .tcar__page')),
  document.getElementById('tcarDots'),
  { auto: 7000, pause: document.getElementById('tcar') }
);

// ── 탭 공통 (About 탭 · 서비스 탭) ─────────
function wireTabs(rootId, tabSel, panelSel) {
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
const revealTargets = document.querySelectorAll('.pcard, .fbox, .course, .tItem, .fact, .faq__item, .head, .svc, .box, .img-rounded, .contact__item');
revealTargets.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-in');
    obs.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealTargets.forEach(el => io.observe(el));

// ── 맨 위로 버튼 ──
const totop = document.getElementById('totop');
const onScroll = () => totop.classList.toggle('is-show', window.scrollY > 300);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ── 연도 ──
document.getElementById('year').textContent = new Date().getFullYear();
