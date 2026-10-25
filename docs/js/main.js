// Late Batch Bakery — shared behaviour: bag, "added to bag" notice, menu, cookie banner, newsletter.
// Everything is simulated in the browser: there is no server and nothing is charged.
(function () {
  'use strict';

  var ROOT = document.body.getAttribute('data-root') || '';
  var BAG_KEY = 'lb-bag';
  var COOKIE_KEY = 'lb-cookie-choice';
  var products = window.LB_PRODUCTS || [];

  // ---------- Storage (wrapped: private mode can make localStorage throw) ----------
  function read(key, fallback) {
    try {
      var v = localStorage.getItem(key);
      return v === null ? fallback : JSON.parse(v);
    } catch (e) {
      return fallback;
    }
  }

  function write(key, value) {
    try {
      if (value === null) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(value));
    } catch (e) { /* storage unavailable: the bag lives only on this page */ }
  }

  // ---------- Helpers ----------
  function fmt(n) {
    return '€' + n.toFixed(2);
  }

  function find(id) {
    for (var i = 0; i < products.length; i++) if (products[i].id === id) return products[i];
    return null;
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // ---------- Bag ----------
  var memoryBag = {};

  function getBag() {
    var raw = read(BAG_KEY, memoryBag) || {};
    var bag = {};
    Object.keys(raw).forEach(function (id) {
      var q = parseInt(raw[id], 10);
      if (find(id) && q > 0) bag[id] = Math.min(q, 99);
    });
    return bag;
  }

  function saveBag(bag) {
    memoryBag = bag;
    write(BAG_KEY, bag);
    renderBag();
  }

  function addToBag(id, qty) {
    var bag = getBag();
    bag[id] = Math.min((bag[id] || 0) + qty, 99);
    saveBag(bag);
  }

  function setQty(id, qty) {
    var bag = getBag();
    if (qty > 0) bag[id] = Math.min(qty, 99);
    else delete bag[id];
    saveBag(bag);
  }

  function bagLines() {
    var bag = getBag();
    return products.filter(function (p) { return bag[p.id]; }).map(function (p) {
      return { product: p, qty: bag[p.id], total: bag[p.id] * p.price };
    });
  }

  function bagCount() {
    return bagLines().reduce(function (n, l) { return n + l.qty; }, 0);
  }

  function bagTotal() {
    return bagLines().reduce(function (n, l) { return n + l.total; }, 0);
  }

  function clearBag() {
    saveBag({});
  }

  // ---------- Drawer ----------
  var ICON_CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>';

  var drawer = document.createElement('div');
  drawer.className = 'drawer';
  drawer.hidden = true;
  drawer.innerHTML =
    '<div class="drawer__overlay" data-bag-close></div>' +
    '<aside class="drawer__panel" role="dialog" aria-modal="true" aria-labelledby="bag-title">' +
      '<div class="drawer__head">' +
        '<h2 class="display-md" id="bag-title">Your bag</h2>' +
        '<button class="icon-button" type="button" data-bag-close aria-label="Close bag">' + ICON_CLOSE + '</button>' +
      '</div>' +
      '<div class="drawer__body" data-bag-lines></div>' +
      '<div class="drawer__foot" data-bag-foot></div>' +
    '</aside>';
  document.body.appendChild(drawer);

  var lastFocus = null;

  function openBag() {
    lastFocus = document.activeElement;
    drawer.hidden = false;
    document.body.classList.add('no-scroll');
    // Next frame so the slide-in transition runs.
    requestAnimationFrame(function () {
      drawer.classList.add('is-open');
      drawer.querySelector('.drawer__head [data-bag-close]').focus();
    });
  }

  function closeBag() {
    drawer.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    setTimeout(function () { drawer.hidden = true; }, 250);
    if (lastFocus) lastFocus.focus();
  }

  function renderBag() {
    var lines = bagLines();
    var count = bagCount();

    document.querySelectorAll('[data-bag-count]').forEach(function (el) {
      el.textContent = count;
      if (count) el.removeAttribute('data-empty');
      else el.setAttribute('data-empty', '');
    });
    document.querySelectorAll('[data-bag-open]').forEach(function (el) {
      el.setAttribute('aria-label', 'Open bag, ' + count + (count === 1 ? ' item' : ' items'));
    });

    var body = drawer.querySelector('[data-bag-lines]');
    var foot = drawer.querySelector('[data-bag-foot]');

    if (!lines.length) {
      body.innerHTML =
        '<div class="drawer__empty">' +
          '<p class="muted">Your bag is empty. Add something warm from the shop.</p>' +
          '<a class="btn" href="' + ROOT + 'shop.html">Go to the shop</a>' +
        '</div>';
      foot.hidden = true;
      return;
    }

    body.innerHTML = lines.map(function (l) {
      var p = l.product;
      return '<div class="bag-line">' +
        '<img src="' + ROOT + p.img + '" alt="' + esc(p.alt) + '" width="72" height="80">' +
        '<div>' +
          '<div class="bag-line__top">' +
            '<a class="bag-line__name label" href="' + ROOT + p.url + '">' + esc(p.name) + '</a>' +
            '<span>' + fmt(l.total) + '</span>' +
          '</div>' +
          '<p class="body-sm muted">' + window.LB_CATEGORIES[p.cat].title + ' · ' + fmt(p.price) + ' each</p>' +
          '<div class="bag-line__controls">' +
            '<div class="qty">' +
              '<button class="qty__btn" type="button" data-bag-set="' + p.id + '" data-qty="' + (l.qty - 1) + '" aria-label="Remove one ' + esc(p.name) + '">−</button>' +
              '<span class="qty__value" aria-label="Quantity">' + l.qty + '</span>' +
              '<button class="qty__btn" type="button" data-bag-set="' + p.id + '" data-qty="' + (l.qty + 1) + '" aria-label="Add one ' + esc(p.name) + '">+</button>' +
            '</div>' +
            '<button class="link-button" type="button" data-bag-set="' + p.id + '" data-qty="0">Remove</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    foot.hidden = false;
    foot.innerHTML =
      '<div class="bag-total"><span class="label">Subtotal</span><span class="display-sm">' + fmt(bagTotal()) + '</span></div>' +
      '<a class="btn btn--block" href="' + ROOT + 'checkout.html">Checkout</a>' +
      '<p class="fine-print">Prices are fictional. No payment is taken.</p>';
  }

  // ---------- "Added to bag" notice ----------
  var toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.innerHTML = '<p data-toast-text></p><button class="btn-inv" type="button" data-bag-open-toast>View bag</button>';
  document.body.appendChild(toast);
  var toastTimer = null;

  function showToast(text) {
    toast.querySelector('[data-toast-text]').textContent = text;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 4000);
  }

  // ---------- Clicks ----------
  document.addEventListener('click', function (e) {
    var el;

    if ((el = e.target.closest('[data-add]'))) {
      var p = find(el.getAttribute('data-add'));
      if (!p) return;
      var qty = 1;
      var inputId = el.getAttribute('data-qty-input');
      if (inputId) {
        var input = document.getElementById(inputId);
        qty = Math.max(1, Math.min(99, parseInt(input.value, 10) || 1));
        input.value = 1;
      }
      addToBag(p.id, qty);
      showToast(qty + ' × ' + p.name + ' added to bag');
      return;
    }

    if ((el = e.target.closest('[data-bag-set]'))) {
      setQty(el.getAttribute('data-bag-set'), parseInt(el.getAttribute('data-qty'), 10));
      return;
    }

    if ((el = e.target.closest('[data-qty-step]'))) {
      var target = document.getElementById(el.getAttribute('data-target'));
      var next = (parseInt(target.value, 10) || 1) + parseInt(el.getAttribute('data-qty-step'), 10);
      target.value = Math.max(1, Math.min(99, next));
      return;
    }

    if (e.target.closest('[data-bag-open], [data-bag-open-toast]')) {
      toast.classList.remove('is-visible');
      openBag();
      return;
    }

    if (e.target.closest('[data-bag-close]')) {
      closeBag();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !drawer.hidden) closeBag();
  });

  // Keep the bag in sync when it changes in another tab.
  window.addEventListener('storage', function (e) {
    if (e.key === BAG_KEY) renderBag();
  });

  // ---------- Mobile menu ----------
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      nav.classList.toggle('is-open', open);
    });
  }

  // ---------- Cookie banner ----------
  function showCookieBanner() {
    if (document.querySelector('.cookie-banner')) return;
    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookie notice');
    banner.innerHTML =
      '<div class="container cookie-banner__inner">' +
        '<p class="body-sm">We use cookies to keep your bag and remember your choices. Optional cookies help us understand how the site is used. ' +
        'This is a simulated notice: this class project does not track you.</p>' +
        '<div class="cookie-banner__actions">' +
          '<button class="btn-ghost" type="button" data-cookie="rejected">Reject</button>' +
          '<button class="btn" type="button" data-cookie="accepted">Accept</button>' +
        '</div>' +
      '</div>';
    banner.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cookie]');
      if (!b) return;
      write(COOKIE_KEY, { choice: b.getAttribute('data-cookie'), date: new Date().toISOString() });
      banner.remove();
    });
    document.body.appendChild(banner);
  }

  if (!read(COOKIE_KEY, null)) showCookieBanner();

  document.querySelectorAll('[data-cookie-settings]').forEach(function (b) {
    b.addEventListener('click', showCookieBanner);
  });

  // ---------- Newsletter ----------
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  document.querySelectorAll('[data-newsletter]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var msg = form.querySelector('.newsletter__msg');
      var value = input.value.trim();
      if (!EMAIL_RE.test(value)) {
        input.setAttribute('aria-invalid', 'true');
        msg.classList.add('is-error');
        msg.textContent = 'Please enter a valid email address.';
        input.focus();
        return;
      }
      input.removeAttribute('aria-invalid');
      msg.classList.remove('is-error');
      msg.textContent = 'Thanks! You are on the list. (Simulated: no email will be sent.)';
      form.reset();
    });
  });

  // ---------- Footer year ----------
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  renderBag();

  // Shared with the checkout and confirmation scripts.
  window.LB = {
    root: ROOT,
    fmt: fmt,
    esc: esc,
    find: find,
    read: read,
    write: write,
    bagLines: bagLines,
    bagTotal: bagTotal,
    clearBag: clearBag
  };
})();
