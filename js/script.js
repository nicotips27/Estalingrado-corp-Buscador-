  <script>
    /* =========================================
       DATOS Y CONFIGURACIÓN
       ========================================= */
    const searchEngines = [
      { id: 'google', name: 'Google', icon: 'fab fa-google', url: 'https://google.com/search?q=' },
      { id: 'bing', name: 'Bing', icon: 'fab fa-microsoft', url: 'https://bing.com/search?q=' },
      { id: 'yahoo', name: 'Yahoo', icon: 'fab fa-yahoo', url: 'https://espanol.search.yahoo.com/search?p=' },
      { id: 'duckduckgo', name: 'DuckDuckGo', icon: 'fas fa-shield-alt', url: 'https://duckduckgo.com/?q=' },
      { id: 'youtube', name: 'YouTube', icon: 'fab fa-youtube', url: 'https://www.youtube.com/results?search_query=' },
      { id: 'wikipedia', name: 'Wikipedia', icon: 'fab fa-wikipedia-w', url: 'https://es.wikipedia.org/wiki/Special:Search?search=' },
      { id: 'archive', name: 'Archive.org', icon: 'fas fa-landmark', url: 'https://archive.org/search.php?query=' },
      { id: 'github', name: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/search?q=' },
      { id: 'stackoverflow', name: 'Stack Overflow', icon: 'fab fa-stack-overflow', url: 'https://stackoverflow.com/search?q=' },
      { id: 'reddit', name: 'Reddit', icon: 'fab fa-reddit', url: 'https://www.reddit.com/search/?q=' },
      { id: 'amazon', name: 'Amazon', icon: 'fab fa-amazon', url: 'https://www.amazon.com/s?k=' },
      { id: 'twitter', name: 'Twitter', icon: 'fab fa-twitter', url: 'https://twitter.com/search?q=' },
      { id: 'instagram', name: 'Instagram', icon: 'fab fa-instagram', url: 'https://www.instagram.com/explore/tags/' },
      { id: 'tiktok', name: 'TikTok', icon: 'fab fa-tiktok', url: 'https://www.tiktok.com/search?q=' },
      { id: 'spotify', name: 'Spotify', icon: 'fab fa-spotify', url: 'https://open.spotify.com/search/' },
      { id: 'netflix', name: 'Netflix', icon: 'fas fa-film', url: 'https://www.netflix.com/search?q=' },
      { id: 'maps', name: 'Google Maps', icon: 'fas fa-map-marker-alt', url: 'https://www.google.com/maps/search/' },
      { id: 'weather', name: 'Clima', icon: 'fas fa-cloud-sun', url: 'https://www.google.com/search?q=clima+' },
      { id: 'news', name: 'Noticias', icon: 'fas fa-newspaper', url: 'https://news.google.com/search?q=' },
      { id: 'images', name: 'Imágenes', icon: 'fas fa-image', url: 'https://www.google.com/search?tbm=isch&q=' }
    ];

    // SUGERENCIAS POPULARES ESTÁTICAS (Simula un backend)
    const commonSuggestions = [
      'Tumblr', 'Wix', 
      'Inteligencia Artificial', 'ChatGPT', 'Desarrollo Web', 'Javascript Tutorial',
      'El tiempo hoy', 'Noticias internacionales', 'Estalingrado Corp', 
      'Cómo programar en Python', 'Recetas fáciles', 'Resultados fútbol',
      'Precio del dólar', 'Criptomonedas', 'Películas 2025', 'Música relajante'
    ];

    let userPreferences = JSON.parse(localStorage.getItem('estalingrado_prefs')) || {};
    let recentSearches = JSON.parse(localStorage.getItem('estalingrado_recent')) || [];

    /* =========================================
       INICIALIZACIÓN
       ========================================= */
    window.addEventListener('load', () => {
      renderEngineToggles();
      setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
      }, 800);
    });

    /* =========================================
       LÓGICA DE BÚSQUEDA Y AUTOCOMPLETADO
       ========================================= */
    
    function handleSearch(e) {
      if(e) e.preventDefault();
      const input = document.getElementById('search-input');
      const query = input.value.trim();
      
      if(!query) return;

      saveSearchTerm(query);

      // Cerrar UI
      document.getElementById('menu-panel').classList.remove('open');
      document.getElementById('overlay').classList.remove('active');
      document.getElementById('suggestions-box').classList.remove('visible');
      document.querySelector('.search-wrapper').classList.remove('active');
      document.getElementById('search-input').blur();
      
      const resultsArea = document.getElementById('results-area');
      const resultsList = document.getElementById('results-list');
      
      resultsArea.style.display = 'block';
      resultsList.innerHTML = '<div style="text-align:center; padding:30px;"><i class="fas fa-circle-notch fa-spin" style="color:var(--primary); font-size:24px;"></i><p style="margin-top:10px; color:#94a3b8;">Procesando...</p></div>';

      setTimeout(() => {
        generateResults(query);
      }, 500);
    }

    // --- NUEVA LÓGICA DE SUGERENCIAS HÍBRIDA ---

    function handleInput() {
      const input = document.getElementById('search-input');
      const query = input.value.trim().toLowerCase();
      const box = document.getElementById('suggestions-box');
      const wrapper = document.querySelector('.search-wrapper');

      // 1. Si está vacío, mostrar historial puro (como antes)
      if (!query) {
        renderHistory();
        return;
      }

      // 2. Si hay texto, filtrar y combinar fuentes
      let matches = [];

      // A) Coincidencias en Historial
      const historyMatches = recentSearches.filter(s => s.toLowerCase().includes(query));
      if(historyMatches.length > 0) {
        matches.push({ type: 'header', title: 'De tu historial' });
        historyMatches.forEach(s => matches.push({ type: 'history', text: s }));
      }

      // B) Coincidencias en Motores (Ir directo al sitio)
      const engineMatches = searchEngines.filter(e => e.name.toLowerCase().includes(query));
      if(engineMatches.length > 0) {
        matches.push({ type: 'header', title: 'Motores Directos' });
        engineMatches.forEach(e => matches.push({ type: 'engine', text: e.name, url: e.url, icon: e.icon }));
      }

      // C) Sugerencias Populares
      const commonMatches = commonSuggestions.filter(s => s.toLowerCase().includes(query) && !historyMatches.includes(s));
      if(commonMatches.length > 0) {
        matches.push({ type: 'header', title: 'Sugerencias' });
        commonMatches.slice(0, 4).forEach(s => matches.push({ type: 'suggestion', text: s }));
      }

      // Renderizar resultados combinados
      if (matches.length === 0) {
        box.classList.remove('visible');
        wrapper.classList.remove('active');
        return;
      }

      let html = '';
      matches.forEach(item => {
        if(item.type === 'header') {
          html += `<div class="sugg-group-title">${item.title}</div>`;
        } else if(item.type === 'history') {
          html += `
            <div class="sugg-item" onclick="selectSuggestion('${item.text}')">
              <div style="display:flex; align-items:center;">
                <i class="fas fa-history sugg-icon" style="color:#64748b;"></i>
                <span>${highlightMatch(item.text, query)}</span>
              </div>
            </div>`;
        } else if(item.type === 'engine') {
          html += `
            <div class="sugg-item" onclick="selectEngine('${item.url}')">
              <div style="display:flex; align-items:center;">
                <i class="${item.icon} sugg-icon" style="color:var(--primary);"></i>
                <span>Ir a <strong>${item.text}</strong></span>
              </div>
            </div>`;
        } else {
          html += `
            <div class="sugg-item" onclick="selectSuggestion('${item.text}')">
              <div style="display:flex; align-items:center;">
                <i class="fas fa-search sugg-icon" style="color:#94a3b8;"></i>
                <span>${highlightMatch(item.text, query)}</span>
              </div>
            </div>`;
        }
      });

      box.innerHTML = html;
      box.classList.add('visible');
      wrapper.classList.add('active');
    }

    // Renderizado solo historial (sin filtrar)
    function renderHistory() {
      const box = document.getElementById('suggestions-box');
      const wrapper = document.querySelector('.search-wrapper');
      
      if(recentSearches.length === 0) {
        box.innerHTML = '<div class="sugg-empty">Sin historial reciente</div>';
      } else {
        let html = '<div class="sugg-group-title">BÚSQUEDAS RECIENTES</div>';
        recentSearches.forEach((term, index) => {
          html += `
            <div class="sugg-item" onclick="selectSuggestion('${term}')">
              <div style="display:flex; align-items:center;">
                <i class="fas fa-history sugg-icon" style="color:#64748b;"></i>
                <span>${term}</span>
              </div>
              <button class="del-btn" onclick="deleteSuggestion(event, ${index})" title="Borrar"><i class="fas fa-times"></i></button>
            </div>
          `;
        });
        box.innerHTML = html;
      }
      box.classList.add('visible');
      wrapper.classList.add('active');
    }

    function highlightMatch(text, query) {
      const regex = new RegExp(`(${query})`, 'gi');
      return text.replace(regex, '<span style="color:white; font-weight:bold;">$1</span>');
    }

    function selectSuggestion(term) {
      document.getElementById('search-input').value = term;
      handleSearch(null); 
    }

    function selectEngine(urlBase) {
      window.open(urlBase, '_blank');
      hideSuggestionsWithDelay();
    }

    function saveSearchTerm(term) {
      recentSearches = recentSearches.filter(item => item.toLowerCase() !== term.toLowerCase());
      recentSearches.unshift(term);
      if(recentSearches.length > 6) recentSearches.pop();
      localStorage.setItem('estalingrado_recent', JSON.stringify(recentSearches));
    }

    function deleteSuggestion(event, index) {
      event.stopPropagation();
      recentSearches.splice(index, 1);
      localStorage.setItem('estalingrado_recent', JSON.stringify(recentSearches));
      
      // Volver a renderizar historial puro
      document.getElementById('search-input').focus(); 
      renderHistory();
    }

    function hideSuggestionsWithDelay() {
      setTimeout(() => {
        document.getElementById('suggestions-box').classList.remove('visible');
        document.querySelector('.search-wrapper').classList.remove('active');
      }, 200);
    }

    /* =========================================
       GENERACIÓN DE RESULTADOS
       ========================================= */
    function generateResults(query) {
      const resultsList = document.getElementById('results-list');
      let html = '';

      // Calculadora
      if(/^[0-9+\-*/().\s]+$/.test(query) && /\d/.test(query)) {
        try {
          const calc = eval(query);
          html += `
            <div class="result-card" style="border-color:var(--success);">
              <h3><i class="fas fa-calculator"></i> Resultado</h3>
              <p style="font-size:32px; font-weight:bold; color:var(--success);">${calc}</p>
            </div>
          `;
        } catch(e){}
      }

      // Motores
      const activeEngines = searchEngines.filter(eng => userPreferences[eng.id] !== false);
      
      if(activeEngines.length === 0) {
        html += `<div class="result-card" style="text-align:center; color:#ef4444;"><h3>⚠️ Sin motores activos</h3><p>Activa buscadores en el menú lateral.</p></div>`;
      } else {
        activeEngines.forEach(eng => {
          const searchUrl = eng.url + encodeURIComponent(query);
          const domain = new URL(eng.url).hostname;
          
          html += `
            <div class="result-card" onclick="window.open('${searchUrl}', '_blank')">
              <div class="res-title"><i class="${eng.icon}" style="margin-right:8px;"></i>${eng.name}</div>
              <div class="res-domain">${domain}</div>
              <div class="res-desc">Buscar <strong>"${query}"</strong> en ${eng.name}. Click para abrir resultados.</div>
            </div>
          `;
        });
      }

      document.getElementById('active-engines-count').innerText = `${activeEngines.length} Fuentes`;
      resultsList.innerHTML = html;
    }

    /* =========================================
       UI DEL MENÚ LATERAL
       ========================================= */
    function toggleMenu() {
      const drawer = document.getElementById('menu-panel');
      const overlay = document.getElementById('overlay');
      
      if(drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        overlay.classList.remove('active');
      } else {
        drawer.classList.add('open');
        overlay.classList.add('active');
      }
    }

    function renderEngineToggles() {
      const container = document.getElementById('engines-list');
      container.innerHTML = '';
      
      searchEngines.forEach(eng => {
        const isActive = userPreferences[eng.id] !== false;
        const div = document.createElement('div');
        div.className = 'engine-toggle';
        div.innerHTML = `
          <span><i class="${eng.icon}" style="width:20px; text-align:center; margin-right:8px;"></i> ${eng.name}</span>
          <label class="switch">
            <input type="checkbox" ${isActive ? 'checked' : ''} onchange="toggleEngine('${eng.id}', this.checked)">
            <span class="slider"></span>
          </label>
        `;
        container.appendChild(div);
      });
    }

    function toggleEngine(id, status) {
      userPreferences[id] = status;
      localStorage.setItem('estalingrado_prefs', JSON.stringify(userPreferences));
    }

    function activateAllEngines() {
      searchEngines.forEach(eng => userPreferences[eng.id] = true);
      localStorage.setItem('estalingrado_prefs', JSON.stringify(userPreferences));
      renderEngineToggles();
    }

    function deactivateAllEngines() {
      searchEngines.forEach(eng => userPreferences[eng.id] = false);
      localStorage.setItem('estalingrado_prefs', JSON.stringify(userPreferences));
      renderEngineToggles();
    }

    function clearData() {
      if(confirm('¿Borrar todas las preferencias y el historial?')) {
        localStorage.removeItem('estalingrado_prefs');
        localStorage.removeItem('estalingrado_recent');
        location.reload();
      }
    }

    /* =========================================
       MODALES Y HERRAMIENTAS
       ========================================= */
    function openModal(id) {
      if(id === 'notes') {
        document.getElementById('notes-text').value = localStorage.getItem('estalingrado_notes') || '';
      }
      toggleMenu(); 
      document.getElementById('modal-' + id).classList.add('active');
    }

    function closeModals() {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    }

    function saveNotes() {
      const text = document.getElementById('notes-text').value;
      localStorage.setItem('estalingrado_notes', text);
      closeModals();
    }

    function generatePass() {
      const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
      let password = "";
      for (let i = 0; i < 16; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      document.getElementById("pass-output").innerText = password;
    }

    function copyPass() {
      const pass = document.getElementById("pass-output").innerText;
      if(pass && pass !== '...') {
        navigator.clipboard.writeText(pass);
        alert('Copiado!');
      }
    }

    let calcExpression = '';
    function calcInput(val) {
      if(val === 'C') calcExpression = '';
      else calcExpression += val;
      updateCalcDisplay();
    }
    function calcResult() {
      try {
        calcExpression = eval(calcExpression).toString();
      } catch {
        calcExpression = 'Error';
      }
      updateCalcDisplay();
    }
    function updateCalcDisplay() {
      document.getElementById('calc-screen').innerText = calcExpression || '0';
    }

    function startVoice() {
      if(!('webkitSpeechRecognition' in window)) {
        alert('Navegador no compatible');
        return;
      }
      const recognition = new webkitSpeechRecognition();
      recognition.lang = 'es-ES';
      const btn = document.getElementById('voice-btn');
      
      recognition.onstart = () => {
        btn.style.color = 'red';
        document.getElementById('search-input').placeholder = "Escuchando...";
      };
      recognition.onresult = (e) => {
        document.getElementById('search-input').value = e.results[0][0].transcript;
        handleSearch(null);
      };
      recognition.onend = () => {
        btn.style.color = '';
        document.getElementById('search-input').placeholder = "¿Qué estás buscando hoy?";
      };
      recognition.start();
    }
  </script>
</body>
</html>