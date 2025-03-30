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
  
  // Zmniejszona liczba kwadratów do 7
  const squareCount = 7;
  const squares = [];
  const activeSquares = Math.floor(squareCount / 2);
  
  // Zwiększony rozmiar kwadratu (dwa razy większe)
  const squareSize = 140;
  
  // Ikony w stylu podobnym do tych na stronie
  const icons = {
    chart: "M5,5 v14 h14 M7,14 l4,-4 l4,2 l4,-4",
    bar: "M7,19 v-8 h3 v8 z M12,19 v-12 h3 v12 z M17,19 v-5 h3 v5 z",
    test: "M5,5 h14 v3 h-14 z M5,11 h10 v3 h-10 z M5,17 h7 v3 h-7 z",
    matrix: "M6,6 h4 v4 h-4 z M14,6 h4 v4 h-4 z M6,14 h4 v4 h-4 z M14,14 h4 v4 h-4 z",
    risk: "M12,4 l0,8 l4,-4 M4,20 h16 M4,15 l4,-8 l4,4 l8,-8",
    model: "M6,4 v16 M6,12 h12 M10,6 v12 M14,8 v8 M18,10 v4",
    check: "M6,12 l4,4 l8,-8",
    stats: "M8,4 h8 v5 h-8 z M8,10 h8 v10 l-4,-4 l-4,4 z"
  };
  
  // Teksty dla kwadratów - krótkie i związane z tematyką strony
  const squareLabels = [
    'Ryzyko', 'Model', 'Analiza', 'Statystyka', 'Estymacja', 
    'Szeregi', 'Dane'
  ];
  
  // Obliczenie ile kwadratów można umieścić w rzędzie i kolumnie
  const spacing = 80;
  const rowCount = Math.ceil(Math.sqrt(squareCount));
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
    
    // Dodanie losowego przesunięcia dla bardziej organicznego wyglądu
    const randomOffsetX = (Math.random() - 0.5) * 60;
    const randomOffsetY = (Math.random() - 0.5) * 60;
    
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
      dx: (Math.random() - 0.5) * 0.08, 
      dy: (Math.random() - 0.5) * 0.08,
      icon: icons[iconKey],
      label: squareLabels[i % squareLabels.length],
      connections: []
    };
    
    squares.push(square);
  }
  
  // Tworzenie połączeń między kwadratami
  squares.filter(s => s.isActive).forEach(activeSquare => {
    const connectionCount = 2;
    
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
      
      // Ograniczenia, aby kwadraty nie wyszły poza kontener
      const margin = 30;
      if (square.x <= margin || square.x + square.size >= width - margin) {
        square.dx *= -1;
        square.x = Math.max(margin, Math.min(width - square.size - margin, square.x));
      }
      if (square.y <= margin || square.y + square.size >= height - margin) {
        square.dy *= -1;
        square.y = Math.max(margin, Math.min(height - square.size - margin, square.y));
      }
      
      // Bardzo rzadkie, subtelne zmiany kierunku
      if (Math.random() < 0.001) {
        square.dx = (Math.random() - 0.5) * 0.08;
        square.dy = (Math.random() - 0.5) * 0.08;
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
      
      // Tworzenie zewnętrznego kwadratu (obramowanie)
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('width', square.size);
      rect.setAttribute('height', square.size);
      rect.setAttribute('rx', '4');
      rect.classList.add('square-element');
      
      group.appendChild(rect);
      
      // Tworzenie kółka dla ikony
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', square.size / 2);
      circle.setAttribute('cy', square.size / 3);
      circle.setAttribute('r', 25);
      circle.classList.add('icon-circle');
      
      group.appendChild(circle);
      
      // Dodanie ikony - idealnie wycentrowanej w kółku
      const icon = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      icon.setAttribute('d', square.icon);
      // Centraowanie ikony w kółku
      icon.setAttribute('transform', `translate(${square.size/2 - 12}, ${square.size/3 - 12})`);
      icon.classList.add('square-icon');
      
      group.appendChild(icon);
      
      // Dodanie etykiety
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', square.size / 2);
      text.setAttribute('y', square.size * 0.7);
      text.classList.add('square-text');
      text.textContent = square.label;
      
      group.appendChild(text);
      
      squaresGroup.appendChild(group);
    });
  }
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
