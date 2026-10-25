# SEO — Late Batch Bakery

Este documento explica las técnicas SEO aplicadas en la web de *Late Batch Bakery* (`docs/`): qué se ha hecho, dónde está y por qué ayuda al posicionamiento. Describe lo que realmente está implementado.

URL pública: <https://nataliamartinm.github.io/Late_Batch/>

---

## 1. SEO on-page

### 1.1 Título y meta descripción únicos
- **Qué:** cada página tiene su propio `<title>` y `<meta name="description">`.
- **Dónde:** `<head>` de todas las páginas. Ejemplos:
  - Home: *Late Batch Bakery — Bread, cookies and croissants in Madrid*
  - Ficha: *Pistachio Croissant — Croissants | Late Batch Bakery*
- **Por qué:** el título es el texto azul del resultado de Google y uno de los factores on-page más importantes; la descripción es el fragmento que aparece debajo y mejora el porcentaje de clics (CTR). Repetir el mismo título en varias páginas haría que compitieran entre sí.
- Las fichas incluyen el nombre completo del producto (*Butter Croissant*, no solo *BUTTER*) y el precio en la descripción, porque es lo que busca un usuario.

### 1.2 Un solo `<h1>` y jerarquía de encabezados
- **Qué:** un único `<h1>` por página y encabezados `h2` → `h3` en orden, sin saltos.
- **Dónde:** Home (el `h1` es el logo con `alt="Late Batch Bakery"`), Shop (`h1` *Shop*, `h2` por categoría, `h3` por producto), fichas (`h1` con el nombre del producto, `h2` *More croissants*…).
- **Por qué:** los buscadores usan los encabezados para entender de qué trata la página y cómo se organiza.

