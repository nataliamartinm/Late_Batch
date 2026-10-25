// Late Batch Bakery — product catalogue (fictional products and prices).
// Used by the bag, checkout and confirmation scripts. Paths are relative to the site root.
window.LB_CATEGORIES = {
  bread: { name: 'BREAD', title: 'Bread', anchor: 'shop.html#bread' },
  cookies: { name: 'COOKIES', title: 'Cookies', anchor: 'shop.html#cookies' },
  croissants: { name: 'CROISSANTS', title: 'Croissants', anchor: 'shop.html#croissants' }
};

window.LB_PRODUCTS = [
  { id: 'loaf', cat: 'bread', name: 'LOAF', price: 4.5, url: 'products/loaf.html', img: 'assets/photos/loaf.webp', alt: 'Sourdough loaf in its kraft paper bag' },
  { id: 'baguette', cat: 'bread', name: 'BAGUETTE', price: 2.2, url: 'products/baguette.html', img: 'assets/photos/baguette.webp', alt: 'Baguette in its kraft paper bag' },
  { id: 'ny-chocolate', cat: 'cookies', name: 'NY CHOCOLATE', price: 3.5, url: 'products/ny-chocolate.html', img: 'assets/photos/cookie-ny-chocolate.webp', alt: 'NY chocolate cookie in its brown paper bag' },
  { id: 'white-chocolate', cat: 'cookies', name: 'WHITE CHOCOLATE', price: 3.5, url: 'products/white-chocolate.html', img: 'assets/photos/cookie-white-chocolate.webp', alt: 'White chocolate cookie in its brown paper bag' },
  { id: 'red-velvet', cat: 'cookies', name: 'RED VELVET', price: 3.5, url: 'products/red-velvet.html', img: 'assets/photos/cookie-red-velvet.webp', alt: 'Red velvet cookie in its brown paper bag' },
  { id: 'nuts', cat: 'cookies', name: 'NUTS', price: 3.5, url: 'products/nuts.html', img: 'assets/photos/cookie-nuts.webp', alt: 'Nuts cookie in its brown paper bag' },
  { id: 'butter-croissant', cat: 'croissants', name: 'BUTTER', price: 2.6, url: 'products/butter-croissant.html', img: 'assets/photos/croissant-butter.webp', alt: 'Butter croissant in its teal paper bag' },
  { id: 'pistachio-croissant', cat: 'croissants', name: 'PISTACHIO', price: 3.8, url: 'products/pistachio-croissant.html', img: 'assets/photos/croissant-pistachio.webp', alt: 'Pistachio croissant in its teal paper bag' },
  { id: 'chocolate-croissant', cat: 'croissants', name: 'CHOCOLATE', price: 3.2, url: 'products/chocolate-croissant.html', img: 'assets/photos/croissant-chocolate.webp', alt: 'Chocolate croissant in its teal paper bag' }
];
