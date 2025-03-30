document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.advanced-squares-container');
  if (!container) return;
  
  const svg = container.querySelector('.squares-svg');
  const squaresGroup = svg.querySelector('.squares');
  const connectionsGroup = svg.querySelector('.connections');
  
  // Ustawienie wymiarów SVG
  const width = container.clientWidth;
  const height = container.clientHeight;
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  
  // Właściwości kwadratów
  const squareCount = 16;
  const squares = [];
  // Wszystkie kwadraty będą białe
  const activeSquares = Math.floor(squareCount / 4); // Około 1/4 kwadratów będzie aktywnych dla połączeń
  
  // Stały rozmiar kwadratu - 60px dla większej elegancji i spójności
  const squareSize = 60;
  
  // Definicje ikon statystycznych (SVG paths)
  const icons = {
    chart: "M4,4 L4,20 L20,20 M6,14 L10,10 L14,12 L18,8",
    pie: "M12,12 L12,4 A8,8 0 0,1 19,12 Z M12,12 L12,20 A8,8 0 1,1 12,4 A8,8 0 0,1 12,20",
    bar: "M6,20 L6,12 L9,12 L9,20 Z M11,20 L11,8 L14,8 L14,20 Z M16,20 L16,15 L19,15 L19,20 Z",
    scatter: "M6,6 L6,6 M10,8 L10,8 M12,12 L12,12 M8,14 L8,14 M15,10 L15,10 M16,16 L16,16 M18,11 L18,11 M9,18 L9,18 M18,6 L18,6",
    line: "M4,14 C6,9 10,17 12,12 C14,7 16,14 20,9",
    stats: "M5,20 L5,10 L9,10 L9,20 Z M11,20 L11,6 L15,6 L15,20 Z M17,20 L17,14 L21,14 L21,20 Z",
    distribution: "M7,8 L17,8 A4,4 0 0,1 21,12 A4,4 0 0,1 17,16 L7,16 A4,4 0 0,1 3,12 A4,4 0 0,1 7,8 Z",
    regression: "M4,18 L20,6 M6,7 L6,7 M10,9 L10,9 M14,11 L14,11 M17,13 L17,13 M19,15 L19,15"
  };
  
  // Teksty dla kwadratów (krótsze etykiety, max 2 słowa)
  const squareLabels = [
    'Analiza', 'Modele', 'Statystyka', 'Ryzyko', 'Predykcja', 'Regresja', 
    'Korelacja', 'Rozkład', 'Test t', 'Wariancja', 'Estymacja', 'Dane', 
    'Serie', 'Szeregi', 'Bayes', 'Przegląd', 'Monte Carlo', 'Kwantyle'
  ];
  
  // Obliczenie ile kwadratów można umieścić w rzędzie i kolumnie z odpowiednimi odstępami
  const spacing = 40; // Odstęp między kwadratami
  const rowCount = Math.floor(Math.sqrt(squareCount));
  const colCount = Math.ceil(squareCount / rowCount);
  
  // Obliczenie środkowego punktu, aby wyśrodkować siatkę kwadratów
  const gridWidth = colCount * squareSize + (colCount - 1) * spacing;
  const gridHeight = rowCount * squareSize + (rowCount - 1) * spacing;
  const startX = (width - gridWidth) / 2;
  const startY = (height - gridHeight) / 2;
  
  // Tworzenie kwadratów w uporządkowanej siatce
  for (let i = 0; i < squareCount; i++) {
    const row = Math.floor(i / colCount);
    const col = i % colCount;
    
    // Dodanie niewielkiego losowego przesunięcia dla bardziej organicznego wyglądu
    const randomOffsetX = (Math.random() - 0.5) * 30;
    const randomOffsetY = (Math.random() - 0.5) * 30;
    
    // Obliczenie pozycji
    const xPos = startX + col * (squareSize + spacing) + randomOffsetX;
    const yPos = startY + row * (squareSize + spacing) + randomOffsetY;
    
    // Losowa ikona
    const iconKeys = Object.keys(icons);
    const iconKey = iconKeys[Math.floor(Math.random() * iconKeys.length)];
    
    const isActive = i < activeSquares;
    
    const square = {
      id: `square-${i}`,
      x: xPos,
      y: yPos,
      size: squareSize,
      isActive: isActive,
      // Mniejsza prędkość dla bardziej delikatnego ruchu
      dx: (Math.random() - 0.5) * 0.15, 
      dy: (Math.random() - 0.5) * 0.15,
      icon: icons[iconKey],
      label: squareLabels[Math.floor(Math.random() * squareLabels.length)],
      connections: []
    };
    
    squares.push(square);
  }
  
  // Tworzenie połączeń między aktywnymi kwadratami a innymi kwadratami
  squares.filter(s => s.isActive).forEach(activeSquare => {
    // Połączenie z 2-3 losowymi kwadratami
    const connectionCount = Math.floor(Math.random() * 2) + 2;
    
    for (let i = 0; i < connectionCount; i++) {
      const otherSquares = squares.filter(s => s.id !== activeSquare.id && !activeSquare.connections.includes(s.id));
      if (otherSquares.length === 0) continue;
      
      const targetIdx = Math.floor(Math.random() * otherSquares.length);
      const targetSquare = otherSquares[targetIdx];
      
      activeSquare.connections.push(targetSquare.id);
      targetSquare.connections.push(activeSquare.id);
    }
  });
  
  // Renderowanie początkowego stanu
  renderSquares();
  renderConnections();
  
  // Pętla animacji
  function animate() {
    // Aktualizacja pozycji kwadratów
    squares.forEach(square => {
      square.x += square.dx;
      square.y += square.dy;
      
      // Ograniczenia, aby kwadraty nie wyszły poza kontener (z marginesem bezpieczeństwa)
      const margin = 20;
      if (square.x <= margin || square.x + square.size >= width - margin) {
        square.dx *= -1;
        // Korekta pozycji, aby uniknąć "przyklejania" do krawędzi
        square.x = Math.max(margin, Math.min(width - square.size - margin, square.x));
      }
      if (square.y <= margin || square.y + square.size >= height - margin) {
        square.dy *= -1;
        // Korekta pozycji, aby uniknąć "przyklejania" do krawędzi
        square.y = Math.max(margin, Math.min(height - square.size - margin, square.y));
      }
      
      // Bardzo rzadkie, subtelne zmiany kierunku dla naturalniejszego ruchu
      if (Math.random() < 0.001) {
        square.dx = (Math.random() - 0.5) * 0.15;
        square.dy = (Math.random() - 0.5) * 0.15;
      }
    });
    
    // Aktualizacja elementów SVG
    updateSquarePositions();
    updateConnections();
    
    requestAnimationFrame(animate);
  }
  
  // Rozpoczęcie animacji
  animate();
  
  // Obsługa zmiany rozmiaru okna
  window.addEventListener('resize', function() {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    
    svg.setAttribute('viewBox', `0 0 ${newWidth} ${newHeight}`);
    
    // Aktualizacja pozycji kwadratów, aby pasowały do nowych wymiarów
    squares.forEach(square => {
      if (square.x + square.size > newWidth) {
        square.x = newWidth - square.size;
      }
      if (square.y + square.size > newHeight) {
        square.y = newHeight - square.size;
      }
    });
    
    renderSquares();
    renderConnections();
  });
  
  // Funkcja do renderowania wszystkich kwadratów
  function renderSquares() {
    squaresGroup.innerHTML = '';
    
    squares.forEach(square => {
      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      group.setAttribute('id', square.id);
      group.setAttribute('transform', `translate(${square.x}, ${square.y})`);
      
      // Tworzenie kwadratu
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('width', square.size);
      rect.setAttribute('height', square.size);
      rect.setAttribute('rx', '3');
      rect.setAttribute('fill', square.color);
      rect.classList.add('square-element');
      
      if (square.isActive) {
        rect.classList.add('active-square');
      }
      
      group.appendChild(rect);
      
      // Dodanie ikony
      const icon = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      icon.setAttribute('d', square.icon);
      icon.setAttribute('transform', `translate(${square.size/2 - 12}, ${square.size/2 - 12}) scale(${square.size/30})`);
      icon.classList.add('square-icon');
      
      group.appendChild(icon);
      
      // Dodanie etykiety dla wszystkich kwadratów
      if (square.label) {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', square.size / 2);
        text.setAttribute('y', square.size - 8);
        text.classList.add('square-text');
        text.textContent = square.label;
        
        // Dla nieaktywnych kwadratów możemy dostosować styl tekstu
        if (!square.isActive) {
          text.setAttribute('fill', 'white'); // Biały tekst dla lepszej widoczności na kolorowym tle
          text.setAttribute('font-size', '9px'); // Nieco mniejsza czcionka
        }
        
        group.appendChild(text);
      }
      
      squaresGroup.appendChild(group);
    });
  }
  
  // Funkcja do renderowania połączeń między kwadratami
  function renderConnections() {
    connectionsGroup.innerHTML = '';
    
    const processedConnections = new Set();
    
    squares.forEach(square => {
      if (!square.isActive) return;
      
      square.connections.forEach(targetId => {
        const connectionId = [square.id, targetId].sort().join('-');
        if (processedConnections.has(connectionId)) return;
        
        processedConnections.add(connectionId);
        
        const targetSquare = squares.find(s => s.id === targetId);
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        const gradientId = Math.random() > 0.5 ? 'lineGradient1' : 'lineGradient2';
        
        line.setAttribute('x1', square.x + square.size / 2);
        line.setAttribute('y1', square.y + square.size / 2);
        line.setAttribute('x2', targetSquare.x + targetSquare.size / 2);
        line.setAttribute('y2', targetSquare.y + targetSquare.size / 2);
        line.setAttribute('stroke', `url(#${gradientId})`);
        line.classList.add('connection-line');
        
        connectionsGroup.appendChild(line);
      });
    });
  }
  
  // Funkcja do aktualizacji pozycji kwadratów podczas animacji
  function updateSquarePositions() {
    squares.forEach(square => {
      const group = document.getElementById(square.id);
      if (group) {
        group.setAttribute('transform', `translate(${square.x}, ${square.y})`);
      }
    });
  }
  
  // Funkcja do aktualizacji połączeń podczas animacji
  function updateConnections() {
    const lines = connectionsGroup.querySelectorAll('line');
    let lineIndex = 0;
    
    const processedConnections = new Set();
    
    squares.forEach(square => {
      if (!square.isActive) return;
      
      square.connections.forEach(targetId => {
        const connectionId = [square.id, targetId].sort().join('-');
        if (processedConnections.has(connectionId)) return;
        
        processedConnections.add(connectionId);
        
        const targetSquare = squares.find(s => s.id === targetId);
        const line = lines[lineIndex++];
        
        if (line) {
          line.setAttribute('x1', square.x + square.size / 2);
          line.setAttribute('y1', square.y + square.size / 2);
          line.setAttribute('x2', targetSquare.x + targetSquare.size / 2);
          line.setAttribute('y2', targetSquare.y + targetSquare.size / 2);
        }
      });
    });
  }
});