### 1.3 HTML semántico
- **Qué:** `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `address`, `figure`/`figcaption`, `dl` para ingredientes y alérgenos, `ol` para la ruta de navegación.
- **Por qué:** el marcado semántico ayuda al buscador a distinguir el contenido principal de la navegación y el pie, y es también buena práctica de accesibilidad.

### 1.4 Idioma
- **Qué:** `lang="en"` en todas las páginas y `og:locale` = `en_GB`. Todo el texto, incluido el oculto (`alt`, `aria-label`, metadatos), está en inglés.
- **Por qué:** indica al buscador en qué idioma debe mostrar la página.

## 2. URLs

### 2.1 URLs descriptivas
- **Qué:** una página HTML por producto con nombre legible: `products/red-velvet.html`, `products/butter-croissant.html`…
- **Por qué:** la URL contiene la palabra clave y el usuario entiende a dónde va antes de pulsar. Se prefirió frente a `product.html?id=…` rellenada con JavaScript porque así cada producto tiene su propia URL, título, descripción y datos estructurados en el HTML, sin depender de que el buscador ejecute JavaScript.
- A los croissants se les añade `-croissant` para no confundir `chocolate-croissant` con la galleta `ny-chocolate`.

### 2.2 URL canónica
- **Qué:** `<link rel="canonical">` con la URL absoluta en cada página.
- **Por qué:** evita contenido duplicado. Por ejemplo, la Home se puede abrir como `/Late_Batch/` y como `/Late_Batch/index.html`; la canónica le dice a Google que son la misma página.

## 3. Imágenes

- **Formato ligero:** las fotos PNG del design system (≈ 550–780 KB cada una) se convirtieron a **WebP** (≈ 30–50 KB), unas 15 veces menos peso.
- **Nombres descriptivos:** `croissant-pistachio.webp`, `cookie-red-velvet.webp`…
- **Texto alternativo:** todas las imágenes tienen `alt` descriptivo en inglés (*Pistachio croissant in its teal paper bag*).
- **Dimensiones fijadas:** atributos `width` y `height` en todas las imágenes, para que el navegador reserve el hueco y la página no "salte" al cargar (mejora el indicador CLS de Core Web Vitals).
- **Carga diferida:** `loading="lazy"` en las imágenes que no se ven al abrir la página; la imagen principal (logo de la portada, foto de la ficha) lleva `fetchpriority="high"` para que cargue primero (mejora el LCP).

## 4. Datos estructurados (JSON-LD, schema.org)

Bloques `<script type="application/ld+json">` que describen el contenido de forma que el buscador lo entiende sin interpretar el diseño. Permiten resultados enriquecidos (precio, disponibilidad, migas de pan, ficha de negocio local).

| Tipo | Dónde | Datos |
| --- | --- | --- |
| `Bakery` (negocio local) | `index.html` | Nombre, URL, logo, imagen, dirección, horario (`openingHoursSpecification`), rango de precios, enlace a la tienda (`hasMenu`) |
| `Product` + `Offer` | Cada ficha `products/*.html` | Nombre, imágenes, descripción, SKU, categoría, marca, peso; oferta con precio, moneda `EUR`, disponibilidad `InStock` y vendedor |
| `BreadcrumbList` | Cada ficha | Shop › Categoría › Producto |

Se puede comprobar con la herramienta [Rich Results Test](https://search.google.com/test/rich-results) de Google o el [Schema Markup Validator](https://validator.schema.org/).

> Nota: el negocio es ficticio. En una web real, la dirección y el horario de `Bakery` deberían coincidir con la ficha de Google Business Profile.

## 5. Redes sociales: Open Graph y Twitter Card

- **Qué:** etiquetas `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name` y `twitter:card` = `summary_large_image` en todas las páginas. Las fichas usan `og:type` = `product` y añaden `product:price:amount` y `product:price:currency`.
- **Imágenes:** JPG de 1200 × 630 px (el tamaño recomendado) en `docs/assets/og/`: una general con las tres bolsas y una por producto.
- **Por qué:** cuando alguien comparte un enlace en WhatsApp, Instagram, Facebook, LinkedIn o X aparece una tarjeta con imagen, título y descripción en lugar de un enlace suelto. No es un factor de posicionamiento directo, pero aumenta los clics y el tráfico de referencia.

## 6. Rastreo e indexación

### 6.1 `sitemap.xml`
- Lista las 12 páginas indexables (Home, About us, Shop y las 9 fichas) con fecha de última modificación.
- Ayuda al buscador a descubrir todas las páginas. Se puede enviar en Google Search Console.

### 6.2 `robots.txt`
- Permite el rastreo de todo el sitio e indica la ubicación del sitemap.
- **Limitación conocida:** los buscadores solo leen `robots.txt` en la raíz del dominio (`nataliamartinm.github.io/robots.txt`). Como la web está en la subruta `/Late_Batch/`, este archivo es demostrativo; en un dominio propio funcionaría tal cual. El sitemap se puede enviar igualmente en Search Console.

### 6.3 `noindex` en checkout y confirmación
- `checkout.html` y `order-confirmed.html` llevan `<meta name="robots" content="noindex, follow">`.
- Son páginas sin valor para quien busca en Google y su contenido depende de la bolsa de cada usuario. `follow` permite que el buscador siga sus enlaces.
- No se bloquean en `robots.txt` a propósito: si el buscador no pudiera rastrearlas, no vería la etiqueta `noindex`.
- No se incluyen en el sitemap.

### 6.4 Página `404.html`
- GitHub Pages la muestra automáticamente para cualquier URL que no existe y devuelve el código HTTP 404 (no un 200), así el buscador no indexa páginas vacías.
- Lleva `noindex` y enlaces a la Home y a las tres categorías para no perder al usuario.
- Es la única página con `<base href>` absoluto, porque GitHub puede servirla desde cualquier ruta (por ejemplo `/Late_Batch/a/b/c`) y las rutas relativas dejarían de funcionar.

## 7. Enlazado interno

- **Ruta de navegación** (*breadcrumb*) en cada ficha: Shop › Categoría › Producto.
- **Productos relacionados** de la misma categoría al final de cada ficha.
- **Enlaces entre categorías** al final de cada ficha (*Looking for something else?*), en la Home (un bloque por categoría) y en el pie (Bread, Cookies, Croissants).
- **Anclas** `#bread`, `#cookies`, `#croissants` en la tienda.
- **Por qué:** reparte la relevancia entre páginas, ayuda al buscador a descubrirlas todas y mantiene al usuario navegando. Ninguna ficha queda a más de dos clics de la Home.
- Los enlaces de producto son `<a href>` reales en el HTML (no botones con JavaScript), para que el buscador pueda seguirlos.

## 8. Móvil y velocidad

- **Mobile-first:** el CSS parte del móvil y añade reglas para tablet (≥ 600 px) y escritorio (≥ 1024 px). Google indexa primero la versión móvil (*mobile-first indexing*).
- **Meta viewport** en todas las páginas, sin scroll horizontal desde 320 px y zonas táctiles de al menos 44 × 44 px.
- **Sin frameworks:** HTML, CSS y JavaScript nativos (≈ 48 KB de CSS y JS en total, sin comprimir), sin paso de compilación.
- **Fuentes:**
  - Montserrat se carga desde Google Fonts, solo el peso 400, con `display=swap` (el texto se ve aunque la fuente aún no haya llegado).
  - `preconnect` a `fonts.googleapis.com` y `fonts.gstatic.com` para abrir la conexión antes.
  - Pagkaki (no está en Google Fonts) va en el propio sitio con `preload` y `font-display: swap`.
- **Contenido en el HTML:** catálogo, precios y fichas están escritos en el HTML; JavaScript solo añade la bolsa, los avisos y el checkout. El buscador ve todo el contenido sin ejecutar JavaScript.
- **Favicon** SVG (logo en crema sobre fondo café) y `theme-color` para la barra del navegador en móvil.

## 9. Cómo comprobarlo

1. **Lighthouse** (Chrome DevTools → Lighthouse → SEO / Performance) sobre la URL publicada.
2. **Rich Results Test** de Google con una ficha de producto y con la Home.
3. **PageSpeed Insights** para Core Web Vitals en móvil.
4. **Vista previa de enlaces:** pegar una URL de ficha en WhatsApp o en el [Sharing Debugger de Facebook](https://developers.facebook.com/tools/debug/).
5. **Google Search Console:** dar de alta la propiedad y enviar `https://nataliamartinm.github.io/Late_Batch/sitemap.xml`.
