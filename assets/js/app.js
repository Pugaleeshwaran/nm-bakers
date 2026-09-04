/* ==========================================================================
   NM BAKERS — app.js
   UI behaviour and content rendering shared across all four pages.
     · business details injected from NM_CONFIG
     · mobile navigation drawer
     · accordion
     · home page sections (categories, signatures, values, story, reviews)
     · products page (render, filter, search)
     · contact page (hours, form validation, WhatsApp compose)
   ========================================================================== */

(function () {
  'use strict';

  var CFG = window.NM_CONFIG || {};
  var PRODUCTS = window.NM_PRODUCTS || [];
  var CATEGORIES = window.NM_CATEGORIES || [];
  var ART = window.NM_ART;

  /* ------------------------------------------------------------------------
     Small helpers
     ------------------------------------------------------------------------ */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function rupees(n) { return '₹' + Number(n).toLocaleString('en-IN'); }

  /** Build a WhatsApp deep link with a pre-filled message. */
  function waLink(message) {
    return 'https://wa.me/' + (CFG.phoneRaw || '') + '?text=' + encodeURIComponent(message);
  }

  function categoryById(id) {
    for (var i = 0; i < CATEGORIES.length; i++) if (CATEGORIES[i].id === id) return CATEGORIES[i];
    return null;
  }

  function countIn(catId) {
    return PRODUCTS.filter(function (p) { return p.category === catId; }).length;
  }

  /* ------------------------------------------------------------------------
     1. Inject business details + icons
     ------------------------------------------------------------------------ */
  function hydrateConfig() {
    $$('[data-config]').forEach(function (el) {
      var key = el.getAttribute('data-config');
      if (CFG[key] !== undefined && CFG[key] !== null) el.textContent = CFG[key];
    });

    $$('[data-link]').forEach(function (el) {
      var kind = el.getAttribute('data-link');
      if (kind === 'tel')       el.href = 'tel:+' + CFG.phoneRaw;
      else if (kind === 'mail') el.href = 'mailto:' + CFG.email;
      else if (kind === 'whatsapp') {
        var msg = el.getAttribute('data-message') ||
          'Hello ' + CFG.name + '! I would like to place an order.';
        el.href = waLink(msg);
      }
      else if (kind === 'instagram') el.href = CFG.instagram;
      else if (kind === 'facebook')  el.href = CFG.facebook;
    });

    $$('[data-icon]').forEach(function (el) {
      el.innerHTML = ART.icon(el.getAttribute('data-icon'));
    });

    var yearEl = $('[data-year]');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------------
     2. Mobile navigation
     ------------------------------------------------------------------------ */
  function initNav() {
    var toggle = $('.nav-toggle');
    var drawer = $('.nav-drawer');
    if (!toggle || !drawer) return;

    function setOpen(open) {
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      drawer.setAttribute('aria-hidden', String(!open));
    }

    toggle.addEventListener('click', function () {
      setOpen(!document.body.classList.contains('nav-open'));
    });

    $$('a', drawer).forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) setOpen(false);
    });
  }

  /* ------------------------------------------------------------------------
     3. Accordion
     ------------------------------------------------------------------------ */
  /** Animate one panel open or shut by explicit pixel height. */
  function setPanel(item, open) {
    var panel = $('.accordion__panel', item);
    if (!panel) return;
    var inner = panel.firstElementChild;

    if (open) {
      panel.style.height = (inner ? inner.offsetHeight : panel.scrollHeight) + 'px';
    } else {
      // going from `auto` needs a concrete start value before it can animate
      panel.style.height = panel.scrollHeight + 'px';
      void panel.offsetHeight;                    // force reflow
      panel.style.height = '0px';
    }
  }

  function initAccordion(root) {
    var scope = root || document;

    // panels that render already open should size themselves to their content
    $$('.accordion__item.is-open', scope).forEach(function (item) {
      var panel = $('.accordion__panel', item);
      if (panel && !panel.style.height) panel.style.height = 'auto';
    });

    // once an opening transition finishes, release the height so the panel
    // reflows correctly on resize or font load
    $$('.accordion__panel', scope).forEach(function (panel) {
      if (panel.getAttribute('data-panel-bound')) return;
      panel.setAttribute('data-panel-bound', '1');
      panel.addEventListener('transitionend', function (e) {
        if (e.propertyName !== 'height') return;
        var item = panel.parentElement;
        if (item && item.classList.contains('is-open')) panel.style.height = 'auto';
      });
    });

    $$('.accordion__trigger', scope).forEach(function (trigger) {
      // renderFaq() initialises its own accordion, and boot() then runs a
      // document-wide pass — without this guard each trigger gets two
      // listeners and the second one closes what the first just opened.
      if (trigger.getAttribute('data-accordion-bound')) return;
      trigger.setAttribute('data-accordion-bound', '1');

      trigger.addEventListener('click', function () {
        var item = trigger.closest('.accordion__item');
        var isOpen = item.classList.contains('is-open');

        // single-open behaviour within the same accordion
        var group = item.parentElement;
        $$('.accordion__item.is-open', group).forEach(function (open) {
          open.classList.remove('is-open');
          $('.accordion__trigger', open).setAttribute('aria-expanded', 'false');
          setPanel(open, false);
        });

        if (!isOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          setPanel(item, true);
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     4. Card templates
     ------------------------------------------------------------------------ */
  function productCard(product) {
    var cat = categoryById(product.category);
    var badge = product.badge
      ? '<span class="product-card__badge' + (product.custom ? ' product-card__badge--rose' : '') + '">' +
          esc(product.badge) + '</span>'
      : '';

    var message = 'Hello ' + CFG.name + '! I would like to order the ' + product.name +
      ' (' + rupees(product.price) + ' / ' + product.unit + ').';

    return '' +
      '<article class="product-card" data-reveal="rise">' +
        '<div class="product-card__art" style="background:' + ART.toneBackground(product.tone) + '">' +
          badge +
          // each product resolves its OWN picture from its id — see the
          // PICTURES block at the top of data.js
          ART.photo(product.id, product.name, product.category) +
        '</div>' +
        '<div class="product-card__body">' +
          '<p class="product-card__cat">' + esc(cat ? cat.name : '') + '</p>' +
          '<h3>' + esc(product.name) + '</h3>' +
          '<p class="product-card__desc">' + esc(product.desc) + '</p>' +
          '<div class="product-card__foot">' +
            '<span class="product-card__price">' +
              '<b>' + rupees(product.price) + '</b>' +
              '<span class="product-card__unit">' + esc(product.unit) + '</span>' +
            '</span>' +
            '<a class="product-card__order" href="' + waLink(message) + '" target="_blank" rel="noopener"' +
              ' aria-label="Order ' + esc(product.name) + ' on WhatsApp">' + ART.icon('bag') + '</a>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  function categoryCard(cat) {
    return '' +
      '<a class="category-card" href="products.html#' + cat.id + '" data-reveal="rise">' +
        '<div class="category-card__art" style="background:' + ART.toneBackground(cat.tone) + '">' +
          '<span class="category-card__count">' + countIn(cat.id) + ' items</span>' +
          ART.photo(cat.id, cat.name) +
        '</div>' +
        '<h3>' + esc(cat.name) + '</h3>' +
        '<p>' + esc(cat.blurb) + '</p>' +
        '<div class="category-card__foot">' +
          '<span class="category-card__price">from <b>' + rupees(cat.from) + '</b></span>' +
          '<span class="link-arrow">View' + ART.icon('arrow') + '</span>' +
        '</div>' +
      '</a>';
  }

  /* ------------------------------------------------------------------------
     5. Home page
     ------------------------------------------------------------------------ */
  function renderHome() {
    // Big home-page artwork: a photo if one is named in NM_IMAGES,
    // otherwise the hand-drawn illustration.
    var IMG = window.NM_IMAGES || {};

    var heroCake = $('#heroCake');
    if (heroCake) {
      heroCake.innerHTML = IMG['hero-cake']
        ? ART.photo('hero-cake', CFG.name + ' signature cake')
        : ART.get('hero');
    }

    var catGrid = $('#categoryGrid');
    if (catGrid) {
      catGrid.innerHTML = CATEGORIES.map(categoryCard).join('');
    }

    var featured = $('#featuredGrid');
    if (featured) {
      featured.innerHTML = PRODUCTS
        .filter(function (p) { return p.featured; })
        .slice(0, 8)
        .map(productCard).join('');
    }

    var values = $('#valuesGrid');
    if (values && window.NM_VALUES) {
      values.innerHTML = window.NM_VALUES.map(function (v) {
        return '' +
          '<article class="feature" data-reveal="rise">' +
            '<span class="feature__icon">' + ART.icon(v.icon) + '</span>' +
            '<h3>' + esc(v.title) + '</h3>' +
            '<p>' + esc(v.text) + '</p>' +
          '</article>';
      }).join('');
    }

    var story = $('#storySteps');
    if (story && window.NM_PROCESS) {
      story.innerHTML = window.NM_PROCESS.map(function (step, i) {
        return '' +
          '<div class="story-step">' +
            '<div class="story-step__body">' +
              '<h3>' + esc(step.title) + '</h3>' +
              '<p>' + esc(step.text) + '</p>' +
            '</div>' +
            '<div class="story-step__num">' + ('0' + (i + 1)) + '</div>' +
            '<div class="story-step__art">' +
              // a photo if one is named in NM_IMAGES, otherwise the line drawing
              (IMG['step-' + (i + 1)]
                ? ART.photo('step-' + (i + 1), step.title)
                : ART.get(step.art)) +
            '</div>' +
          '</div>';
      }).join('');
    }

    var reviews = $('#reviewGrid');
    if (reviews && window.NM_TESTIMONIALS) {
      reviews.innerHTML = window.NM_TESTIMONIALS.map(function (t) {
        var stars = '';
        for (var i = 0; i < 5; i++) stars += ART.icon('star');
        return '' +
          '<article class="testimonial" data-reveal="rise">' +
            '<span class="testimonial__quote" aria-hidden="true">&rdquo;</span>' +
            '<div class="testimonial__stars" aria-label="5 out of 5">' + stars + '</div>' +
            '<p>' + esc(t.quote) + '</p>' +
            '<div class="testimonial__author">' +
              '<span class="testimonial__avatar">' + esc(t.name.charAt(0)) + '</span>' +
              '<span>' +
                '<span class="testimonial__name">' + esc(t.name) + '</span><br>' +
                '<span class="testimonial__meta">' + esc(t.meta) + '</span>' +
              '</span>' +
            '</div>' +
          '</article>';
      }).join('');
    }

    var customArt = $('#customArt');
    if (customArt) {
      customArt.innerHTML = IMG['custom-cake']
        ? ART.photo('custom-cake', 'Customised cake')
        : ART.get('custom');
    }
  }

  /* ------------------------------------------------------------------------
     6. Products page
     ------------------------------------------------------------------------ */
  function renderProducts() {
    var grid = $('#productGrid');
    if (!grid) return;

    var tabsWrap = $('#filterTabs');
    var searchInput = $('#productSearch');
    var note = $('#resultsNote');

    var state = { category: 'all', query: '' };

    /* --- filter tabs --- */
    if (tabsWrap) {
      var tabs = [{ id: 'all', name: 'Everything', count: PRODUCTS.length }].concat(
        CATEGORIES.map(function (c) {
          return { id: c.id, name: c.shortName || c.name, count: countIn(c.id) };
        })
      );
      tabsWrap.innerHTML = tabs.map(function (t, i) {
        return '<button class="filter-tab' + (i === 0 ? ' is-active' : '') + '" type="button"' +
          ' data-filter="' + t.id + '">' + esc(t.name) + '<span>' + t.count + '</span></button>';
      }).join('');
    }

    function matches(p) {
      if (state.category !== 'all' && p.category !== state.category) return false;
      if (!state.query) return true;
      var q = state.query.toLowerCase();
      var cat = categoryById(p.category);
      return (p.name + ' ' + p.desc + ' ' + (cat ? cat.name : '')).toLowerCase().indexOf(q) > -1;
    }

    function draw() {
      var list = PRODUCTS.filter(matches);

      if (!list.length) {
        grid.innerHTML = '' +
          '<div class="empty-state">' +
            '<h3>Nothing matches that yet</h3>' +
            '<p>Try another flavour, or tell us what you are looking for &mdash; ' +
              'most things can be baked to order.</p>' +
            '<a class="btn btn--gold" data-link="whatsapp" href="#">Ask on WhatsApp</a>' +
          '</div>';
        hydrateConfig();
      } else {
        grid.innerHTML = list.map(productCard).join('');
      }

      if (note) {
        note.textContent = list.length === PRODUCTS.length
          ? 'Showing all ' + PRODUCTS.length + ' items from the menu.'
          : 'Showing ' + list.length + ' of ' + PRODUCTS.length + ' items.';
      }

      if (window.NM_SCROLL) window.NM_SCROLL.refresh();
    }

    /* --- events --- */
    if (tabsWrap) {
      tabsWrap.addEventListener('click', function (e) {
        var btn = e.target.closest('.filter-tab');
        if (!btn) return;
        state.category = btn.getAttribute('data-filter');
        $$('.filter-tab', tabsWrap).forEach(function (t) {
          t.classList.toggle('is-active', t === btn);
        });
        draw();
      });
    }

    if (searchInput) {
      var timer;
      searchInput.addEventListener('input', function () {
        window.clearTimeout(timer);
        timer = window.setTimeout(function () {
          state.query = searchInput.value.trim();
          draw();
        }, 160);
      });
    }

    /* --- deep link: products.html#brownies --- */
    var hash = window.location.hash.replace('#', '');
    if (hash && categoryById(hash)) {
      state.category = hash;
      var target = tabsWrap && $('[data-filter="' + hash + '"]', tabsWrap);
      if (target) {
        $$('.filter-tab', tabsWrap).forEach(function (t) { t.classList.toggle('is-active', t === target); });
      }
    }

    draw();
  }

  /* ------------------------------------------------------------------------
     7. Contact page
     ------------------------------------------------------------------------ */
  function renderHours() {
    var list = $('#hoursList');
    if (!list || !CFG.hours) return;
    list.innerHTML = CFG.hours.map(function (h) {
      return '<li' + (h.closed ? ' class="is-closed"' : '') + '>' +
        '<span class="hours-list__day">' + esc(h.day) + '</span>' +
        '<span class="hours-list__time">' + esc(h.time) + '</span>' +
      '</li>';
    }).join('');
  }

  function renderFaq() {
    var wrap = $('#faqList');
    if (!wrap || !window.NM_FAQ) return;
    wrap.innerHTML = window.NM_FAQ.map(function (item, i) {
      return '' +
        '<div class="accordion__item' + (i === 0 ? ' is-open' : '') + '">' +
          '<button class="accordion__trigger" type="button" aria-expanded="' + (i === 0) + '"' +
            ' aria-controls="faq-panel-' + i + '">' +
            '<span>' + esc(item.q) + '</span>' +
            '<span class="accordion__icon" aria-hidden="true"></span>' +
          '</button>' +
          '<div class="accordion__panel" id="faq-panel-' + i + '"><div><p>' + esc(item.a) + '</p></div></div>' +
        '</div>';
    }).join('');
    initAccordion(wrap);
  }

  function initOrderForm() {
    var form = $('#orderForm');
    if (!form) return;

    /* populate the item dropdown from the menu */
    var itemSelect = $('#orderItem', form);
    if (itemSelect) {
      var groups = CATEGORIES.map(function (cat) {
        var opts = PRODUCTS.filter(function (p) { return p.category === cat.id; })
          .map(function (p) {
            return '<option value="' + esc(p.name) + '">' + esc(p.name) +
              ' — ' + rupees(p.price) + ' / ' + esc(p.unit) + '</option>';
          }).join('');
        return '<optgroup label="' + esc(cat.name) + '">' + opts + '</optgroup>';
      }).join('');
      itemSelect.innerHTML =
        '<option value="">Select an item…</option>' + groups +
        '<optgroup label="Other"><option value="Custom order">Something custom — I will describe it</option></optgroup>';
    }

    /* minimum date = tomorrow (24h notice) */
    var dateInput = $('#orderDate', form);
    if (dateInput) {
      var min = new Date();
      min.setDate(min.getDate() + 1);
      dateInput.min = min.toISOString().split('T')[0];
    }

    function setError(field, message) {
      var wrap = field.closest('.field');
      var slot = wrap && $('.field__error', wrap);
      if (wrap) wrap.classList.toggle('has-error', Boolean(message));
      if (slot) slot.textContent = message || '';
      return !message;
    }

    function validate() {
      var ok = true;

      var name = $('#orderName', form);
      ok = setError(name, name.value.trim().length < 2 ? 'Please tell us your name.' : '') && ok;

      var phone = $('#orderPhone', form);
      var digits = phone.value.replace(/\D/g, '');
      ok = setError(phone, digits.length < 10 ? 'Enter a valid phone number.' : '') && ok;

      var email = $('#orderEmail', form);
      if (email && email.value.trim()) {
        var valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim());
        ok = setError(email, valid ? '' : 'That email does not look right.') && ok;
      } else if (email) {
        setError(email, '');
      }

      var item = $('#orderItem', form);
      ok = setError(item, item.value ? '' : 'Choose what you would like.') && ok;

      var message = $('#orderMessage', form);
      ok = setError(message, message.value.trim().length < 5 ? 'A line or two about your order, please.' : '') && ok;

      return ok;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) {
        var firstError = $('.field.has-error input, .field.has-error select, .field.has-error textarea', form);
        if (firstError) firstError.focus();
        return;
      }

      var lines = [
        'Hello ' + CFG.name + '!',
        '',
        'Name: ' + $('#orderName', form).value.trim(),
        'Phone: ' + $('#orderPhone', form).value.trim()
      ];

      var email = $('#orderEmail', form).value.trim();
      if (email) lines.push('Email: ' + email);

      lines.push('Item: ' + $('#orderItem', form).value);

      var qty = $('#orderQty', form);
      if (qty && qty.value.trim()) lines.push('Quantity: ' + qty.value.trim());

      var date = $('#orderDate', form);
      if (date && date.value) lines.push('Needed on: ' + date.value);

      lines.push('', 'Details: ' + $('#orderMessage', form).value.trim());

      var success = $('#formSuccess');
      if (success) {
        success.classList.add('is-visible');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      window.open(waLink(lines.join('\n')), '_blank', 'noopener');
      form.reset();
    });

    /* clear an error as soon as the field is corrected */
    $$('input, select, textarea', form).forEach(function (field) {
      field.addEventListener('input', function () {
        var wrap = field.closest('.field');
        if (wrap && wrap.classList.contains('has-error')) {
          wrap.classList.remove('has-error');
          var slot = $('.field__error', wrap);
          if (slot) slot.textContent = '';
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     8. Marquee — duplicate the track so the loop is seamless
     ------------------------------------------------------------------------ */
  function initMarquee() {
    $$('.marquee__track').forEach(function (track) {
      track.innerHTML = track.innerHTML + track.innerHTML;
    });
  }

  /* ------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */
  function boot() {
    renderHome();
    renderProducts();
    renderHours();
    renderFaq();
    initOrderForm();
    initMarquee();
    initNav();
    initAccordion();
    hydrateConfig();          // runs last so injected markup is hydrated too

    if (window.NM_SCROLL) window.NM_SCROLL.refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
