# Especificaciones — Web estática Late Batch Bakery

> Documento vivo. Se rellena de forma iterativa.
> Leyenda: ✅ confirmado · ❓ pendiente de confirmar · ⬜ por definir

| Campo | Valor |
| --- | --- |
| Versión | 1.0 |
| Última actualización | 2026-10-25 |
| Autoría | Natalia Martín Macías · Jose Luis Martín |
| Estado | Cerrado — en construcción |

---

## 1. Contexto y objetivo

- ✅ **Naturaleza:** ejercicio académico. La web es una **simulación lo más realista posible** de la web de una panadería real.
- ✅ **Proyecto:** web de una panadería ficticia, *Late Batch Bakery*, para la asignatura Digital Marketing Strategies (3.º TSDMG).
- ✅ **Principio de realismo:** todo lo que en una web real necesitaría servidor (compra, formularios, newsletter…) se simula en el navegador con JavaScript, de modo que la experiencia de usuario parezca real.
- ✅ **Fecha de entrega:** 2026-10-25 (hoy).

## 2. Público objetivo

- ✅ Dispositivos: móvil, tablet y escritorio. El móvil es prioritario (diseño *mobile-first*).

## 3. Alcance

### 3.1 Incluido
- ✅ Páginas: Home, About us, Shop, detalle de producto, checkout y confirmación de pedido.
- ✅ Tienda simulada con productos divididos en tres categorías: Bread, Cookies y Croissants.
- ✅ Compra simulada completa: bolsa → checkout → confirmación.
- ✅ Elementos de realismo: banner de cookies, newsletter en el pie y aviso “added to bag”.
- ✅ Técnicas SEO y documento que las explica (ver sección 11).

### 3.2 Fuera de alcance
- ✅ Backend, servidor, base de datos, APIs propias y pago real.
- ✅ Login y cuentas de usuario.
- ✅ Tema oscuro.
- ✅ Requisitos formales de accesibilidad (ver sección 10).

## 4. Mapa del sitio

| Página | Archivo | Propósito | Estado |
| --- | --- | --- | --- |
| Home | `index.html` | Portada visual con el logo en grande | ✅ |
| About us | `about.html` | Autoría, contexto académico e historia de la marca | ✅ |
| Shop | `shop.html` | Tienda con las tres categorías | ✅ |
| Detalle de producto | `products/<producto>.html` | Ficha de un producto | ✅ (ver 5.4) |
| Checkout | `checkout.html` | Formulario de pedido | ✅ |
| Confirmación | `order-confirmed.html` | Resumen y nº de pedido | ✅ |
| Página de error | `404.html` | Página no encontrada (GitHub Pages la usa automáticamente) | ✅ |

- ✅ La navegación común da acceso a Home, About us y Shop, más un icono de bolsa con el número de artículos.
- ✅ Checkout y confirmación no se indexan en buscadores (`noindex`).

## 5. Contenido por página

### 5.1 Home (`index.html`)
- ✅ Portada inicial con el **logo en grande**, lo más visual posible, con los **colores corporativos**.
- ✅ Portada a pantalla completa con fondo `dark-coffee` y logo en tinta `cream` (como en el prototipo).
- ✅ Debajo de la portada, un bloque por categoría (color de la categoría + foto) que lleva a su sección de la tienda.

### 5.2 About us (`about.html`)
- ✅ Explica que la web ha sido hecha por **Natalia Martín Macías**, estudiante de **tercero de TSDMG**, para la asignatura **Digital Marketing Strategies**.
- ✅ Historia ficticia de la marca.
- ✅ Aviso de que *Late Batch Bakery* es una marca ficticia y la tienda es una simulación.

### 5.3 Shop (`shop.html`)
- ✅ Las tres categorías en la misma página, una debajo de otra, con accesos rápidos a cada una (anclas `#bread`, `#cookies`, `#croissants`).
- ✅ Al pulsar un producto (foto o nombre) se abre su página de detalle.
- ✅ Catálogo y precios ficticios en euros (tomados del prototipo):

| Categoría | Producto | Precio |
| --- | --- | --- |
| BREAD | LOAF | €4.50 |
| BREAD | BAGUETTE | €2.20 |
| COOKIES | NY CHOCOLATE | €3.50 |
| COOKIES | WHITE CHOCOLATE | €3.50 |
| COOKIES | RED VELVET | €3.50 |
| COOKIES | NUTS | €3.50 |
| CROISSANTS | BUTTER | €2.60 |
| CROISSANTS | PISTACHIO | €3.80 |
| CROISSANTS | CHOCOLATE | €3.20 |

- ✅ Etiquetas solo con el nombre en mayúsculas (regla del design system); la descripción va en la ficha.

