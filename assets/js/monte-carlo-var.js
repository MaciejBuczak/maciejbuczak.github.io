document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('monte-carlo-var');
  if (!container) return;

  // Parametry symulacji
  let params = {
    initialValue: 100000,   // Początkowa wartość portfela
    meanReturn: 0.05,       // Średni zwrot roczny (5%)
    volatility: 0.15,       // Zmienność roczna (15%)
    horizon: 20,            // Horyzont czasowy (dni)
    simulations: 5000,      // Liczba symulacji
    confidenceLevel: 0.95   // Poziom ufności (95%)
  };

  let isAnimating = false;
  let animationFrameId = null;
  let currentSimulation = 0;
  let allReturns = [];
  let sortedReturns = [];
  let varIndex = 0;
  let varValue = 0;

  // Wymiary i marginesy
  const margin = { top: 50, right: 50, bottom: 60, left: 70 };
  const width = 700 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // Tworzenie SVG
  const svg = d3.select(container)
    .append("svg")
    .attr("width", "100%")
    .attr("height", height + margin.top + margin.bottom)
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Dodanie tytułu
  const title = svg.append("text")
    .attr("x", width / 2)
    .attr("y", -30)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .style("fill", "#a85903")
    .text("Symulacja Monte Carlo: Value at Risk (VaR)");

  // Dodanie podtytułu
  const subtitle = svg.append("text")
    .attr("x", width / 2)
    .attr("y", -10)
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .style("fill", "#737373")
    .text(`Poziom ufności: ${params.confidenceLevel * 100}%, Horyzont: ${params.horizon} dni`);

  // Dodanie osi i skal
  const x = d3.scaleLinear().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  // Oś X
  const xAxis = svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`);

  // Oś Y
  const yAxis = svg.append("g")
    .attr("class", "y-axis");

  // Etykieta osi X
  svg.append("text")
    .attr("class", "x-label")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + 40)
    .style("fill", "#737373")
    .text("Zmiana wartości portfela (%)");

  // Etykieta osi Y
  svg.append("text")
    .attr("class", "y-label")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -50)
    .style("fill", "#737373")
    .text("Liczba symulacji");

  // Funkcja do generowania normalnie rozdzielonych liczb losowych
  function randomNormal() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  // Funkcja do przeprowadzenia symulacji Monte Carlo
  function runMonteCarloSimulation(animate = false) {
    // Reset stanu
    allReturns = [];
    currentSimulation = 0;
    
    // Skalowanie parametrów do wybranego horyzontu czasowego
    const scaledMean = params.meanReturn * params.horizon / 252; // Zakładamy 252 dni handlowych w roku
    const scaledVol = params.volatility * Math.sqrt(params.horizon / 252);
    
    // Jeśli nie animujemy, przeprowadź wszystkie symulacje od razu
    if (!animate) {
      for (let i = 0; i < params.simulations; i++) {
        const randomReturn = scaledMean + scaledVol * randomNormal();
        allReturns.push(randomReturn);
      }
      
      processResults();
    } else {
      // Rozpocznij animowaną symulację
      isAnimating = true;
      currentSimulation = 0;
      animateMonteCarlo();
    }
  }

  // Funkcja do animowania symulacji Monte Carlo
  function animateMonteCarlo() {
    if (!isAnimating) return;
    
    // Skalowanie parametrów
    const scaledMean = params.meanReturn * params.horizon / 252;
    const scaledVol = params.volatility * Math.sqrt(params.horizon / 252);
    
    // Przeprowadź partię symulacji w każdej klatce animacji
    const batchSize = 50;
    for (let i = 0; i < batchSize && currentSimulation < params.simulations; i++) {
      const randomReturn = scaledMean + scaledVol * randomNormal();
      allReturns.push(randomReturn);
      currentSimulation++;
    }
    
    // Aktualizuj histogram
    updateHistogram();
    
    // Kontynuuj animację, jeśli nie ukończono wszystkich symulacji
    if (currentSimulation < params.simulations) {
      animationFrameId = requestAnimationFrame(animateMonteCarlo);
    } else {
      isAnimating = false;
      processResults(true);
    }
  }

  // Funkcja do przetwarzania wyników symulacji
  function processResults(animated = false) {
    // Sortowanie zwrotów do obliczenia VaR
    sortedReturns = [...allReturns].sort((a, b) => a - b);
    
    // Obliczenie indeksu VaR
    varIndex = Math.floor(sortedReturns.length * (1 - params.confidenceLevel));
    
    // Obliczenie VaR jako procentowej straty
    varValue = sortedReturns[varIndex];
    
    // Konwersja na wartość monetarną
    const varMoney = params.initialValue * varValue;
    
    // Aktualizacja histogramu z wyróżnionym VaR
    updateHistogram(true);
    
    // Aktualizacja wyświetlanych informacji o VaR
    updateVarInfo(varValue, varMoney);
  }

  // Funkcja do aktualizacji informacji o VaR
  function updateVarInfo(varPercentage, varMoney) {
    // Usuń poprzednie informacje
    d3.select(".var-info").remove();
    
    // Dodaj nowe informacje
    const varInfo = svg.append("g")
      .attr("class", "var-info")
      .attr("transform", `translate(${width - 300}, 20)`);
    
    varInfo.append("rect")
      .attr("width", 280)
      .attr("height", 100)
      .attr("rx", 5)
      .attr("ry", 5)
      .attr("fill", "white")
      .attr("stroke", "#a85903")
      .attr("stroke-width", 1)
      .attr("opacity", 0.9);
    
    varInfo.append("text")
      .attr("x", 10)
      .attr("y", 20)
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("fill", "#a85903")
      .text(`Value at Risk (${params.confidenceLevel * 100}%):`);
    
    varInfo.append("text")
      .attr("x", 10)
      .attr("y", 45)
      .style("font-size", "13px")
      .style("fill", "#737373")
      .text(`Procentowa zmiana: ${(varPercentage * 100).toFixed(2)}%`);
    
    varInfo.append("text")
      .attr("x", 10)
      .attr("y", 70)
      .style("font-size", "13px")
      .style("fill", "#737373")
      .text(`Wartość pieniężna: ${(varMoney).toFixed(2)} PLN`);
    
    varInfo.append("text")
      .attr("x", 10)
      .attr("y", 90)
      .style("font-size", "12px")
      .style("fill", "#737373")
      .style("font-style", "italic")
      .text(`Z ufnością ${params.confidenceLevel * 100}%, strata nie przekroczy tej wartości`);
  }

  // Funkcja do aktualizacji histogramu
  function updateHistogram(showVar = false) {
    // Utwórz histogram z danych
    const histogram = d3.histogram()
      .domain(x.domain())
      .thresholds(x.ticks(50))
      (allReturns);
    
    // Aktualizuj zakres osi Y
    y.domain([0, d3.max(histogram, d => d.length)]);
    
    // Aktualizuj osie
    xAxis.call(d3.axisBottom(x).ticks(10, "%"));
    yAxis.call(d3.axisLeft(y));
    
    // Usuń istniejące słupki
    svg.selectAll(".bar").remove();
    
    // Dodaj nowe słupki histogramu
    const bars = svg.selectAll(".bar")
      .data(histogram)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.x0))
      .attr("y", d => y(d.length))
      .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
      .attr("height", d => height - y(d.length))
      .attr("fill", d => {
        // Użyj innego koloru dla słupków reprezentujących wartości poniżej VaR
        if (showVar && d.x1 <= varValue) {
          return "#d17a1b"; // Pomarańczowy dla strat
        }
        return "#a85903"; // Standardowy kolor
      })
      .attr("opacity", 0.7);
    
    // Jeśli pokazujemy VaR, dodaj linię VaR
    if (showVar) {
      // Usuń istniejącą linię VaR
      svg.selectAll(".var-line").remove();
      
      // Dodaj linię VaR
      svg.append("line")
        .attr("class", "var-line")
        .attr("x1", x(varValue))
        .attr("x2", x(varValue))
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "#bf6604")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5");
      
      // Dodaj etykietę VaR
      svg.append("text")
        .attr("class", "var-line")
        .attr("x", x(varValue))
        .attr("y", 0)
        .attr("dx", 5)
        .attr("dy", 15)
        .style("font-size", "12px")
        .style("fill", "#bf6604")
        .text("VaR");
    }
  }

  // Inicjalizacja symulacji
  function initSimulation() {
    // Obliczenie skrajnych wartości dla osi X
    const scaledVol = params.volatility * Math.sqrt(params.horizon / 252);
    const minReturn = params.meanReturn * params.horizon / 252 - 3 * scaledVol;
    const maxReturn = params.meanReturn * params.horizon / 252 + 3 * scaledVol;
    
    // Ustawienie domeny dla osi X
    x.domain([minReturn, maxReturn]);
    
    // Ustawienie początkowej domeny dla osi Y
    y.domain([0, params.simulations / 10]);
    
    // Rysowanie osi
    xAxis.call(d3.axisBottom(x).ticks(10, "%"));
    yAxis.call(d3.axisLeft(y));
    
    // Uruchomienie symulacji
    runMonteCarloSimulation(true);
  }

  // Dodanie kontrolek
  function addControls() {
    const controls = d3.select(container)
      .append("div")
      .attr("class", "monte-carlo-controls");
    
    // Sekcja parametrów
    const paramSection = controls.append("div")
      .attr("class", "param-section");
    
    // Nagłówek
    paramSection.append("div")
      .attr("class", "control-header")
      .text("Parametry symulacji:");
    
    // Kontrolka dla poziomu ufności
    const confidenceControl = paramSection.append("div").attr("class", "control-group");
    confidenceControl.append("label")
      .text(`Poziom ufności: ${params.confidenceLevel * 100}%`);
    
    confidenceControl.append("input")
      .attr("type", "range")
      .attr("min", 0.9)
      .attr("max", 0.99)
      .attr("step", 0.01)
      .attr("value", params.confidenceLevel)
      .on("input", function() {
        params.confidenceLevel = parseFloat(this.value);
        confidenceControl.select("label").text(`Poziom ufności: ${(params.confidenceLevel * 100).toFixed(0)}%`);
        subtitle.text(`Poziom ufności: ${(params.confidenceLevel * 100).toFixed(0)}%, Horyzont: ${params.horizon} dni`);
        
        if (allReturns.length > 0) {
          processResults();
        }
      });
    
    // Kontrolka dla horyzontu czasowego
    const horizonControl = paramSection.append("div").attr("class", "control-group");
    horizonControl.append("label")
      .text(`Horyzont czasowy: ${params.horizon} dni`);
    
    horizonControl.append("input")
      .attr("type", "range")
      .attr("min", 1)
      .attr("max", 60)
      .attr("step", 1)
      .attr("value", params.horizon)
      .on("input", function() {
        params.horizon = parseInt(this.value);
        horizonControl.select("label").text(`Horyzont czasowy: ${params.horizon} dni`);
        subtitle.text(`Poziom ufności: ${(params.confidenceLevel * 100).toFixed(0)}%, Horyzont: ${params.horizon} dni`);
        
        // Resetuj symulację z nowymi parametrami
        if (isAnimating) {
          cancelAnimationFrame(animationFrameId);
          isAnimating = false;
        }
        
        initSimulation();
      });
    
    // Kontrolka dla zmienności
    const volatilityControl = paramSection.append("div").attr("class", "control-group");
    volatilityControl.append("label")
      .text(`Zmienność roczna: ${(params.volatility * 100).toFixed(0)}%`);
    
    volatilityControl.append("input")
      .attr("type", "range")
      .attr("min", 0.05)
      .attr("max", 0.5)
      .attr("step", 0.01)
      .attr("value", params.volatility)
      .on("input", function() {
        params.volatility = parseFloat(this.value);
        volatilityControl.select("label").text(`Zmienność roczna: ${(params.volatility * 100).toFixed(0)}%`);
        
        // Resetuj symulację z nowymi parametrami
        if (isAnimating) {
          cancelAnimationFrame(animationFrameId);
          isAnimating = false;
        }
        
        initSimulation();
      });
    
    // Przycisk do ponownej animacji
    const buttonSection = controls.append("div")
      .attr("class", "button-section");
    
    buttonSection.append("button")
      .attr("class", "animate-button")
      .text("Uruchom nową symulację")
      .on("click", function() {
        if (isAnimating) {
          cancelAnimationFrame(animationFrameId);
          isAnimating = false;
        }
        
        initSimulation();
      });
  }

  // Informacje o metodzie
  function addInfo() {
    const info = d3.select(container)
      .append("div")
      .attr("class", "monte-carlo-info");
    
    info.append("h3")
      .text("Value at Risk (VaR) z metodą Monte Carlo");
    
    info.append("p")
      .html("Metoda Monte Carlo pozwala oszacować Value at Risk (VaR) poprzez generowanie tysięcy losowych scenariuszy. " +
            "VaR to miara określająca maksymalną oczekiwaną stratę w danym horyzoncie czasowym z określonym poziomem ufności.");
    
    const list = info.append("ul");
    list.append("li").html("<strong>Poziom ufności</strong> określa prawdopodobieństwo, że strata nie przekroczy wartości VaR.");
    list.append("li").html("<strong>Horyzont czasowy</strong> to okres, dla którego obliczamy potencjalną stratę.");
    list.append("li").html("<strong>Zmienność roczna</strong> reprezentuje intensywność wahań cenowych aktywa w skali roku.");
  }

  // Inicjalizacja całej wizualizacji
  function initialize() {
    addControls();
    addInfo();
    initSimulation();
  }

  // Uruchom inicjalizację
  initialize();
});
