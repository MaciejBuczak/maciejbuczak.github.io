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
  const squareCount = 12;
  const squares = [];
  const colors = ['#a85903', '#bf6604', '#d17a1b', '#b87942'];
  const activeSquares = Math.floor(squareCount / 3); // Około 1/3 kwadratów będzie aktywna
  
  // Tworzenie kwadratów
  for (let i = 0; i < squareCount; i++) {
    const size = Math.floor(Math.random() * 40) + 20;
    const isActive = i < activeSquares;
    
    const square = {
      id: `square-${i}`,
      x: Math.random() * (width - size),
      y: Math.random() * (height - size),
      size: size,
      color: isActive ? 'white' : colors[Math.floor(Math.random() * colors.length)],
      isActive: isActive,
      dx: (Math.random() - 0.5) * 0.5, // Prędkość X
      dy: (Math.random() - 0.5) * 0.5, // Prędkość Y
      connections: []
    };
    
    squares.push(square);
  }
  
  // Tworzenie połączeń między aktywnymi kwadratami a losowymi innymi kwadratami
  squares.filter(s => s.isActive).forEach(activeSquare => {
    // Połączenie z 1-2 losowymi kwadratami
    const connectionCount = Math.floor(Math.random() * 2) + 1;
    
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
      
      // Sprawdzanie granic
      if (square.x <= 0 || square.x + square.size >= width) {
        square.dx *= -1;
      }
      if (square.y <= 0 || square.y + square.size >= height) {
        square.dy *= -1;
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
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('id', square.id);
      rect.setAttribute('x', square.x);
      rect.setAttribute('y', square.y);
      rect.setAttribute('width', square.size);
      rect.setAttribute('height', square.size);
      rect.setAttribute('rx', '2');
      rect.setAttribute('fill', square.color);
      rect.classList.add('square-element');
      
      if (square.isActive) {
        rect.classList.add('active-square');
        
        // Dodanie etykiety tekstowej dla aktywnych kwadratów
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', square.x + square.size / 2);
        text.setAttribute('y', square.y + square.size / 2);
        text.classList.add('square-text');
        text.textContent = ['Ryzyko', 'Modele', 'Badania', 'Dane'][Math.floor(Math.random() * 4)];
        
        squaresGroup.appendChild(text);
      }
      
      squaresGroup.appendChild(rect);
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
      const rect = document.getElementById(square.id);
      if (rect) {
        rect.setAttribute('x', square.x);
        rect.setAttribute('y', square.y);
        
        // Aktualizacja pozycji tekstu, jeśli to aktywny kwadrat
        if (square.isActive) {
          const text = rect.nextSibling;
          if (text) {
            text.setAttribute('x', square.x + square.size / 2);
            text.setAttribute('y', square.y + square.size / 2);
          }
        }
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
