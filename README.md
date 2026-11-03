# Estalingrado Corp — sitio de recepción y soporte al cliente

Sitio público de **Estalingrado Corp** (Salta Capital, Argentina): página
principal con el banner corporativo y los canales oficiales, **subpágina de
soporte al cliente** con formulario guiado y preguntas frecuentes, y un panel
interno para administrar las solicitudes.

- **Sitio publicado:** <https://estalingradocorp.qzz.io/>
- **Subpágina de soporte:** <https://estalingradocorp.qzz.io/soporte.html>
- **Panel interno:** <https://estalingradocorp.qzz.io/admin.html> (sin enlace
  público: se entra con Ctrl/Cmd + 3 clics sobre el logo, o por acceso directo
  guardado en el celular)
- **Repositorio de la empresa:** <https://github.com/nicotips27/Estalingrado-corp-Buscador->
  (rama `main`, GitHub Pages con dominio propio `estalingradocorp.qzz.io`)

Sin frameworks, sin build, sin backend propio: HTML + CSS + JS vanilla, lo
mismo que el sitio institucional. La persistencia es Supabase (PostgreSQL) y
la seguridad está en RLS.

> El historial completo de etapas (qué se construyó, con qué criterios y qué se
> verificó) está en **[`DOCUMENTACION.md`](DOCUMENTACION.md)**. La bitácora
> cronológica por sesión está en **`bitacora.txt`**. Este README describe el
> estado **vigente** del sitio.

Fecha de esta versión: 03/11/2026.

---

## 1. Estructura del proyecto

```
index.html            Página principal: banner + banda de entrada + canales + pie
soporte.html          Subpágina de soporte: banner + pasos + formulario + preguntas frecuentes
admin.html            Panel interno de solicitudes (noindex, sin enlace público)
CNAME                 Dominio de GitHub Pages: estalingradocorp.qzz.io
robots.txt            Permite indexar index.html y soporte.html; bloquea admin.html
css/styles.css        Estilos del sitio (tokens, componentes, móvil)
css/admin.css         Estilos del panel
js/main.js            Menú móvil, reveal, fondo de orbes, acordeón FAQ, flujo del formulario
js/admin.js           Panel: login, lista, filtros, detalle, notas, exportación
js/exportacion.js     Exportación a Excel (.xlsx) sin librerías (ZIP + OOXML propios)
js/config.js          Configuración de Supabase (URL + anon key) — NO EDITAR sin autorización
assets/               favicon.jpg, logo.jpg
imagen/portada/       Banner de la página principal (Retrato corporativo… .png)
Imagenes/             Material institucional (imagen.jpg, cerebro-neuronal.png, oficina.jpg,
                      imgane subpages chica.png, Cerebro neural de neón azul.png)
supabase/             schema.sql, migracion-soporte.sql, INSTRUCCIONES.md
```

No hay dependencias de producción: solo Google Fonts (Inter + JetBrains Mono) y
Font Awesome 6.5.1 por CDN, idénticas a las del sitio institucional.

## 2. Página principal (`index.html`)

Estructura, en orden:

1. **Banner** (`section.hero`): la foto corporativa
   `imagen/portada/Retrato corporativo con implantes cibernéticos.png`
   (1535×1024) a pantalla completa (`100dvh`, `object-fit: cover`), con `alt`,
   `width`/`height`, `fetchpriority="high"` y `<link rel="preload">`. El texto
   vive en un `h1.sr-only` (lectores de pantalla y SEO).
2. **Banda de entrada al soporte** (`section#soporte`): tarjeta `.soporte-cta`
   con ícono, texto breve y botón **"Ir al soporte"** → `soporte.html`. Es el
   único acceso al soporte desde la portada; **no** lleva foto de oficinas, ni
   encabezado propio, ni descripción (todo eso vive en la subpágina).
3. **Canales oficiales** (`section#contacto`): correo de soporte, YouTube,
   Instagram, Facebook, X y Telegram.
4. **Pie**: copyright, íconos de redes y estado del sistema.

