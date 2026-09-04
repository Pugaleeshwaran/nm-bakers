/* ==========================================================================
   NM BAKERS — theme.js
   Floating colour-theme switcher.

   This is a DECIDING TOOL, not a customer feature. Use it to try the four
   palettes on the real site, then pick one.

   WHEN YOU HAVE DECIDED:
     1. Note which theme you chose.
     2. If it is not Chocolate & Gold, copy that theme's values into the main
        :root block at the top of base.css (or just leave this running).
     3. Delete the <script src="assets/js/theme.js"></script> line from the
        four HTML files. The switcher disappears; nothing else changes.

   Everything below is self-contained — markup, styles and behaviour — so
   removing that one script tag removes all of it.
   ========================================================================== */

(function () {
  'use strict';

  var STORE_KEY = 'nm-theme';

  var THEMES = [
    { id: '', name: 'Chocolate & Gold (dark)', dot: 'linear-gradient(135deg,#2B1710 0 50%,#C9A227 50% 100%)' },
    { id: 'blush', name: 'Blush & Gold (light)', dot: 'linear-gradient(135deg,#F8E9EC 0 50%,#C9A227 50% 100%)' }
  ];

  /* ---- apply as early as possible so there is no colour flash ---------- */
  function apply(id) {
    if (id) document.documentElement.setAttribute('data-theme', id);
    else document.documentElement.removeAttribute('data-theme');
  }

  var saved = '';
  try { saved = localStorage.getItem(STORE_KEY) || ''; } catch (e) { /* private mode */ }
  apply(saved);

  /* ---- styles ---------------------------------------------------------- */
  function injectStyles() {
    var css =
      '.nm-theme-switch{position:fixed;left:clamp(1rem,3vw,2rem);bottom:clamp(1rem,3vw,2rem);' +
      'z-index:130;display:flex;align-items:center;gap:.5rem;padding:.55rem .7rem;border-radius:999px;' +
      'background:rgba(var(--espresso-rgb),.9);backdrop-filter:blur(10px);' +
      '-webkit-backdrop-filter:blur(10px);border:1px solid rgba(var(--gold-rgb),.4);' +
      'box-shadow:0 16px 38px -18px rgba(0,0,0,.8);font-family:var(--font-body)}' +
      '.nm-theme-switch__label{font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;' +
      'color:rgba(var(--cream-rgb),.6);padding-right:.2rem}' +
      '.nm-theme-switch button{width:26px;height:26px;border-radius:50%;cursor:pointer;padding:0;' +
      'border:2px solid transparent;transition:transform .3s,border-color .3s;position:relative}' +
      '.nm-theme-switch button:hover{transform:scale(1.15)}' +
      '.nm-theme-switch button[aria-pressed="true"]{border-color:var(--gold-soft);transform:scale(1.12)}' +
      '@media (max-width:520px){.nm-theme-switch__label{display:none}' +
      '.nm-theme-switch{left:.75rem;bottom:.75rem;padding:.45rem}}';
    var tag = document.createElement('style');
    tag.textContent = css;
    document.head.appendChild(tag);
  }

  /* ---- the control ----------------------------------------------------- */
  function build() {
    injectStyles();

    var box = document.createElement('div');
    box.className = 'nm-theme-switch';
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', 'Preview a colour theme');

    var label = document.createElement('span');
    label.className = 'nm-theme-switch__label';
    label.textContent = 'Theme';
    box.appendChild(label);

    THEMES.forEach(function (t) {
      var b = document.createElement('button');
      b.type = 'button';
      b.title = t.name;
      b.setAttribute('aria-label', t.name);
      b.setAttribute('aria-pressed', String((saved || '') === t.id));
      b.style.background = t.dot;

      b.addEventListener('click', function () {
        apply(t.id);
        try { localStorage.setItem(STORE_KEY, t.id); } catch (e) { /* ignore */ }
        box.querySelectorAll('button').forEach(function (other) {
          other.setAttribute('aria-pressed', String(other === b));
        });
      });

      box.appendChild(b);
    });

    document.body.appendChild(box);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
