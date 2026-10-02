# SW Works Group LLC — sitio web

Sitio estático (HTML + CSS + JS, sin compilación) publicado en GitHub Pages en https://swworksgroup.com. Todo el contenido está en español.

## Reglas para editar

- **Los archivos HTML son la fuente de verdad.** No hay generador ni plantillas: cada página tiene su propia copia de la cabecera (`<nav>`), el menú móvil y el pie. Si cambias el menú, el pie, el teléfono, la dirección o el correo, hazlo en **todas** las páginas (`index.html`, `404.html` y `pages/*.html`): busca el texto con grep antes y después.
- Estilos: solo `css/global.css` (tokens de color y tipografía en `:root`). Scripts: solo `js/global.js`.
- Imágenes: formato WebP en `img/`, con `width` y `height` en la etiqueta `<img>`; `loading="lazy"` salvo la imagen principal de cada página.
- Cada página nueva necesita: `<title>` y `description` únicos, `canonical` con `https://swworksgroup.com/...`, entrada en `sitemap.xml` y enlace en el menú/pie.
- El 404 usa rutas absolutas (`/css/...`) porque se sirve desde cualquier URL.
- Mantener accesibilidad: un solo `h1` por página, `alt` en imágenes, foco visible, menú operable con teclado.

## Datos de la empresa (no inventar otros)

- Nombre: SW Works Group LLC. Sede operacional: Anaco, Edo. Anzoátegui, Venezuela.
- Teléfonos: 0282-414.5230 (oficina) y 0414-839.6308 (móvil/WhatsApp, emergencias 24/7). Correo: info@swsecuritygroups.com.
- No se muestra número de registro de la empresa.
- Equipos y cifras técnicas: ver `pages/flota.html`. No añadir cifras que no estén ahí sin confirmación del cliente.

## Pendientes conocidos

- El formulario (`pages/contacto.html`) envía a Formspree con ID `xpznwkjd`; confirmar que es el ID real de la cuenta del cliente.
- 40 fotos de `pages/galeria.html` se cargan desde `swsecuritygroups.com/images/portfolio/`; conviene descargarlas a `img/` en WebP.
- El logo es de baja resolución (170×82 px); reemplazar `img/brand-mark.webp` cuando haya un original en SVG o PNG grande.

## Publicación

Cada push a la rama `main` se publica solo en GitHub Pages. Probar en local con `python3 -m http.server` y abrir http://localhost:8000.