### 5.4 Detalle de producto
- ✅ Se abre al pulsar un producto en la tienda.
- ✅ **Implementación: una página HTML por producto** (`products/baguette.html`, etc.). Cambia la propuesta anterior (`product.html?id=…` rellenada con JavaScript) porque ahora el SEO es requisito: cada producto necesita su propia URL, título, descripción y datos estructurados escritos en el HTML, sin depender de que el buscador ejecute JavaScript.
- ✅ Contenido:
  - Ruta de navegación: Shop › Categoría › Producto
  - Foto grande
  - Nombre en mayúsculas (tipografía display) y categoría con su color
  - Precio y descripción
  - Ingredientes, alérgenos y peso
  - Selector de cantidad y botón “Add to bag”
  - Productos relacionados de la misma categoría
- ✅ En móvil, foto arriba y datos debajo; en escritorio, foto a la izquierda y datos a la derecha.

### 5.5 Bolsa, checkout y confirmación
- ✅ **Bolsa:** añadir, cambiar cantidad, quitar y ver el total. Se guarda en `localStorage` para que persista entre páginas.
- ✅ **Aviso “added to bag”** al añadir un producto.
- ✅ **Checkout (`checkout.html`):** resumen del pedido y formulario (nombre, email, teléfono, dirección o recogida en tienda, datos de tarjeta ficticios). Validación en el navegador.
- ✅ **Confirmación (`order-confirmed.html`):** número de pedido generado, resumen y vaciado de la bolsa.
- ✅ Aviso visible de que no se realiza ningún pago real.

### 5.6 Elementos comunes
- ✅ **Banner de cookies** con aceptar/rechazar; la elección se recuerda en `localStorage`.
- ✅ **Newsletter** en el pie: campo de email con validación y mensaje de suscripción simulada.
- ✅ Pie con enlaces de navegación, dirección y horario ficticios, y aviso de proyecto académico.

## 6. Requisitos funcionales

| ID | Requisito | Prioridad | Estado |
| --- | --- | --- | --- |
| RF-01 | Navegación común entre todas las páginas, con menú plegable en móvil | Alta | ✅ |
| RF-02 | Bolsa de compra simulada y persistente entre páginas | Alta | ✅ |
| RF-03 | Al pulsar un producto se abre su página de detalle | Alta | ✅ |
| RF-04 | Checkout con formulario validado y confirmación con nº de pedido | Alta | ✅ |
| RF-05 | Aviso “added to bag” al añadir un producto | Media | ✅ |
| RF-06 | Banner de cookies con elección recordada | Media | ✅ |
| RF-07 | Suscripción simulada a la newsletter | Baja | ✅ |

## 7. Diseño e identidad visual

- ✅ Se sigue el design system *Late Batch* (`assets/late-batch-design-system/`).
- ✅ Tipografías: Pagkaki (títulos, mayúsculas, ≥28px) y Montserrat 400 (texto, sin negrita).
- ✅ Estética plana: sin sombras, degradados ni esquinas redondeadas; composición centrada.
- ✅ Color por categoría: bread (cobre), cookies (marrón), croissants (teal).
- ✅ Sin tema oscuro.

## 8. Idioma y tono

- ✅ Web **100 % en inglés**, incluido el texto oculto:
  - Menú, botones, mensajes de la bolsa y avisos de error
  - Textos alternativos de las imágenes (`alt`), títulos de pestaña y metadatos
  - Atributo `lang="en"` en todas las páginas
- ✅ Precios en convención inglesa: `€4.50`.
- ✅ Etiquetas en mayúsculas sin adornos; textos largos en *sentence case*, cortos y sencillos.
- ✅ Este documento de especificaciones se mantiene en español.

## 9. Requisitos técnicos

### 9.1 Restricciones
- ✅ Web **100 % estática**: solo archivos HTML, CSS y JavaScript servidos tal cual.
- ✅ Sin backend ni lógica en servidor.
- ✅ Sin paso de compilación.
- ✅ Se permiten recursos externos (p. ej. Google Fonts).
- ✅ Sin frameworks de CSS ni de JavaScript: CSS y JavaScript nativos.

### 9.2 Punto de partida
- ✅ Se parte del **prototipo** `assets/late-batch-website/`, basado en el **design system** `assets/late-batch-design-system/`.
- ✅ El prototipo se copia a **`docs/`** (carpeta que publica GitHub Pages) y se evoluciona allí. El esqueleto de `src/` se elimina.
- ✅ Los logos, fotos y fuentes que usa la web se copian dentro de `docs/assets/`. La carpeta `assets/` de la raíz queda como material de origen y no se publica.
- ✅ Se mueven a CSS los estilos que el prototipo escribe en línea dentro de `js/shop.js`, y el catálogo pasa a un archivo propio (`js/products.js`).

Estructura del repositorio:

