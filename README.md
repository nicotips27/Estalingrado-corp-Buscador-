Estalingrado Corp | Intranet PRO
📋 Descripción
Estalingrado Corp Intranet PRO es una interfaz de búsqueda y dashboard integrada que combina múltiples motores de búsqueda, herramientas de privacidad y widgets informativos en una experiencia visual tipo "cyber/aurora". El sistema opera completamente en el lado del cliente (localStorage) y no requiere backend.

✨ Características Principales
🔍 Búsqueda Multimotor
Consulta simultánea a 10 motores de búsqueda (Google vía enlace externo, Bing, Yahoo, DuckDuckGo, Yandex, Brave, Baidu, Startpage, Wikipedia, Internet Archive)

Tarjetas enriquecidas con APIs públicas:

Wikipedia, OpenStreetMap (mapas interactivos + clima)

Open Library (libros), iTunes (música), TVMaze (series)

GitHub (perfiles), PokeAPI (Pokémon), Dog CEO (imágenes de perros)

CoinGecko (criptomonedas), SpaceX (lanzamientos)

REST Countries (información de países)

TheMealDB (recetas), Free Dictionary API

Hacker News (noticias tecnológicas)

🧠 Corrector Ortográfico Inteligente
Algoritmo de distancia de Levenshtein para sugerir correcciones ortográficas

Sugiere "¿Quizás quisiste decir...?" cuando detecta errores tipográficos

📊 Dashboard PRO
Widgets configurables: Noticias, Clima, Mercados Financieros, Historial

Persistencia de widgets en localStorage

Actualización individual de cada widget

🛡️ Herramientas de Privacidad
Herramienta	Descripción
Generador de contraseñas	Claves robustas (8-32 caracteres)
Auditoría de email	Verificación simulada de filtraciones
Escáner de URLs	Análisis básico de enlaces sospechosos
Generador QR	Crea códigos QR a partir de texto o URLs
Limpieza digital	Borra todos los datos almacenados localmente
🎤 Comandos Especiales y Voz
Búsqueda por voz (Web Speech API)

Comandos: /ai [pregunta], /traducir [texto]

Acceso directo a portales: Escribe "github", "youtube", "chatgpt", etc. → tarjeta inteligente con botón de acceso

🖥️ CLI Integrado
Terminal simulada con comandos gh search code y gh copilot suggest

🚀 Instalación y Uso
Requisitos
Navegador moderno con soporte para:

ES6+

localStorage

Web Speech API (opcional, para voz)

IntersectionObserver (implícito)

Instalación Local
Clona o descarga el repositorio:

bash
git clone https://github.com/nicotips27/ec-intranet-pro
cd ec-intranet-pro
Abre el archivo index.html en tu navegador (doble clic o servidor local).

Acceso Directo desde Otro Proyecto
html
<!-- Si tienes otro proyecto y quieres enlazar a la Intranet: -->
<a href="https://nicotips27.github.io/ec-Intra-net/">Acceso a Intranet PRO</a>
⌨️ Atajos de Teclado
Atajo	Acción
Ctrl + K	Enfocar barra de búsqueda
Ctrl + D	Abrir/Cerrar Dashboard
Esc	Cerrar menús / detener dictado por voz
🧩 Estructura del Proyecto
text
ec-intranet-pro/
├── index.html          # Archivo único (todo en uno)
├── README.md           # Este archivo
└── (sin dependencias externas - CDNs usadas)
CDNs utilizadas:

Font Awesome 6.4.0

Google Fonts (Outfit)

Leaflet (mapas, cargada dinámicamente)

🔌 APIs Integradas (Todas Públicas)
API	Uso
DuckDuckGo Instant Answer	Información rápida
Wikipedia REST	Resúmenes de artículos
Open-Meteo	Clima actual
Nominatim (OpenStreetMap)	Geocodificación
CoinGecko	Precios de criptomonedas
Open Library	Información de libros
iTunes Search	Música y podcasts
TVMaze	Información de series
GitHub API	Perfiles de usuario
PokeAPI	Datos de Pokémon
Dog CEO	Imágenes aleatorias de perros
Internet Archive	Búsqueda histórica
Free Dictionary API	Definiciones
REST Countries	Información de países
TheMealDB	Recetas de cocina
SpaceX API	Lanzamientos espaciales
Hacker News (Algolia)	Noticias tecnológicas
🎨 Personalización
Modificar Motores de Búsqueda
Edita el objeto CONFIG.searchEngines en el script:

javascript
searchEngines: {
    Google: query => `https://www.google.com/search?q=${encodeURIComponent(query)}`,
    // Agrega o elimina según necesites
}
Añadir Nuevos Sitios de Acceso Rápido
Agrega entradas a CONFIG.knownSites:

javascript
{ url: "https://ejemplo.com", title: "Mi Sitio", icon: "fas fa-star", keywords: ["ejemplo", "mi sitio"] }
Cambiar Tema/Colores
Modifica las variables CSS en :root:

css
--primary: #06b6d4;   /* Color principal (cyan) */
--secondary: #8b5cf6;  /* Color secundario (violeta) */
--dark-bg: #09090b;    /* Fondo oscuro */
📱 Compatibilidad
Dispositivo	Soporte
Desktop (Chrome/Edge/Firefox/Safari)	✅ Completo
Tablet (iPad/Android)	✅ Parcial (responsive)
Móvil	✅ Parcial (adaptado)
⚠️ Limitaciones y Notas
Las búsquedas a Google/Bing/Yahoo redirigen externamente (no se procesan localmente)

Las APIs de terceros pueden tener límites de tasa (CORS no bloquea, son públicas)

La auditoría de email y escáner de URLs son simulaciones educativas (no verifican bases de datos reales)

El reconocimiento de voz solo funciona en HTTPS o localhost (Chrome requiere contexto seguro)

🔒 Privacidad
Todo el almacenamiento es local (localStorage)

No se envían datos a servidores propios

Las consultas a APIs externas se realizan directamente desde tu navegador

📄 Licencia
Uso interno del proyecto Estalingrado Corp — Todos los derechos reservados a sus respectivos autores.

👨‍💻 Autor
Desarrollado por Estalingrado Corp — Intranet integrada para operaciones PRO.

📌 Enlaces Relacionados
EC Escritorio

ECwebSend

EC Download

EC Channel

EC OS

Nota: Este proyecto es una demostración de capacidades técnicas. Para entornos productivos reales, considera implementar backend propio y validaciones de seguridad adicionales.
