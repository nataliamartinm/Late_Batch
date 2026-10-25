// Late Batch Bakery — simulated checkout: order summary, form validation and fake payment.
(function () {
  'use strict';

  var LB = window.LB;
  var DELIVERY_FEE = 2.5;
  var form = document.getElementById('checkout-form');
  var summary = document.getElementById('summary');
  var empty = document.getElementById('checkout-empty');
  var layout = document.getElementById('checkout-layout');
  var addressBlock = document.getElementById('address-fields');
  var pickupBlock = document.getElementById('pickup-info');
  var submit = document.getElementById('place-order');

  function method() {
    return form.querySelector('input[name="method"]:checked').value;
  }

  function fee() {
    return method() === 'delivery' ? DELIVERY_FEE : 0;
  }

  // ---------- Summary ----------
  function renderSummary() {
    var lines = LB.bagLines();
    if (!lines.length) {
      layout.hidden = true;
      empty.hidden = false;
      return;
    }
    var subtotal = LB.bagTotal();
    var total = subtotal + fee();
    summary.querySelector('[data-summary-lines]').innerHTML = lines.map(function (l) {
      var p = l.product;
      return '<li class="summary__line">' +
        '<img src="' + p.img + '" alt="' + LB.esc(p.alt) + '" width="56" height="62">' +
        '<div><p class="label">' + LB.esc(p.name) + '</p><p class="body-sm muted">Qty ' + l.qty + ' · ' + LB.fmt(p.price) + ' each</p></div>' +
        '<span>' + LB.fmt(l.total) + '</span>' +
      '</li>';
    }).join('');
    summary.querySelector('[data-subtotal]').textContent = LB.fmt(subtotal);
    summary.querySelector('[data-delivery]').textContent = fee() ? LB.fmt(fee()) : 'Free';
    summary.querySelector('[data-total]').textContent = LB.fmt(total);
    submit.textContent = 'Place order · ' + LB.fmt(total);
  }

  function updateMethod() {
    var delivery = method() === 'delivery';
    addressBlock.hidden = !delivery;
    pickupBlock.hidden = delivery;
    addressBlock.querySelectorAll('input').forEach(function (i) { i.disabled = !delivery; });
    renderSummary();
  }

  form.addEventListener('change', function (e) {
    if (e.target.name === 'method') updateMethod();
  });

  // ---------- Input formatting ----------
  var cardInput = document.getElementById('card-number');
  cardInput.addEventListener('input', function () {
    var digits = cardInput.value.replace(/\D/g, '').slice(0, 16);
    cardInput.value = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  });

  var expInput = document.getElementById('card-expiry');
  expInput.addEventListener('input', function () {
    var d = expInput.value.replace(/\D/g, '').slice(0, 4);
    expInput.value = d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d;
  });

  // ---------- Validation ----------
  function luhn(num) {
    var sum = 0;
    for (var i = 0; i < num.length; i++) {
      var d = parseInt(num.charAt(num.length - 1 - i), 10);
      if (i % 2) { d *= 2; if (d > 9) d -= 9; }
      sum += d;
    }
    return sum % 10 === 0;
  }

  var rules = {
    name: function (v) { return v.length >= 2 || 'Please enter your full name.'; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || 'Please enter a valid email address.'; },
    phone: function (v) { return /^\+?[\d\s()-]{9,18}$/.test(v) || 'Please enter a valid phone number.'; },
    address: function (v) { return v.length >= 5 || 'Please enter your street and number.'; },
    city: function (v) { return v.length >= 2 || 'Please enter your city.'; },
    postcode: function (v) { return /^\d{5}$/.test(v) || 'Please enter a 5-digit postcode.'; },
    'card-name': function (v) { return v.length >= 2 || 'Please enter the name on the card.'; },
    'card-number': function (v) {
      var d = v.replace(/\s/g, '');
      return (/^\d{16}$/.test(d) && luhn(d)) || 'Please enter a valid 16-digit card number.';
    },
    'card-expiry': function (v) {
      var m = /^(\d{2})\/(\d{2})$/.exec(v);
      if (!m || +m[1] < 1 || +m[1] > 12) return 'Use the format MM/YY.';
      var now = new Date();
      var end = new Date(2000 + +m[2], +m[1], 1);
      return end > now || 'This card has expired.';
    },
    'card-cvc': function (v) { return /^\d{3,4}$/.test(v) || 'Please enter the 3 or 4 digits on the back.'; }
  };

  function validateField(input) {
    var rule = rules[input.id];
    if (!rule || input.disabled) return true;
    var result = rule(input.value.trim());
    var error = document.getElementById(input.id + '-error');
    if (result === true) {
      input.removeAttribute('aria-invalid');
      error.textContent = '';
      return true;
    }
    input.setAttribute('aria-invalid', 'true');
    error.textContent = result;
    return false;
  }

  form.querySelectorAll('.input').forEach(function (input) {
    input.addEventListener('blur', function () {
      if (input.value) validateField(input);
    });
    input.addEventListener('input', function () {
      if (input.getAttribute('aria-invalid')) validateField(input);
    });
  });

  // ---------- Place order ----------
  function orderNumber() {
    var d = new Date();
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    return 'LB-' + String(d.getFullYear()).slice(2) + pad(d.getMonth() + 1) + pad(d.getDate()) +
      '-' + String(Math.floor(1000 + Math.random() * 9000));
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var firstInvalid = null;
    form.querySelectorAll('.input').forEach(function (input) {
      if (!validateField(input) && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    var lines = LB.bagLines();
    if (!lines.length) return;
    var val = function (id) { return document.getElementById(id).value.trim(); };
    var subtotal = LB.bagTotal();
    var order = {
      number: orderNumber(),
      date: new Date().toISOString(),
      name: val('name'),
      email: val('email'),
      method: method(),
      address: method() === 'delivery' ? val('address') + ', ' + val('postcode') + ' ' + val('city') : null,
      card: val('card-number').slice(-4),
      items: lines.map(function (l) { return { id: l.product.id, name: l.product.name, qty: l.qty, price: l.product.price }; }),
      subtotal: subtotal,
      delivery: fee(),
      total: subtotal + fee()
    };

    // Pretend to talk to a payment provider for a moment.
    submit.disabled = true;
    submit.textContent = 'Processing…';
    setTimeout(function () {
      LB.write('lb-last-order', order);
      LB.clearBag();
      window.location.href = 'order-confirmed.html';
    }, 1200);
  });

  updateMethod();
})();
