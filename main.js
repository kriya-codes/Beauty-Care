const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navCenter = document.getElementById('navCenter');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  backToTop.classList.toggle('show', window.scrollY > 400);
});

hamburger.addEventListener('click', () => {
  navCenter.classList.toggle('open');
});

document.querySelectorAll('.nav-center a').forEach(link => {
  link.addEventListener('click', () => {
    navCenter.classList.remove('open');
  });
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  observer.observe(el);
});

/* FEATURE 1 — CUSTOM GLOWING CURSOR */
const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');
if (dot && outline) {
  document.addEventListener('mousemove', e => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    outline.style.left = e.clientX + 'px';
    outline.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });
}

/* FEATURE 2 — TYPING HERO HEADLINE */
const words = ["Becomes a Vision", "Becomes Your Dream", "Becomes Unforgettable"];
let wi = 0, ci = 0, deleting = false;
function type() {
  const word = words[wi];
  const el = document.getElementById('typed-text');
  if (!el) return;
  if (!deleting) {
    el.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    el.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
  }
  setTimeout(type, deleting ? 60 : 100);
}
window.addEventListener('load', () => setTimeout(type, 800));

/* FEATURE 3 — BEFORE & AFTER SLIDER */
const baCont = document.querySelector('.ba-container');
const baBefore = document.querySelector('.ba-before');
const baHandle = document.querySelector('.ba-handle');
if (baCont) {
  let dragging = false;
  function moveSlider(x) {
    const rect = baCont.getBoundingClientRect();
    let pct = Math.min(Math.max((x - rect.left) / rect.width * 100, 0), 100);
    baBefore.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    baHandle.style.left = pct + '%';
  }
  baCont.addEventListener('mousedown', e => { dragging = true; moveSlider(e.clientX); });
  document.addEventListener('mousemove', e => { if (dragging) moveSlider(e.clientX); });
  document.addEventListener('mouseup', () => dragging = false);
  baCont.addEventListener('touchmove', e => moveSlider(e.touches[0].clientX));
}

/* FEATURE 4 — SERVICE FILTER TABS */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.service-card').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* FEATURE 6 — WHATSAPP IDLE POPUP */
let popupShown = false;
setTimeout(() => {
  if (!popupShown) {
    const popup = document.getElementById('wa-popup');
    if (popup) { popup.classList.add('show'); popupShown = true; }
  }
}, 10000);

const waClose = document.getElementById('wa-close');
if (waClose) {
  waClose.addEventListener('click', () => {
    document.getElementById('wa-popup').classList.remove('show');
  });
}

/* FEATURE 7 — SCROLL PROGRESS BAR */
window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  const bar = document.getElementById('scroll-bar');
  if (bar) bar.style.width = scrolled + '%';
});