```
Late_Batch/
├── docs/                 ← web publicada
│   ├── index.html, about.html, shop.html, checkout.html, order-confirmed.html, 404.html
│   ├── products/         ← una página por producto
│   ├── css/  js/  assets/
│   ├── sitemap.xml  robots.txt  .nojekyll
├── assets/               ← material de origen (design system, prototipo, fuentes)
├── ESPECIFICACIONES.md
└── SEO.md
```

### 9.3 Responsive y móvil
- ✅ Diseño responsive, compatible con móviles, *mobile-first*.
- ✅ Puntos de corte: móvil < 600px · tablet 600–1023px · escritorio ≥ 1024px.
- ✅ Ancho mínimo soportado: 320px, sin scroll horizontal.
- ✅ Menú plegable (hamburguesa) en móvil.
- ✅ Zonas táctiles de al menos 44×44px.
- ✅ Imágenes fluidas y meta `viewport` en todas las páginas.

### 9.4 Compatibilidad
- ✅ Últimas versiones de Chrome, Safari (iOS y macOS), Firefox y Edge.

## 10. Accesibilidad y rendimiento

- ✅ Accesibilidad: **fuera de alcance** como requisito formal (sin nivel WCAG objetivo). Se mantienen las buenas prácticas que también son SEO (textos `alt`, HTML semántico, jerarquía de encabezados).
- ✅ Rendimiento: imágenes optimizadas (WebP con dimensiones fijadas y carga diferida `loading="lazy"` fuera de la portada). También mejora el SEO.

## 11. SEO

- ✅ Se aplican técnicas SEO en toda la web.
- ✅ **Entregable:** documento `SEO.md` que explica cada técnica usada, dónde se aplica y por qué. Se redacta al construir la web, para que describa lo que realmente se ha implementado.
- ✅ Técnicas previstas:
  - **On-page:** `<title>` y `<meta name="description">` únicos por página; un solo `<h1>` y jerarquía de encabezados; HTML semántico (`header`, `nav`, `main`, `article`, `footer`).
  - **URLs:** nombres de archivo descriptivos (`products/red-velvet.html`); URL canónica (`<link rel="canonical">`).
  - **Imágenes:** nombres de archivo descriptivos, `alt` en todas, dimensiones fijadas, formato ligero.
  - **Datos estructurados (JSON-LD, schema.org):** `Bakery` (negocio local) en la Home, `Product` + `Offer` en cada ficha, `BreadcrumbList` en la ruta de navegación.
  - **Redes sociales:** Open Graph y Twitter Card para que los enlaces compartidos muestren imagen y descripción.
  - **Rastreo:** `sitemap.xml`, `robots.txt`, `noindex` en checkout y confirmación, página `404.html`.
  - **Enlazado interno:** ruta de navegación, productos relacionados, enlaces entre categorías.
  - **Móvil y velocidad:** diseño *mobile-first*, imágenes ligeras, `preconnect` para Google Fonts, favicon.

## 12. Publicación

- ✅ Repositorio: <https://github.com/nataliamartinm/Late_Batch>
- ✅ Se publica en **GitHub Pages** del modo más sencillo, sin GitHub Actions: *Settings → Pages → Deploy from a branch → `main` / `/docs`*.
- ✅ URL pública: **<https://nataliamartinm.github.io/Late_Batch/>**. Se usa en las URL canónicas, Open Graph y `sitemap.xml`.
- ✅ Todas las rutas internas son relativas (sin `/` inicial), porque la web se sirve desde la subruta `/Late_Batch/`.
- ✅ Archivo `.nojekyll` en `docs/` para que GitHub publique los archivos tal cual, sin procesarlos.

## 13. Recursos disponibles

- `assets/late-batch-website/` — prototipo base (Home, About us, Shop con bolsa)
- `assets/late-batch-design-system/` — tokens, componentes, logos y fotografías
- `assets/Fonts/` — Montserrat, Pagkaki
- `assets/Others/` — PDF de marca y captura de referencia

## 14. Preguntas abiertas

Ninguna. Especificación cerrada.

## 15. Historial de cambios

| Fecha | Versión | Cambio |
| --- | --- | --- |
| 2026-10-25 | 0.1 | Creación del documento con la información existente |
| 2026-10-25 | 0.2 | Responsive/móvil, web 100 % estática con HTML+CSS+JS, simulación realista |
| 2026-10-25 | 0.3 | Definidas las tres páginas (Home, About us, Shop) y el catálogo por categorías |
| 2026-10-25 | 0.4 | Añadida la página de detalle de producto |
| 2026-10-25 | 0.5 | Confirmado: web 100 % en inglés |
| 2026-10-25 | 0.6 | Preguntas abiertas reorganizadas con recomendaciones |
| 2026-10-25 | 0.7 | Resueltas las preguntas abiertas: prototipo como base, precios, checkout, extras de realismo, GitHub Pages, SEO y documento `SEO.md` |
| 2026-10-25 | 1.0 | Repositorio y URL pública, publicación desde `docs/`, entrega hoy. Especificación cerrada |
