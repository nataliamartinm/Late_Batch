// Late Batch Bakery — simulated shop (no backend, nothing is charged).
(function () {
  var catalog = [
    { id: 'loaf', cat: 'bread', name: 'LOAF', price: 4.5, img: 'assets/photos/loaf.png', alt: 'Loaf in its kraft paper bag' },
    { id: 'baguette', cat: 'bread', name: 'BAGUETTE', price: 2.2, img: 'assets/photos/baguette.png', alt: 'Baguette in its kraft paper bag' },
    { id: 'ny-chocolate', cat: 'cookies', name: 'NY CHOCOLATE', price: 3.5, img: 'assets/photos/cookie-ny-chocolate.png', alt: 'NY chocolate cookie in its brown paper bag' },
    { id: 'white-chocolate', cat: 'cookies', name: 'WHITE CHOCOLATE', price: 3.5, img: 'assets/photos/cookie-white-chocolate.png', alt: 'White chocolate cookie in its brown paper bag' },
    { id: 'red-velvet', cat: 'cookies', name: 'RED VELVET', price: 3.5, img: 'assets/photos/cookie-red-velvet.png', alt: 'Red velvet cookie in its brown paper bag' },
    { id: 'nuts', cat: 'cookies', name: 'NUTS', price: 3.5, img: 'assets/photos/cookie-nuts.png', alt: 'Nuts cookie in its brown paper bag' },
    { id: 'butter', cat: 'croissants', name: 'BUTTER', price: 2.6, img: 'assets/photos/croissant-butter.png', alt: 'Butter croissant in its teal paper bag' },
    { id: 'pistachio', cat: 'croissants', name: 'PISTACHIO', price: 3.8, img: 'assets/photos/croissant-pistachio.png', alt: 'Pistachio croissant in its teal paper bag' },
    { id: 'chocolate', cat: 'croissants', name: 'CHOCOLATE', price: 3.2, img: 'assets/photos/croissant-chocolate.png', alt: 'Chocolate croissant in its teal paper bag' }
  ];
  var state = { cart: {}, ordered: false, orderCount: 0, orderTotal: 0 };
  var fmt = function (n) { return '€' + n.toFixed(2); };
  var $ = function (id) { return document.getElementById(id); };

  function card(p) {
    var q = state.cart[p.id] || 0;
    return '<div style="flex:1 1 200px;max-width:220px;min-width:0;text-align:center">' +
      '<img src="' + p.img + '" alt="' + p.alt + '" style="display:block;width:100%;aspect-ratio:1/1.1;object-fit:cover;border-radius:0">' +
      '<p style="margin-top:12px;font-size:14px;line-height:20px;letter-spacing:.2em;text-transform:uppercase;color:#513724">' + p.name + '</p>' +
      '<p style="margin-top:4px;font-size:16px;line-height:24px">' + fmt(p.price) + '</p>' +
      '<p style="margin-top:4px;min-height:16px;font-size:12px;line-height:16px;letter-spacing:.2em;text-transform:uppercase;color:#513724">' + (q ? 'In your bag: ' + q : '') + '</p>' +
      '<button class="btn" data-action="inc" data-id="' + p.id + '" aria-label="Add ' + p.name + ' to bag" style="margin-top:8px;width:100%">Add to bag</button></div>';
  }

  function bag() {
    var lines = catalog.filter(function (p) { return state.cart[p.id] > 0; });
    var count = 0, total = 0;
    lines.forEach(function (p) { count += state.cart[p.id]; total += state.cart[p.id] * p.price; });
    $('bag-label').textContent = 'Bag (' + count + ')';
    var h = '';
    if (state.ordered) {
      h = '<div style="margin-top:24px;display:flex;flex-direction:column;gap:20px" role="status">' +
        '<p style="font-family:\'Pagkaki\',\'Montserrat\',sans-serif;font-size:40px;line-height:40px;color:#c8553d;text-transform:uppercase">Thank you</p>' +
        '<p style="font-size:16px;line-height:24px">Order placed: ' + state.orderCount + (state.orderCount === 1 ? ' item, ' : ' items, ') + fmt(state.orderTotal) + '.</p>' +
        '<p style="font-size:14px;line-height:20px;color:#513724">This is a simulated shop. Nothing was charged and nothing will be delivered.</p>' +
        '<button class="btn" data-action="reset" style="width:100%">New order</button></div>';
    } else if (!lines.length) {
      h = '<p style="margin-top:20px;font-size:16px;line-height:24px;color:#513724">Your bag is empty. Add something from the shop.</p>';
    } else {
      h = '<div style="margin-top:20px;display:flex;flex-direction:column">' + lines.map(function (p) {
        var q = state.cart[p.id];
        return '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;padding:16px 0;border-top:1px solid #3b222233">' +
          '<div style="flex:1 1 120px;min-width:0"><p style="font-size:14px;line-height:20px;letter-spacing:.2em;text-transform:uppercase">' + p.name + '</p>' +
          '<p style="margin-top:2px;font-size:14px;line-height:20px;color:#513724">' + fmt(p.price) + ' each</p></div>' +
          '<div style="display:flex;align-items:center;gap:4px">' +
          '<button class="qb" data-action="dec" data-id="' + p.id + '" aria-label="Remove one ' + p.name + '">−</button>' +
          '<span style="min-width:28px;text-align:center;font-size:16px;line-height:24px">' + q + '</span>' +
          '<button class="qb" data-action="inc" data-id="' + p.id + '" aria-label="Add one ' + p.name + '">+</button></div>' +
          '<p style="flex:0 0 64px;text-align:right;font-size:16px;line-height:24px">' + fmt(p.price * q) + '</p></div>';
      }).join('') + '</div>' +
        '<div style="display:flex;align-items:baseline;justify-content:space-between;padding:20px 0 24px;border-top:1px solid #3b2a22">' +
        '<p style="font-size:14px;line-height:20px;letter-spacing:.2em;text-transform:uppercase">Total</p>' +
        '<p style="font-family:\'Pagkaki\',\'Montserrat\',sans-serif;font-size:40px;line-height:40px">' + fmt(total) + '</p></div>' +
        '<button class="btn" data-action="checkout" style="width:100%">Checkout</button>' +
        '<p style="margin-top:16px;font-size:14px;line-height:20px;color:#513724">Prices are fictional. No payment is taken.</p>';
    }
    $('bag-content').innerHTML = h;
  }

  function render() {
    ['bread', 'cookies', 'croissants'].forEach(function (c) {
      $('grid-' + c).innerHTML = catalog.filter(function (p) { return p.cat === c; }).map(card).join('');
    });
    bag();
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-action]');
    if (!el) return;
    var a = el.getAttribute('data-action'), id = el.getAttribute('data-id');
    if (a === 'inc') state.cart[id] = (state.cart[id] || 0) + 1;
    if (a === 'dec') { state.cart[id] = (state.cart[id] || 0) - 1; if (state.cart[id] <= 0) delete state.cart[id]; }
    if (a === 'checkout') {
      var n = 0, t = 0;
      catalog.forEach(function (p) { var q = state.cart[p.id] || 0; n += q; t += q * p.price; });
      state = { cart: {}, ordered: true, orderCount: n, orderTotal: t };
    }
    if (a === 'reset') state = { cart: {}, ordered: false, orderCount: 0, orderTotal: 0 };
    render();
  });
  render();
})();
