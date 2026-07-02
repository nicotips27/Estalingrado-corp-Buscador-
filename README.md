# Estalingrado Corp | Intranet PRO

![Status](https://img.shields.io/badge/status-PRODUCTION-green)
![Version](https://img.shields.io/badge/version-3.0-blue)
![License](https://img.shields.io/badge/license-INTERNAL-red)

> Sistema de búsqueda y dashboard corporativo integrado con estética Aurora Cyber. Opera 100% en el navegador sin backend.

---

## Descripción

Estalingrado Corp Intranet PRO es una interfaz de búsqueda y dashboard profesional que combina múltiples motores de búsqueda, herramientas de privacidad y widgets informativos en una experiencia visual cyber/aurora con glassmorphism.

---

## Características Principales

### Búsqueda Multimotor
Consulta simultánea a 18 motores de búsqueda:
- Google, Bing, Yahoo, DuckDuckGo, Yandex, Brave
- Baidu, Startpage, Ecosia, SearXNG, Mojeek
- Gibiru, Swisscows, Ask.com, AOL, Naver, Sogou
- Wikipedia, Internet Archive

### Tarjetas Inteligentes (APIs Integradas)
| API | Uso |
|-----|-----|
| DuckDuckGo | Información rápida |
| Wikipedia REST | Resúmenes de artículos |
| Open-Meteo | Clima actual |
| Nominatim | Geocodificación + Mapas Leaflet |
| CoinGecko | Precios de criptomonedas |
| Open Library | Información de libros |
| iTunes Search | Música y podcasts |
| TVMaze | Información de series |
| GitHub API | Perfiles de usuario |
| PokeAPI | Datos de Pokémon |
| Dog CEO | Imágenes de perros |
| Internet Archive | Búsqueda histórica |
| Free Dictionary | Definiciones |
| REST Countries | Información de países |
| TheMealDB | Recetas de cocina |
| SpaceX API | Lanzamientos espaciales |
| Hacker News | Noticias tecnológicas |

### Modos de Búsqueda
- **Web** - Búsqueda estándar multimotor
- **Imágenes** - Búsqueda visual multisource
- **IA** - Acceso directo a ChatGPT, Gemini, Perplexity, DeepSeek, Claude, Copilot

### Herramientas de Privacidad
| Herramienta | Descripción |
|-------------|-------------|
| Generador de Claves | Contraseñas robustas (8-32 caracteres) |
| Auditoría de Email | Verificación de filtraciones |
| Scanner de URL | Análisis de enlaces sospechosos |
| Generador QR | Crea códigos QR al instante |
| Limpieza Digital | Borra datos locales |

### Intranet Corporativa
- EC Download - Descargas
- ECSend - Transferencia de archivos
- EC Channel - Canal multimedia
- ECnews - Centro de noticias
- EC OS - Sistema operativo web
- Big-Data - Base de datos
- Intra-net Web - Portal corporativo

---

## Instalación

### Requisitos
- Navegador moderno (Chrome, Edge, Firefox, Safari)
- Soporte ES6+, localStorage
- Web Speech API (opcional, para voz)

### Paso 1: Clonar
```bash
git clone https://github.com/nicotips27/Estalingrado-corp-Buscador-.git
cd Estalingrado-corp-Buscador-
```

### Paso 2: Abrir
Abre `index.html` en tu navegador o usa un servidor local:
```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx serve .
```

---

## Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Ctrl + K` | Enfocar barra de búsqueda |
| `Ctrl + D` | Abrir/Cerrar Dashboard |
| `Esc` | Cerrar menús / detener voz |

---

## Comandos Especiales

| Comando | Descripción |
|---------|-------------|
| `/ai [pregunta]` | Consulta inteligente simulada |
| `/traducir [texto]` | Traducción rápida |
| `clima en [ciudad]` | Reporte meteorológico |
| `definir [palabra]` | Definición de diccionario |
| `pokemon [nombre]` | Datos de Pokémon |
| `github [usuario]` | Perfil de GitHub |

---

## Estructura del Proyecto

```
Estalingrado-corp-Buscador-/
├── index.html          # Archivo principal (todo en uno)
├── README.md           # Documentación
└── js/
    └── script.js       # Script complementario
```

---

## Personalización

### Cambiar Colores
Modifica las variables CSS en `:root`:
```css
--primary: #06b6d4;    /* Cyan */
--secondary: #8b5cf6;  /* Violet */
--dark-bg: #09090b;    /* Fondo oscuro */
```

### Agregar Motores de Búsqueda
Edita `CONFIG.searchEngines`:
```javascript
searchEngines: {
    MiMotor: query => `https://mi-motor.com/search?q=${encodeURIComponent(query)}`,
}
```

### Agregar Sitios de Acceso Rápido
Añade entradas a `CONFIG.knownSites`:
```javascript
{ 
    url: "https://ejemplo.com", 
    title: "Mi Sitio", 
    icon: "fas fa-star", 
    keywords: ["ejemplo", "mi sitio"] 
}
```

---

## Compatibilidad

| Dispositivo | Soporte |
|-------------|---------|
| Desktop (Chrome/Edge/Firefox/Safari) | ✅ Completo |
| Tablet | ✅ Responsive |
| Móvil | ✅ Adaptado |

---

## Privacidad

- ✅ 100% local (localStorage)
- ✅ Sin servidores propios
- ✅ APIs públicas directas desde el navegador

---

## Enlaces Relacionados

- [EC Escritorio](https://nicotips27.github.io/EC-Escritorio/)
- [ECwebSend](https://nicotips27.github.io/ECwebSend/)
- [EC Download](https://nicotips27.github.io/ec-download/)
- [EC Channel](https://nicotips27.github.io/EC-chanel/)
- [EC OS](https://nicotips27.github.io/EC-OS/)
- [ECnews](https://nicotips27.github.io/ECnews/)

---

**Desarrollado por Estalingrado Corp** — Sistema Intranet Integrado v3.0
