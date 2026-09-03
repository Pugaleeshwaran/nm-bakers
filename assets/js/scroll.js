/* ==========================================================================
   NM BAKERY — scroll.js
   One rAF-throttled scroll loop driving:
     · the top progress bar
     · the hero's --scroll variable (parallax, fade, rotation)
     · [data-parallax] layer drift
     · sticky / auto-hiding header
     · the process story line fill
     · the floating order button
   Reveal-on-scroll runs separately through IntersectionObserver.
   ========================================================================== */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var clamp = function (v, min, max) { return v < min ? min : v > max ? max : v; };

  /* ------------------------------------------------------------------------
     Elements collected once
     ------------------------------------------------------------------------ */
  var progressBar  = document.querySelector('.scroll-progress');
  var header       = document.querySelector('.site-header');
  var hero         = document.querySelector('.hero');
  var parallaxEls  = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  var storyFill    = document.querySelector('.story-line__fill');
  var storyTrack   = document.querySelector('.story-track');
  var floatOrder   = document.querySelector('.floating-order');

  var lastScroll = 0;
  var ticking = false;

  /* ------------------------------------------------------------------------
     The loop
     ------------------------------------------------------------------------ */
  function update() {
    ticking = false;

    var y = window.pageYOffset || document.documentElement.scrollTop;
    var vh = window.innerHeight;
    var docHeight = document.documentElement.scrollHeight - vh;

    /* --- reading progress --- */
    if (progressBar) {
      var progress = docHeight > 0 ? clamp(y / docHeight, 0, 1) : 0;
      progressBar.style.transform = 'scaleX(' + progress + ')';
    }

    /* --- header state --- */
    if (header) {
      header.classList.toggle('is-stuck', y > 40);
      // hide when scrolling down past the fold, reveal on the way back up
      var goingDown = y > lastScroll;
      var pastFold = y > vh * 0.85;
      header.classList.toggle('is-hidden', goingDown && pastFold && !document.body.classList.contains('nav-open'));
    }

    /* --- hero choreography --- */
    if (hero && !reduceMotion) {
      var heroHeight = hero.offsetHeight || vh;
      hero.style.setProperty('--scroll', clamp(y / heroHeight, 0, 1).toFixed(4));
    }

    /* --- parallax layers --- */
    if (!reduceMotion) {
      for (var i = 0; i < parallaxEls.length; i++) {
        var el = parallaxEls[i];
        var rect = el.getBoundingClientRect();
        // only move what is near the viewport
        if (rect.bottom < -300 || rect.top > vh + 300) continue;
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.15;
        var centerOffset = (rect.top + rect.height / 2) - vh / 2;
        el.style.transform = 'translate3d(0,' + (-centerOffset * speed).toFixed(2) + 'px,0)';
      }
    }

    /* --- process story progress line --- */
    if (storyFill && storyTrack) {
      var tRect = storyTrack.getBoundingClientRect();
      var travelled = clamp((vh * 0.62 - tRect.top) / tRect.height, 0, 1);
      storyFill.style.height = (travelled * 100).toFixed(2) + '%';
    }

    /* --- floating order button --- */
    if (floatOrder) {
      floatOrder.classList.toggle('is-visible', y > vh * 0.6);
    }

    lastScroll = y < 0 ? 0 : y;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  /* ------------------------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------------------------ */
  function initReveals() {
    var targets = document.querySelectorAll('[data-reveal], [data-stagger], .reveal-media, .story-step');
    if (!targets.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      for (var i = 0; i < targets.length; i++) targets[i].classList.add('is-revealed');
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = el.getAttribute('data-delay');
        if (delay) el.style.setProperty('--reveal-delay', delay + 'ms');
        el.classList.add('is-revealed');
        observer.unobserve(el);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

    for (var j = 0; j < targets.length; j++) observer.observe(targets[j]);
  }

  /* ------------------------------------------------------------------------
     Headline line-by-line reveal
     Splits [data-split] text into .line > .line__inner wrappers.
     ------------------------------------------------------------------------ */
  function splitLines(el) {
    var html = el.innerHTML;
    // <br> marks an explicit line in our markup
    var parts = html.split(/<br\s*\/?>/i);
    el.innerHTML = parts.map(function (part, index) {
      return '<span class="line"><span class="line__inner" style="--line-index:' + index + '">' +
        part.trim() + '</span></span>';
    }).join('');

    // The lines start translated out of view and only slide back once an
    // ancestor gains .is-revealed (or, in the hero, .is-ready). Outside the
    // hero nothing would ever add that, leaving the headline invisible — so
    // opt the element into the reveal observer here.
    if (!el.hasAttribute('data-reveal') && !el.closest('.hero')) {
      el.setAttribute('data-reveal', 'fade');
    }
  }

  function initSplitText() {
    var els = document.querySelectorAll('[data-split]');
    for (var i = 0; i < els.length; i++) splitLines(els[i]);
  }

  /* ------------------------------------------------------------------------
     Animated counters
     ------------------------------------------------------------------------ */
  function runCounter(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var duration = parseInt(el.getAttribute('data-count-duration'), 10) || 1600;
    var decimals = (el.getAttribute('data-count') || '').indexOf('.') > -1 ? 1 : 0;

    if (reduceMotion) { el.textContent = target.toFixed(decimals); return; }

    var start = null;
    function step(timestamp) {
      if (start === null) start = timestamp;
      var elapsed = timestamp - start;
      var t = clamp(elapsed / duration, 0, 1);
      var eased = 1 - Math.pow(1 - t, 3);            // easeOutCubic
      el.textContent = (target * eased).toFixed(decimals);
      if (t < 1) window.requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals);
    }
    window.requestAnimationFrame(step);
  }

  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) {
      for (var i = 0; i < counters.length; i++) runCounter(counters[i]);
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    for (var j = 0; j < counters.length; j++) obs.observe(counters[j]);
  }

  /* ------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */
  function boot() {
    initSplitText();
    initReveals();
    initCounters();
    update();

    // let the hero headline animate in on load
    if (hero) {
      window.requestAnimationFrame(function () {
        window.setTimeout(function () { hero.classList.add('is-ready'); }, 90);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  /* Expose for pages that inject content after load (e.g. the product grid) */
  window.NM_SCROLL = { refresh: initReveals, update: update };
})();
