// Late Batch Bakery — order confirmation: shows the last simulated order and empties the bag.
(function () {
  'use strict';

  var LB = window.LB;
  var order = LB.read('lb-last-order', null);
  var box = document.getElementById('order');
  var none = document.getElementById('no-order');

  if (!order) {
    box.hidden = true;
    none.hidden = false;
    return;
  }

  LB.clearBag();

  var set = function (sel, text) { box.querySelector(sel).textContent = text; };
  var date = new Date(order.date);

  set('[data-order-number]', order.number);
  set('[data-order-email]', order.email);
  set('[data-order-name]', order.name);
  set('[data-order-date]', date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }));
  set('[data-order-method]', order.method === 'delivery' ? 'Home delivery' : 'Pick up in store');
  set('[data-order-where]', order.method === 'delivery'
    ? order.address + '. Your bag will arrive this evening between 7 pm and 9 pm.'
    : 'Calle del Horno 12, 28012 Madrid. Ready from 5 pm today. Bring your order number.');
  set('[data-order-card]', 'Card ending in ' + order.card + ' (simulated, not charged)');
  set('[data-subtotal]', LB.fmt(order.subtotal));
  set('[data-delivery]', order.delivery ? LB.fmt(order.delivery) : 'Free');
  set('[data-total]', LB.fmt(order.total));

  box.querySelector('[data-summary-lines]').innerHTML = order.items.map(function (item) {
    var p = LB.find(item.id);
    return '<li class="summary__line">' +
      (p ? '<img src="' + p.img + '" alt="' + LB.esc(p.alt) + '" width="56" height="62">' : '<span></span>') +
      '<div><p class="label">' + LB.esc(item.name) + '</p><p class="body-sm muted">Qty ' + item.qty + ' · ' + LB.fmt(item.price) + ' each</p></div>' +
      '<span>' + LB.fmt(item.qty * item.price) + '</span>' +
    '</li>';
  }).join('');
})();
