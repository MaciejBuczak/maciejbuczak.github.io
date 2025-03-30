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
  const activeSquares = Math.floor(squareCount / 4); // Około 1/4 kwadratów będzie aktywnych dla połączeń
  
  // Stały rozmiar kwadratu
  const squareSize = 60;
  
  // Lepiej zdefiniowane ikony statystyczne
  const icons = {
    chart: "M5,5 v14 h14 M7,14 l4,-4 l4,2 l4,-4",
    pie: "M12,12 v-7 a7,7 0 0,1 7,7 h-7 z M12,12 v7 a7,7 0 1,1 0,-14 v7 z",
    bar: "M7,19 v-8 h3 v8 z M12,19 v-12 h3 v12 z M17,19 v-5 h3 v5 z",
    scatter: "M7,7 l1,1 M10,10 l1,1 M16,8 l1,1 M8,16 l1,1 M14,14 l1,1 M18,17 l1,1",
    line: "M5,17 C8,12 12,15 16,10 C18,7 20,13 22,8",
    stats: "M7,19 v-9 h4 v9 z M13,19 v-14 h4 v14 z M19,19 v-6 h4 v6 z",
    distribution: "M7,9 h10 a4,4 0 0,1 0,8 h-10 a4,4 0 0,1 0,-8 z",
    regression: "M5,18 l14,-12 M7,10 l2,-2 M11,12 l2,-2 M15,8 l2,-2"
  };
  
  // Teksty dla kwadratów
  const squareLabels = [
    'Analiza', 'Modele', 'Statystyka', 'Ryzyko', 'Predykcja', 'Regresja', 
    'Korelacja', 'Rozkład', 'Test t', 'Wariancja', 'Estymacja', 'Dane', 
    'Serie', 'Szeregi', 'Bayes', 'Monte Carlo'
  ];
  
  // Obliczenie ile kwadratów można umieścić w rzędzie i kolumnie
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
      rect.setAttribute('rx', '4'); // Zaokrąglone rogi
      rect.classList.add('square-element');
      
      if (square.isActive) {
        rect.classList.add('active-square');
      }
      
      group.appendChild(rect);
      
      // Dodanie ikony - umieszczenie jej w odpowiednim miejscu
      const iconGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      // Umieszczenie ikony w centrum górnej części kwadratu
      iconGroup.setAttribute('transform', `translate(${square.size/2}, ${square.size/2 - 10})`);
      
      const icon = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      icon.setAttribute('d', square.icon);
      // Centrowanie ikony
      icon.setAttribute('transform', 'translate(-12, -12)');
      icon.classList.add('square-icon');
      
      iconGroup.appendChild(icon);
      group.appendChild(iconGroup);
      
      // Dodanie etykiety
      if (square.label) {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', square.size / 2);
        text.setAttribute('y', square.size - 15); // Pozycja tekstu na dole kwadratu
        text.classList.add('square-text');
        text.textContent = square.label;
        
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