Navegación: la marca y el enlace "Inicio" apuntan al **sitio institucional**
(<https://estalingradocorp.github.io/EstalingradoCorp/index.html>) en pestaña
nueva; "Soporte" a `soporte.html`; "Contacto" a `#contacto`.

## 3. Subpágina de soporte (`soporte.html`)

Estructura, en orden:

1. **Banner** (`section.hero`): la foto
   `Imagenes/imgane subpages chica.png` a pantalla completa, con el mismo
   tratamiento que el banner principal (`fetchpriority`, `preload`, `alt`).
2. **Link "Volver a la página principal"** (`.volver`).
3. **Encabezado** de sección: label "Soporte · Al cliente", `h1` "Soporte al
   cliente" y la descripción de la sección
   (`.section__desc`: "¿Tenés una consulta, una incidencia o un reclamo?…").
4. **Pasos** (`.soporte-steps`): 01 Pedí el soporte · 02 Contanos qué pasa ·
   03 Recibí la respuesta.
5. **Canales + botón "Soporte al cliente"** (`.soporte-canales`): correo de
   soporte y el botón `data-servicio="soporte"` con
   `aria-expanded="false"` / `aria-controls="bloque-formulario"`.
6. **Formulario** (`#slot-soporte` + `#bloque-formulario`): el bloque se mueve
   dentro del slot y se despliega solo al tocar el botón. Contiene el stepper
   (`01 Servicio / 02 Datos / 03 Revisión`) y el formulario `#form-solicitud`
   (datos del cliente, motivo, producto relacionado, descripción, trampa
   anti-bot, envío con estados y botón "Nueva solicitud").
7. **Preguntas frecuentes** (`section#preguntas-frecuentes`): 7 `<details
   class="faq__item">` — qué es Estalingrado Corp, qué es IA 27 / Atenea Omega,
   qué es el Big Data (Intranet), qué otros servicios existen, cómo pedir
   soporte, si hace falta ser cliente y qué se hace con los datos. Siempre
   quedan **debajo** del formulario (desplegado o oculto).

### El botón es un interruptor

El botón "Soporte al cliente" **abre y cierra** el formulario:

- 1er toque → despliega el formulario en `#slot-soporte` (queda en el paso
  "Datos" con el motivo listo para completar), el stepper se muestra y el
  botón pasa a `aria-expanded="true"`.
- 2do toque sobre el mismo botón → **esconde** el formulario sin perder lo
  que la persona ya cargó (`cerrarFormulario()`).
- En `js/main.js`: `formularioAbierto`, `abrirFormulario()`,
  `cerrarFormulario()`, `marcarBotonesServicio()`.

### Acordeón de las preguntas frecuentes

`js/main.js` sincroniza los `<details>`: al abrir una pregunta se cierra la
anterior (`aria-expanded` en cada `.faq__trigger`), de modo que solo queda una
abierta a la vez.

## 4. Panel interno (`admin.html`)

Login con usuario de Supabase, estadísticas, lista de solicitudes, filtros
por servicio/estado/búsqueda, detalle, cambio de estado, notas internas y
exportación a Excel (`.xlsx`). No hay enlace público: el acceso es Ctrl/Cmd +
3 clics sobre el logo (en celular, acceso directo a `/admin.html`). Es
`noindex` y `robots.txt` pide que no se indexe.

## 5. Identidad visual

- Fondo `#000`; azules `#2563eb / #3b82f6 / #60a5fa / #1d4ed8`; degradado
  `.tg`; tarjetas glass; navbar fija con blur.
- Tipografía: Inter (texto) + JetBrains Mono (detalles).
- Fondo de orbes flotantes (`#fondo-particulas`): red de puntos de luz unidos
  por líneas tenues, sin aura, estático con `prefers-reduced-motion`.
- Layout: contenedores `container` y `container--narrow`; títulos con
  `.section__label`, `.section__title` y `.section__desc`.

## 6. Móvil

- Menú hamburguesa con `aria-expanded`/`aria-controls`, Escape y retorno del
  foco.
- ≤768 px: banda de entrada apilada en columna con **botón a todo el ancho**;
  bloque `.soporte-canales` en columna con botón ancho; áreas táctiles de
  44 px en `.volver`, `.contact-list__value`, `.mobile-menu__link` e íconos
  del pie; stepper en grilla de 3 columnas iguales.
- Sin scroll horizontal a 1440 / 390 / 360 px.

## 7. Supabase

- `js/config.js` contiene la URL del proyecto y la **anon key** (pública por
  diseño). La `service_role` nunca está en el frontend.
- Esquema: `supabase/schema.sql` (`solicitudes`, `admins`, trigger de
  `actualizado_en`, trigger anti-spam, RLS) y
  `supabase/migracion-soporte.sql` (columnas del servicio soporte).
- Guía paso a paso para principiantes: `supabase/INSTRUCCIONES.md`.
- Mientras `js/config.js` esté incompleto, el envío queda deshabilitado y la
  interfaz lo informa (nunca simula un envío).

## 8. Seguridad

- CSP por meta en las tres páginas: `default-src 'self'`, sin `unsafe-inline`
  en scripts, `connect-src` limitado a `https://*.supabase.co`, `object-src
  'none'`, `frame-src 'none'`, `upgrade-insecure-requests`.
- Sin claves privadas en el repositorio; el panel valida sesión y la RLS
  bloquea lectura/escritura al público.
- Honeypot (`#hp-empresa`) + límite anti-spam en la base (3 solicitudes por
  contacto cada 10 minutos).
- El texto del usuario solo se inyecta con `textContent` (nunca `innerHTML`).

## 9. Conexiones con otros sitios (no romper)

Estos enlaces son parte de la identidad del proyecto. Al tocar el HTML o el
CSS hay que comprobarlos:

| Destino | Dónde |
|---|---|
| Sitio institucional `estalingradocorp.github.io/EstalingradoCorp/index.html` | marca, "Inicio" (nav de escritorio y móvil) |
| `https://estalingradocorp.qzz.io/` | `canonical`, Open Graph y Twitter Card de `index.html` |
| `https://estalingradocorp.qzz.io/soporte.html` | `canonical`, Open Graph y Twitter Card de `soporte.html` |
| `mailto:estalingradocorpsupport@protonmail.com` | correo de soporte en `index.html` y `soporte.html` |
| YouTube `@Estalingradocorp` · Instagram `@nicotips27` · Facebook `estalingradocorp` · X `@estalingrado27` · Telegram `t.me/estalingradocorp` | sección de canales y pie de las dos páginas |
| `https://*.supabase.co` | envío de solicitudes y panel |
| `CNAME` → `estalingradocorp.qzz.io` | GitHub Pages |

Reglas: no cambiar URLs de esos destinos sin avisar, no tocar `js/config.js`
ni `CNAME` sin autorización, y **no deshabilitar ni recrear GitHub Pages**
(el sitio vivo no debe caerse).

## 10. Publicación (protocolo obligatorio)

**Nada se publica sin las dos barreras en verde.** Las herramientas viven
fuera del repositorio, en
`C:\Users\nbmn8\OneDrive\Escritorio\verificacion-web` (`PROTOCOLO.md`).

1. **Antes** de hacer push:

   ```powershell
   cd "C:\Users\nbmn8\OneDrive\Escritorio\verificacion-web\pruebas"
   node pre-publicar.js
   ```

   Debe terminar con `TODO OK` (comprobaciones de sintaxis, recursos, carga,
   estructura, `[hidden]`, flujo del soporte, FAQ, banner, layout a
   1440/390/360 px, accesibilidad y la sección **MÓVIL**). Con un fallo: **no
   publicar**.

2. **Push** a `origin` (`nicotips27/Estalingrado-corp-Buscador-`, rama
   `main`) **solo fast-forward**: nunca `--force`, nunca reescribir historia.
   La cuenta con la que se publica es `nicolabarranco27-a11y`.

3. **Después** de que GitHub Pages termine el build:

   ```powershell
   node verificar-publicado.js
   ```

   Debe imprimir `SITIO PUBLICADO: SANO`: lo que sirve el dominio es idéntico
   a la copia local y la página viva abre sin errores.

4. Registrar la sesión en `bitacora.txt` y subir la bitácora.

Reglas permanentes: **nunca tirar la página** (si un push falla, no se borra
ni se reconstruye Pages: se reintenta o se revierte el commit local), nunca
publicar con una barrera en rojo, y avisar al usuario antes de cualquier
operación que pueda afectar al sitio publicado.

## 11. Pendientes

- [x] Sitio publicado en el dominio propio con las dos barreras en verde.
- [x] Subpágina de soporte con formulario, toggle y preguntas frecuentes.
- [x] Banner con foto corporativa en ambas páginas y versión móvil.
- [x] Panel de solicitudes contra el proyecto Supabase real.
- [ ] Teléfono oficial: la empresa todavía no lo publicó (no se inventa).
- [ ] Apagar "Allow new users to sign up" en Supabase Authentication y
      re-ejecutar `supabase/schema.sql` para activar el anti-spam.
- [ ] Revisión visual humana de los últimos cambios (barrera automática +
      capturas en `verificacion-web/capturas`).
- [ ] Decide la empresa si el repo personal
      `nicolabarranco27-a11y/recepcion-estalingrado` se borra (sus Pages ya
      están despublicados).

## 12. Accesibilidad

Skip link, `aria-expanded`/`aria-controls` en menú, FAQ y botón de soporte,
`aria-current` en el stepper, foco visible, foco al primer campo inválido,
contraste alto sobre fondo negro, `prefers-reduced-motion` respetado (reveal,
orbes y transiciones).
