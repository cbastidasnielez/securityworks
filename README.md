# SW Works Group LLC — Sitio web corporativo

Sitio estático (HTML + CSS + JS, sin dependencias ni paso de compilación) para **SW Works Group LLC**, empresa de servicios a pozos petroleros y de gas con base en Anaco, Cuenca Oriental de Venezuela.

## Estructura

```
/
├── index.html                 Inicio
├── 404.html                   Página de error (GitHub Pages / Netlify la usan automáticamente)
├── css/global.css             Sistema de diseño único (todas las páginas)
├── js/global.js               Menú, animaciones, contadores, formulario y galería
├── img/                       Fotos en WebP + logo, favicon e imagen para redes (og-image.jpg)
├── pages/
│   ├── empresa.html           Quiénes somos, misión, visión, valores, área de operación
│   ├── servicios.html         Resumen de las 5 líneas de servicio
│   ├── coiled-tubing.html     ┐
│   ├── well-testing.html      │
│   ├── slickline.html         ├ Una página por servicio (SEO + conversión)
│   ├── wireline.html          │
│   ├── workover.html          ┘
│   ├── flota.html             Equipos y especificaciones técnicas
│   ├── facilidades.html       Facilidades de superficie y HSE
│   ├── galeria.html           Galería filtrable con visor
│   └── contacto.html          Formulario de solicitud + mapa
├── sitemap.xml · robots.txt · site.webmanifest · .nojekyll
```

## Qué se mejoró respecto a la v6

**Contenido y sector (well services)**
- Se crearon las 8 páginas que el menú enlazaba pero no existían (empresa, servicios, 5 servicios, facilidades): antes daban error 404.
- Terminología técnica corregida:
  - La cabina de control es marca **Jereh** (se ve en la foto del panel), no "Jerell".
  - Slickline no hace "perfilaje": ahora describe calibración, registradores de memoria, válvulas de gas lift, camisas y tapones.
  - La tarjeta de Well Testing mostraba "bombas triplex WT 1201/1202" (son equipos de bombeo): ahora muestra choke manifold, separador y quemador.
  - "Pistones 3" configuración duplex" en una bomba triplex → "Émbolos 3"".
  - SENCAMER con su nombre oficial completo.
  - La membresía IADC ya no se presenta como algo que "permite certificar equipos" (la IADC no certifica equipos de terceros).
- Se añadió la sección "Cómo trabajamos" (evaluación → programa → movilización → ejecución → reporte), que es lo que un ingeniero de operaciones de la operadora quiere ver.
- Llamadas a la acción para emergencias 24/7, botón flotante de WhatsApp y enlaces `tel:` en todos los teléfonos.

**Diseño y accesibilidad**
- Marca única **SW Works Group LLC**: en la barra y el pie se usa el símbolo SW (`img/brand-mark.webp`, fondo transparente) con el nombre en texto HTML, nítido en cualquier pantalla. `img/logo-sw-works-group.png` es el logo completo sobre blanco (Google, documentos).
- Tamaños de letra mínimos de 11–12 px (antes 9 px) y gris secundario con contraste suficiente.
- Menú desplegable navegable con teclado, menú móvil con `aria-expanded` y cierre con Esc, enlace "Saltar al contenido", foco visible y soporte de `prefers-reduced-motion`.
- Si JavaScript falla, el contenido sigue visible (las animaciones solo se activan con JS).
- Se completó la celda vacía de la galería de inicio y se quitaron las fotos duplicadas.

**Rendimiento y SEO**
- Fotos convertidas a WebP (~40 % menos peso) con `width`/`height` para evitar saltos de diseño; imagen principal precargada.
- Todo el CSS en un único archivo cacheable (antes había ~25 KB de estilos repetidos dentro de cada página).
- Etiquetas `title`/`description` únicas por página, `canonical`, Open Graph (vista previa en WhatsApp/LinkedIn), datos estructurados `LocalBusiness`, `Service` y `BreadcrumbList`, `sitemap.xml` y `robots.txt`.

