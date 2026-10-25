# Late Batch Bakery

Web de una panadería ficticia, *Late Batch Bakery*, hecha para la asignatura **Digital Marketing Strategies** (3.º TSDMG).

**Web publicada:** <https://nataliamartinm.github.io/Late_Batch/>

La web simula lo más fielmente posible la tienda online de una panadería real: catálogo de pan, galletas y croissants, bolsa de compra, checkout y confirmación de pedido. Todo lo que en una web real necesitaría un servidor (pago, pedidos, newsletter) se simula en el navegador con JavaScript. No se cobra nada ni se envía ningún dato.

## Páginas

| Página | Archivo |
| --- | --- |
| Home | `docs/index.html` |
| About us | `docs/about.html` |
| Shop (Bread, Cookies, Croissants) | `docs/shop.html` |
| Fichas de producto (9) | `docs/products/*.html` |
| Checkout | `docs/checkout.html` |
| Confirmación de pedido | `docs/order-confirmed.html` |
| Página no encontrada | `docs/404.html` |

## Características

- Diseño *mobile-first* y responsive (móvil, tablet y escritorio), con menú plegable en móvil.
- Bolsa de compra que se guarda entre páginas (`localStorage`) y aviso “added to bag”.
- Checkout con formulario validado y número de pedido generado. Tarjeta de prueba: `4242 4242 4242 4242`, cualquier fecha futura y cualquier CVC.
- Banner de cookies y suscripción a la newsletter simulados.
- Técnicas SEO: metadatos por página, URL canónicas, Open Graph, datos estructurados JSON-LD, `sitemap.xml`. Se explican en [SEO.md](SEO.md).
- Web 100 % en inglés y sigue el design system de la marca (colores, tipografías Pagkaki y Montserrat, estética plana).

## Tecnología

HTML, CSS y JavaScript nativos, sin frameworks ni paso de compilación. La carpeta `docs/` se publica tal cual con GitHub Pages.

## Estructura del repositorio

```
Late_Batch/
├── docs/                 ← web publicada
│   ├── *.html            ← páginas
│   ├── products/         ← una página por producto
│   ├── css/styles.css
│   ├── js/               ← products.js, main.js, checkout.js, confirmation.js
│   ├── assets/           ← logos, fotos (WebP), imágenes para redes, fuente Pagkaki, favicon
│   ├── sitemap.xml  robots.txt  .nojekyll
├── assets/               ← material de origen (design system, prototipo, fuentes); no se publica
├── ESPECIFICACIONES.md   ← especificación del proyecto
├── SEO.md                ← técnicas SEO aplicadas
└── README.md
```

## Ver la web en local

Abre `docs/index.html` en el navegador. Para que todo funcione igual que publicado, es mejor servir la carpeta con un servidor local, por ejemplo con la extensión **Live Server** de VS Code (clic derecho en `docs/index.html` → *Open with Live Server*).

## Publicación

GitHub Pages, sin GitHub Actions: *Settings → Pages → Deploy from a branch → `main` / `/docs`*. Cada push a `main` actualiza la web en uno o dos minutos.

## Autoría

- **Natalia Martín Macías** — diseño y desarrollo, estudiante de 3.º de TSDMG.
- Jose Luis Martín — colaboración.

*Late Batch Bakery* es una marca ficticia: la dirección, el horario, los productos y los precios son inventados.

## Créditos

- Tipografía **Montserrat** — SIL Open Font License (Google Fonts).
- Tipografía **Pagkaki** — © 2016 Konstantina Louka.
- Logos y fotografías — design system *Late Batch* (`assets/late-batch-design-system/`).
