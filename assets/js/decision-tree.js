document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('decision-tree');
  if (!container) return;

  // Wymiary i marginesy
  const margin = { top: 40, right: 120, bottom: 40, left: 120 },
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // Tworzenie SVG
  const svg = d3.select(container)
    .append("svg")
    .attr("width", "100%")
    .attr("height", height + margin.top + margin.bottom)
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Konfiguracja drzewa
  const treemap = d3.tree().size([height, width]);

  // Dane drzewa decyzyjnego
  const treeData = {
    name: "Nowy projekt",
    type: "decision",
    children: [
      {
        name: "Pełna realizacja",
        type: "chance",
        probability: 1,
        choice: true,
        children: [
          {
            name: "Sukces rynkowy",
            type: "outcome",
            probability: 0.65,
            value: 1200000,
            enpv: 0
          },
          {
            name: "Umiarkowany sukces",
            type: "outcome",
            probability: 0.25,
            value: 400000,
            enpv: 0
          },
          {
            name: "Niepowodzenie",
            type: "outcome",
            probability: 0.1,
            value: -300000,
            enpv: 0
          }
        ]
      },
      {
        name: "Realizacja etapowa",
        type: "chance",
        probability: 1,
        choice: false,
        children: [
          {
            name: "Pozytywne testy rynkowe",
            type: "decision",
            probability: 0.7,
            value: -150000,
            children: [
              {
                name: "Kontynuacja projektu",
                type: "chance",
                probability: 1,
                choice: true,
                children: [
                  {
                    name: "Sukces rynkowy",
                    type: "outcome",
                    probability: 0.8,
                    value: 800000,
                    enpv: 0
                  },
                  {
                    name: "Niepowodzenie",
                    type: "outcome",
                    probability: 0.2,
                    value: -200000,
                    enpv: 0
                  }
                ]
              },
              {
                name: "Rezygnacja z projektu",
                type: "outcome",
                probability: 1,
                value: 0,
                choice: false,
                enpv: 0
              }
            ]
          },
          {
            name: "Negatywne testy rynkowe",
            type: "outcome",
            probability: 0.3,
            value: -150000,
            enpv: 0
          }
        ]
      },
      {
        name: "Rezygnacja z projektu",
        type: "outcome",
        probability: 1,
        value: 0,
        choice: false,
        enpv: 0
      }
    ]
  };

  // Funkcja do obliczania oczekiwanej wartości (ENPV)
  function calculateENPV(node) {
    if (node.children) {
      let sum = 0;
      let maxChildENPV = -Infinity;
      
      node.children.forEach(child => {
        child.enpv = calculateENPV(child);
        
        if (node.type === "chance") {
          // Dla węzłów losowych, oczekiwana wartość to średnia ważona
          sum += child.probability * child.enpv;
        } else if (node.type === "decision") {
          // Dla węzłów decyzyjnych, wybieramy opcję o najwyższej oczekiwanej wartości
          if (child.enpv > maxChildENPV) {
            maxChildENPV = child.enpv;
            
            // Oznaczamy tę opcję jako wybraną
            node.children.forEach(c => c.choice = false);
            child.choice = true;
          }
        }
      });
      
      if (node.type === "chance") {
        return (node.value || 0) + sum;
      } else {
        return (node.value || 0) + maxChildENPV;
      }
    } else {
      return node.value || 0;
    }
  }

  // Oblicz ENPV dla całego drzewa
  treeData.enpv = calculateENPV(treeData);

  // Funkcja do formatowania wartości pieniężnych
  function formatCurrency(value) {
    const absValue = Math.abs(value);
    if (absValue >= 1000000) {
      return (value / 1000000).toFixed(2) + " mln zł";
    } else if (absValue >= 1000) {
      return (value / 1000).toFixed(0) + " tys. zł";
    } else {
      return value.toFixed(0) + " zł";
    }
  }

  // Funkcja do konwersji danych hierarchicznych do formatu d3.hierarchy
  function createHierarchy() {
    const root = d3.hierarchy(treeData);
    
    // Pozycjonowanie węzłów
    treemap(root);
    
    return root;
  }

  // Funkcje do określania kolorów węzłów
  function getNodeColor(d) {
    if (d.data.type === "decision") {
      return "#a85903"; // Pomarańczowy dla węzłów decyzyjnych
    } else if (d.data.type === "chance") {
      return "#bf6604"; // Ciemniejszy pomarańczowy dla węzłów losowych
    } else {
      // Kolor dla węzłów końcowych zależy od wartości
      if (d.data.value > 0) {
        return "#8D8F3D"; // Zielonkawy dla dodatnich wyników
      } else if (d.data.value < 0) {
        return "#B44D2C"; // Czerwonawy dla ujemnych wyników
      } else {
        return "#737373"; // Szary dla neutralnych wyników
      }
    }
  }

  // Funkcja do określania typu węzła (kształt)
  function getNodeSymbol(type) {
    if (type === "decision") {
      return d3.symbol().type(d3.symbolSquare).size(400);
    } else if (type === "chance") {
      return d3.symbol().type(d3.symbolCircle).size(400);
    } else {
      return d3.symbol().type(d3.symbolTriangle).size(350);
    }
  }

  // Animowane renderowanie drzewa
  function renderTree() {
    const root = createHierarchy();
    
    // Linki między węzłami
    const links = svg.selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x))
      .attr("fill", "none")
      .attr("stroke", d => d.target.data.choice ? "#a85903" : "#737373")
      .attr("stroke-width", d => d.target.data.choice ? 2 : 1)
      .attr("stroke-dasharray", d => d.target.data.type === "chance" ? "5,5" : "none")
      .attr("opacity", 0);
    
    // Animacja linków
    links.transition()
      .duration(800)
      .delay((d, i) => i * 100)
      .attr("opacity", 1);
    
    // Węzły
    const nodes = svg.selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.y},${d.x})`)
      .attr("opacity", 0);
    
    // Animacja węzłów
    nodes.transition()
      .duration(800)
      .delay((d, i) => 300 + i * 100)
      .attr("opacity", 1);
    
    // Symbole węzłów
    nodes.append("path")
      .attr("d", d => getNodeSymbol(d.data.type)())
      .attr("fill", d => getNodeColor(d))
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 1)
      .style("cursor", "pointer")
      .on("click", function(event, d) {
        if (d.data.type === "decision") {
          // Resetujemy wybory dla wszystkich dzieci
          d.data.children.forEach(child => child.choice = false);
          
          // Ustawiamy wybór dla klikniętego dziecka
          d.data.children.find(child => child.name === d.data.name).choice = true;
          
          // Przeliczamy ENPV
          treeData.enpv = calculateENPV(treeData);
          
          // Aktualizujemy drzewo
          updateTree();
        }
      });
    
    // Etykiety węzłów
    nodes.append("text")
      .attr("dy", -20)
      .attr("x", d => d.children ? -10 : 10)
      .attr("text-anchor", d => d.children ? "end" : "start")
      .text(d => d.data.name)
      .style("font-size", "12px")
      .style("fill", "#737373");
    
    // Wartości oczekiwane
    nodes.append("text")
      .attr("dy", 20)
      .attr("x", d => d.children ? -10 : 10)
      .attr("text-anchor", d => d.children ? "end" : "start")
      .text(d => "ENPV: " + formatCurrency(d.data.enpv))
      .style("font-size", "11px")
      .style("font-weight", "bold")
      .style("fill", d => d.data.enpv >= 0 ? "#8D8F3D" : "#B44D2C");
    
    // Dodatkowe informacje dla węzłów
    nodes.append("text")
      .attr("dy", 35)
      .attr("x", d => d.children ? -10 : 10)
      .attr("text-anchor", d => d.children ? "end" : "start")
      .text(d => {
        if (d.data.type === "chance") {
          return "Prawdop.: " + (d.data.probability * 100).toFixed(0) + "%";
        } else if (d.data.type === "outcome") {
          if (d.data.value !== 0) {
            return "Wartość: " + formatCurrency(d.data.value);
          }
        }
        return "";
      })
      .style("font-size", "10px")
      .style("fill", "#737373");
    
    // Dodanie legendy
    addLegend();
  }

  // Funkcja do aktualizacji drzewa po zmianie wyborów
  function updateTree() {
    const root = createHierarchy();
    
    // Aktualizacja linków
    svg.selectAll(".link")
      .data(root.links())
      .transition()
      .duration(500)
      .attr("stroke", d => d.target.data.choice ? "#a85903" : "#737373")
      .attr("stroke-width", d => d.target.data.choice ? 2 : 1);
    
    // Aktualizacja węzłów
    const nodes = svg.selectAll(".node")
      .data(root.descendants());
    
    // Aktualizacja wartości ENPV
    nodes.select("text:nth-child(3)")
      .transition()
      .duration(500)
      .text(d => "ENPV: " + formatCurrency(d.data.enpv))
      .style("fill", d => d.data.enpv >= 0 ? "#8D8F3D" : "#B44D2C");
  }

  // Funkcja dodająca legendę
  function addLegend() {
    const legend = svg.append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${width - 150}, 0)`);
    
    // Tytuł legendy
    legend.append("text")
      .attr("x", 0)
      .attr("y", 0)
      .text("Legenda")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "#a85903");
    
    // Węzeł decyzyjny
    legend.append("path")
      .attr("transform", "translate(10, 25)")
      .attr("d", getNodeSymbol("decision")())
      .attr("fill", "#a85903");
    
    legend.append("text")
      .attr("x", 25)
      .attr("y", 28)
      .text("Decyzja")
      .style("font-size", "11px")
      .style("fill", "#737373");
    
    // Węzeł losowy
    legend.append("path")
      .attr("transform", "translate(10, 50)")
      .attr("d", getNodeSymbol("chance")())
      .attr("fill", "#bf6604");
    
    legend.append("text")
      .attr("x", 25)
      .attr("y", 53)
      .text("Zdarzenie losowe")
      .style("font-size", "11px")
      .style("fill", "#737373");
    
    // Węzeł końcowy
    legend.append("path")
      .attr("transform", "translate(10, 75)")
      .attr("d", getNodeSymbol("outcome")())
      .attr("fill", "#8D8F3D");
    
    legend.append("text")
      .attr("x", 25)
      .attr("y", 78)
      .text("Wynik")
      .style("font-size", "11px")
      .style("fill", "#737373");
    
    // Linia preferowanej ścieżki
    legend.append("line")
      .attr("x1", 0)
      .attr("y1", 95)
      .attr("x2", 20)
      .attr("y2", 95)
      .attr("stroke", "#a85903")
      .attr("stroke-width", 2);
    
    legend.append("text")
      .attr("x", 25)
      .attr("y", 98)
      .text("Preferowana ścieżka")
      .style("font-size", "11px")
      .style("fill", "#737373");
  }

  // Dodanie informacji o drzewie decyzyjnym
  function addInfo() {
    const info = d3.select(container)
      .append("div")
      .attr("class", "decision-tree-info");
    
    info.append("h3")
      .text("Drzewo decyzyjne w zarządzaniu ryzykiem");
    
    info.append("p")
      .html("Drzewa decyzyjne to potężne narzędzie do analizy decyzji w warunkach niepewności. " +
            "Pozwalają na wizualizację możliwych ścieżek postępowania, uwzględniając prawdopodobieństwa różnych zdarzeń " +
            "i oczekiwane wartości wyników.");
    
    const list = info.append("ul");
    list.append("li").html("<strong>Węzły decyzyjne</strong> (kwadraty) reprezentują punkty wyboru, w których decydent może wybrać jedną z kilku opcji.");
    list.append("li").html("<strong>Węzły losowe</strong> (koła) reprezentują zdarzenia niepewne, z określonymi prawdopodobieństwami wystąpienia.");
    list.append("li").html("<strong>Węzły końcowe</strong> (trójkąty) pokazują możliwe wyniki z ich wartościami.");
    list.append("li").html("<strong>ENPV</strong> (Expected Net Present Value) to oczekiwana wartość bieżąca netto, uwzględniająca prawdopodobieństwa zdarzeń.");
    
    info.append("p")
      .html("<strong>Interakcja:</strong> W tym interaktywnym drzewie możesz kliknąć na węzły decyzyjne, aby sprawdzić różne ścieżki decyzji i ich wpływ na oczekiwaną wartość projektu.");
  }

  // Dodanie kontrolek
  function addControls() {
    const controls = d3.select(container)
      .append("div")
      .attr("class", "decision-tree-controls");
    
    controls.append("button")
      .attr("class", "reset-button")
      .text("Zresetuj drzewo")
      .on("click", function() {
        // Resetowanie drzewa do stanu początkowego
        resetTreeChoices(treeData);
        treeData.enpv = calculateENPV(treeData);
        updateTree();
      });
  }

  // Funkcja do resetowania wyborów w drzewie
  function resetTreeChoices(node) {
    if (node.children) {
      node.children.forEach(child => {
        resetTreeChoices(child);
        
        // Ustawienia domyślnych wyborów
        if (node.type === "decision") {
          if (child.name === "Pełna realizacja" || child.name === "Kontynuacja projektu") {
            child.choice = true;
          } else {
            child.choice = false;
          }
        }
      });
    }
  }

  // Inicjalizacja wizualizacji
  function initialize() {
    addControls();
    renderTree();
    addInfo();
  }

  // Uruchomienie inicjalizacji
  initialize();
});