**Formulario**
- Si el envío falla (o Formspree no está configurado), el usuario puede reenviar su solicitud **con un clic por WhatsApp o correo**, con los datos ya escritos. No se pierde ningún lead.
- Desde cada página de servicio, el botón "Cotizar" abre el formulario con el servicio ya seleccionado (`contacto.html?servicio=coiled-tubing`).

## Pendiente de validar por SW (importante)

Antes de publicar, confirme estos datos; no se pudieron verificar desde aquí:

1. **Formspree**: el formulario usa el ID `xpznwkjd`, que coincide con el *ejemplo* del README original. Si no es su ID real, cree el formulario en https://formspree.io y reemplace el ID en `pages/contacto.html` (`action="https://formspree.io/f/SU_ID"`). Mientras tanto, el respaldo de WhatsApp/correo sigue funcionando.
2. **Dominio**: las URL canónicas, el sitemap y Open Graph usan `https://swsecuritygroups.com`. Si el sitio se publica en otro dominio, busque y reemplace esa dirección en todos los archivos.
3. **Galería**: 40 fotos (mudanza RIG-679, simulacros, atmósferas, industria petrolera) se cargan desde `swsecuritygroups.com/images/portfolio/...`. Si ese sitio se da de baja, esas fotos desaparecen (la galería las oculta automáticamente). Recomendación: descargarlas, convertirlas a WebP y guardarlas en `img/`.
4. **Datos técnicos a confirmar**:
   - Serie del motor Detroit Diesel de las bombas (el texto original decía "Serie 65", que no corresponde a una serie de Detroit; por 600 BHP @ 2,100–2,200 rpm probablemente sea **Serie 60**). En el sitio se indica solo "Detroit Diesel".
   - "+15 años" se presenta como experiencia del equipo técnico.
   - Aplicaciones listadas en las páginas de Slickline y Wireline (son las aplicaciones típicas del servicio; ajuste según el alcance real de sus unidades).
   - Tiempos de respuesta (< 4 h local, < 24 h propuesta y movilización).

## Marca: pendiente

- **Logo en alta resolución**: el logo recibido mide 170 × 82 px. Se limpió y se ajustó para fondo oscuro, pero para máxima nitidez (pantallas retina, impresión) envíe el archivo original en **SVG, PDF o PNG de al menos 1000 px**; basta con reemplazar `img/brand-mark.webp` y `img/logo-sw-works-group.png`.
- **Datos de contacto**: se mantienen dirección en Anaco, teléfonos, correo `info@swsecuritygroups.com` y redes sociales del sitio anterior. Si SW Works Group LLC usa otro dominio, correo o redes, hay que actualizarlos (en `pages/*.html`, `index.html` y `js/global.js`).
- La foto `cabin_exterior` muestra el rótulo de la marca anterior pintado en la cabina; si no conviene, puede retirarse de la flota y la galería.
- Se eliminó el RIF de la empresa anterior. Si la LLC tiene un número de registro que deba mostrarse, se añade en el pie de página.

## Cómo publicar

- **GitHub Pages**: Settings → Pages → Source: rama `main`, carpeta `/ (root)`.
- **Netlify**: arrastrar la carpeta del repositorio al panel.
- **Hosting cPanel (Hostinger, SiteGround…)**: subir todos los archivos por FTP manteniendo las carpetas.

Para probar en local: `python3 -m http.server` en la carpeta del repositorio y abrir http://localhost:8000.

## Paleta y tipografías

| Token | Valor | Uso |
|---|---|---|
| `--black` | `#080808` | Fondo |
| `--orange` | `#FF6600` | Color de marca / seguridad |
| `--amber` | `#F5A623` | Datos técnicos |
| `--grey` | `#BDBDBD` | Texto secundario |

Google Fonts: Bebas Neue (títulos), Barlow Condensed (subtítulos), Barlow (texto), Roboto Mono (datos técnicos).
