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
  const squareCount = 16; // Zwiększona liczba kwadratów
  const squares = [];
  const colors = ['#a85903', '#bf6604', '#d17a1b', '#b87942'];
  const activeSquares = Math.floor(squareCount / 4); // Około 1/4 kwadratów będzie aktywna
  
  // Definicje ikon statystycznych (SVG paths)
  const icons = {
    chart: "M3,3 L3,17 L21,17 M5,12 L9,8 L13,10 L19,5",
    pie: "M12,12 L12,5 A7,7 0 0,1 18,12 Z M12,12 L12,19 A7,7 0 1,1 12,5 A7,7 0 0,1 12,19",
    bar: "M5,17 L5,10 L8,10 L8,17 Z M11,17 L11,6 L14,6 L14,17 Z M17,17 L17,13 L20,13 L20,17 Z",
    scatter: "M5,5 L5,5 M9,7 L9,7 M12,12 L12,12 M7,14 L7,14 M15,9 L15,9 M16,15 L16,15 M19,10 L19,10 M8,18 L8,18 M18,5 L18,5",
    line: "M3,12 C5,7 9,15 12,10 C15,5 18,12 21,7",
    stats: "M4,19 L4,9 L8,9 L8,19 Z M10,19 L10,5 L14,5 L14,19 Z M16,19 L16,12 L20,12 L20,19 Z",
    distribution: "M8,6 L16,6 A4,4 0 0,1 20,10 A4,4 0 0,1 16,14 L8,14 A4,4 0 0,1 4,10 A4,4 0 0,1 8,6 Z",
    regression: "M3,18 L21,6 M5,6 L5,6 M9,8 L9,8 M12,10 L12,10 M16,12 L16,12 M19,14 L19,14"
  };
  
  // Teksty dla kwadratów (max 2 słowa)
  const squareLabels = [
    'Analiza Danych', 'Modele', 'Statystyka', 'Ryzyko', 'Predykcja', 'Regresja', 
    'Korelacja', 'Rozkład', 'Test t', 'Wariancja', 'Przedział ufności', 'Dane', 
    'Machine Learning', 'Szeregi', 'Bayes', 'Estymacja', 'Monte Carlo', 'Kwantyle',
    'Pomiar', 'Trend', 'Szum', 'Obliczenia', 'Optymalizacja', 'Klasyfikacja',
    'Wykresy', 'Seria danych'
  ];
  
  // Tworzenie kwadratów
  for (let i = 0; i < squareCount; i++) {
    const size = Math.floor(Math.random() * 30) + 25; // Bardziej jednolite rozmiary
    const isActive = i < activeSquares;
    
    // Losowe rozmieszczenie, ale z unikaniem skrajnych pozycji
    const margin = size * 0.6;
    const xPos = margin + Math.random() * (width - size - margin * 2);
    const yPos = margin + Math.random() * (height - size - margin * 2);
    
    // Losowa ikona
    const iconKeys = Object.keys(icons);
    const iconKey = iconKeys[Math.floor(Math.random() * iconKeys.length)];
    
    const square = {
      id: `square-${i}`,
      x: xPos,
      y: yPos,
      size: size,
      color: isActive ? 'white' : colors[Math.floor(Math.random() * colors.length)],
      isActive: isActive,
      dx: (Math.random() - 0.5) * 0.3, // Wolniejsza prędkość dla większej elegancji
      dy: (Math.random() - 0.5) * 0.3,
      icon: icons[iconKey],
      label: squareLabels[Math.floor(Math.random() * squareLabels.length)],
      connections: []
    };
    
    squares.push(square);
  }
  
  // Tworzenie połączeń między aktywnymi kwadratami a losowymi innymi kwadratami
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
      
      // Sprawdzanie granic z odbiciem
      if (square.x <= 0 || square.x + square.size >= width) {
        square.dx *= -1;
        // Mała korekta, aby kwadrat nie utknął na granicy
        square.x = Math.max(0, Math.min(width - square.size, square.x));
      }
      if (square.y <= 0 || square.y + square.size >= height) {
        square.dy *= -1;
        // Mała korekta, aby kwadrat nie utknął na granicy
        square.y = Math.max(0, Math.min(height - square.size, square.y));
      }
      
      // Losowe zmiany kierunku co jakiś czas (dodaje organiczności)
      if (Math.random() < 0.002) {
        square.dx = (Math.random() - 0.5) * 0.3;
        square.dy = (Math.random() - 0.5) * 0.3;
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
