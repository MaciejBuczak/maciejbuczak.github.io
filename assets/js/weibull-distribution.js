document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('weibull-container');
  if (!container) return;

  // Parametry
  let shape = 2.5;
  let scale = 1.5;
  let isAnimating = true;

  // Funkcja gęstości prawdopodobieństwa rozkładu Weibulla
  const weibullPDF = (x, shape, scale) => {
    if (x <= 0) return 0;
    const term1 = shape / scale;
    const term2 = Math.pow(x / scale, shape - 1);
    const term3 = Math.exp(-Math.pow(x / scale, shape));
    return term1 * term2 * term3;
  };

  // Ustawienia wykresu
  const margin = { top: 40, right: 40, bottom: 60, left: 60 };
  const width = 700 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // Stworzenie SVG
  const svg = d3.select(container)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Aktualizacja wykresu
  function updateChart() {
    // Usunięcie poprzedniego wykresu
    svg.selectAll("*").remove();

    // Określenie zakresu x
    const maxX = Math.max(10, scale * 5);
    const xScale = d3.scaleLinear()
      .domain([0, maxX])
      .range([0, width]);

    // Generowanie danych dla wykresu
    const data = [];
    const numPoints = 200;
    const step = maxX / numPoints;
    
    for (let i = 0; i <= numPoints; i++) {
      const x = i * step;
      const y = weibullPDF(x, shape, scale);
      data.push({ x, y });
    }

    // Określenie zakresu y
    const maxY = d3.max(data, d => d.y) * 1.1;
    const yScale = d3.scaleLinear()
      .domain([0, maxY])
      .range([height, 0]);

    // Generowanie funkcji linii
    const line = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveBasis);

    // Dodanie osi x
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .style("color", "#737373");

    // Stylizacja osi x
    svg.select(".x-axis")
      .append("text")
      .attr("x", width / 2)
      .attr("y", 40)
      .attr("fill", "#737373")
      .attr("text-anchor", "middle")
      .text("Wartość");

    // Dodanie osi y
    svg.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale))
      .style("color", "#737373");

    // Stylizacja osi y
    svg.select(".y-axis")
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -height / 2)
      .attr("fill", "#737373")
      .attr("text-anchor", "middle")
      .text("Gęstość prawdopodobieństwa");

    // Dodanie tytułu
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", -15)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("fill", "#a85903")
      .text("Rozkład Weibulla");

    // Dodanie podtytułu z parametrami
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 10)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#737373")
      .text(`kształt = ${shape}, skala = ${scale}`);

    // Obszar pod wykresem
    const area = d3.area()
      .x(d => xScale(d.x))
      .y0(height)
      .y1(d => yScale(d.y))
      .curve(d3.curveBasis);

    // Gradient dla obszaru pod wykresem
    const gradient = svg.append("defs")
      .append("linearGradient")
      .attr("id", "area-gradient")
      .attr("x1", "0%").attr("y1", "0%")
      .attr("x2", "0%").attr("y2", "100%");

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#a85903")
      .attr("stop-opacity", 0.7);

    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#a85903")
      .attr("stop-opacity", 0.1);

    // Ścieżka dla obszaru pod wykresem
    const areaPath = svg.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("fill", "url(#area-gradient)")
      .attr("opacity", isAnimating ? 0 : 1)
      .attr("d", area);

    // Ścieżka dla linii wykresu
    const path = svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "#a85903")
      .attr("stroke-width", 3)
      .attr("d", line);

    // Animacja rysowania linii
    if (isAnimating) {
      const pathLength = path.node().getTotalLength();

      path.attr("stroke-dasharray", pathLength)
        .attr("stroke-dashoffset", pathLength)
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);

      areaPath.transition()
        .delay(1000)
        .duration(1000)
        .attr("opacity", 1);
    }

    // Dodanie pionowej linii do śledzenia
    const tracker = svg.append("g")
      .attr("class", "tracker")
      .style("display", "none");

    tracker.append("line")
      .attr("class", "tracker-line")
      .attr("y1", 0)
      .attr("y2", height)
      .attr("stroke", "#737373")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "5,5");

    tracker.append("circle")
      .attr("class", "tracker-circle")
      .attr("r", 5)
      .attr("fill", "#a85903");

    tracker.append("text")
      .attr("class", "tracker-text")
      .attr("text-anchor", "middle")
      .attr("fill", "#737373")
      .attr("y", -10);

    // Interakcja z wykresem
    svg.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("mousemove", function(event) {
        const mouseX = d3.pointer(event)[0];
        const x0 = xScale.invert(mouseX);
        const y0 = weibullPDF(x0, shape, scale);

        tracker.style("display", null);
        tracker.attr("transform", `translate(${mouseX},0)`);
        tracker.select("circle").attr("cy", yScale(y0));
        tracker.select("text")
          .attr("y", yScale(y0) - 15)
          .text(`(${x0.toFixed(2)}, ${y0.toFixed(4)})`);
      })
      .on("mouseout", function() {
        tracker.style("display", "none");
      });

    // Wartość oczekiwana i mediana
    const expectedValue = scale * Math.exp(Math.log(1 + 1/shape));
    const median = scale * Math.pow(Math.log(2), 1/shape);

    // Dodanie linii dla wartości oczekiwanej
    svg.append("line")
      .attr("x1", xScale(expectedValue))
      .attr("x2", xScale(expectedValue))
      .attr("y1", height)
      .attr("y2", yScale(weibullPDF(expectedValue, shape, scale)))
      .attr("stroke", "#bf6604")
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "5,5");

    svg.append("text")
      .attr("x", xScale(expectedValue))
      .attr("y", height + 20)
      .attr("text-anchor", "middle")
      .attr("fill", "#bf6604")
      .attr("font-size", "12px")
      .text("E(X)");

    // Dodanie linii dla mediany
    svg.append("line")
      .attr("x1", xScale(median))
      .attr("x2", xScale(median))
      .attr("y1", height)
      .attr("y2", yScale(weibullPDF(median, shape, scale)))
      .attr("stroke", "#d17a1b")
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "3,3");

    svg.append("text")
      .attr("x", xScale(median))
      .attr("y", height + 35)
      .attr("text-anchor", "middle")
      .attr("fill", "#d17a1b")
      .attr("font-size", "12px")
      .text("Mediana");
  }

  // Aktualizacja parametrów i restart animacji
  function updateParams(newShape, newScale) {
    shape = newShape;
    scale = newScale;
    isAnimating = true;
    updateChart();
  }

  // Dodanie kontrolek
  const controls = d3.select(container)
    .append("div")
    .attr("class", "weibull-controls");
  
  // Nagłówek kontrolek
  controls.append("div")
    .attr("class", "control-header")
    .text("Dostosuj parametry rozkładu:");
  
  // Kontrolka dla parametru kształtu
  const shapeControl = controls.append("div").attr("class", "control-group");
  shapeControl.append("label")
    .text(`Kształt (k): ${shape}`);
  
  shapeControl.append("input")
    .attr("type", "range")
    .attr("min", 0.5)
    .attr("max", 5)
    .attr("step", 0.1)
    .attr("value", shape)
    .on("input", function() {
      const newShape = parseFloat(this.value);
      shapeControl.select("label").text(`Kształt (k): ${newShape}`);
      updateParams(newShape, scale);
    });
  
  // Kontrolka dla parametru skali
  const scaleControl = controls.append("div").attr("class", "control-group");
  scaleControl.append("label")
    .text(`Skala (λ): ${scale}`);
  
  scaleControl.append("input")
    .attr("type", "range")
    .attr("min", 0.5)
    .attr("max", 5)
    .attr("step", 0.1)
    .attr("value", scale)
    .on("input", function() {
      const newScale = parseFloat(this.value);
      scaleControl.select("label").text(`Skala (λ): ${newScale}`);
      updateParams(shape, newScale);
    });
  
  // Przycisk do ponownej animacji
  controls.append("button")
    .attr("class", "animate-button")
    .text("Animuj ponownie")
    .on("click", function() {
      isAnimating = true;
      updateChart();
    });
  
  // Informacje o rozkładzie Weibulla
  const info = d3.select(container)
    .append("div")
    .attr("class", "weibull-info");
  
  info.append("h3")
    .text("Informacje o rozkładzie Weibulla");
  
  info.append("p")
    .text("Rozkład Weibulla jest często używany w analizie przeżycia, niezawodności oraz w opisie skrajnych zdarzeń. Posiada dwa parametry: kształt (k) i skalę (λ).");
  
  const list = info.append("ul");
  list.append("li").html("Gdy <strong>k = 1</strong>, rozkład Weibulla staje się rozkładem wykładniczym.");
  list.append("li").html("Gdy <strong>k ≈ 3.5</strong>, rozkład Weibulla przypomina rozkład normalny.");
  list.append("li").html("Dla <strong>k &lt; 1</strong>, funkcja gęstości ma przebieg malejący (wysoka awaryjność początkowa).");
  list.append("li").html("Dla <strong>k &gt; 1</strong>, funkcja gęstości ma najpierw przebieg rosnący, później malejący (starzenie).");

  // Inicjalizacja wykresu
  updateChart();
});
