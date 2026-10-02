# SW Works Group LLC — sitio web

Sitio corporativo de servicios a pozos petroleros y de gas (Coiled Tubing, Well Testing, Slickline, Wireline, Workover) con base en Anaco, Cuenca Oriental de Venezuela.

Publicado en **https://swworksgroup.com** mediante GitHub Pages.

## Estructura

```
index.html            Inicio
404.html              Página de error
CNAME                 Dominio personalizado para GitHub Pages
css/global.css        Sistema de diseño único
js/global.js          Menú, animaciones, formulario y galería
img/                  Fotos en WebP, logo, favicon e imagen para redes
pages/                Empresa, servicios (5), flota, facilidades, galería y contacto
sitemap.xml · robots.txt · site.webmanifest · .nojekyll
CLAUDE.md             Guía para editar el sitio con Claude Code
```

## Cómo editar

Abre el repositorio con Claude Code y pide los cambios. `CLAUDE.md` le explica las reglas del sitio. Al subir los cambios a `main`, la web se actualiza sola en uno o dos minutos.

Probar en local: `python3 -m http.server` y abrir http://localhost:8000.

## Publicación en GitHub Pages (una sola vez)

1. GitHub → **Settings → Pages** → *Build and deployment*: Source **Deploy from a branch**, rama `main`, carpeta `/ (root)` → **Save**.
2. En *Custom domain* escribe `swworksgroup.com` y guarda. Marca **Enforce HTTPS** cuando esté disponible.
3. En GoDaddy → dominio `swworksgroup.com` → **DNS**:
   - Registros **A** con nombre `@`, uno por cada IP: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (elimina el A anterior).
   - **CNAME** con nombre `www` apuntando a `cbastidasnielez.github.io`.
   - No tocar los registros MX ni TXT (correo).
4. Esperar la propagación del DNS (de 30 minutos a unas horas).

## Pendientes

Ver la sección *Pendientes conocidos* en `CLAUDE.md`.
