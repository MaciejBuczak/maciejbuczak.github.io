document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('risk-correlation-heatmap');
  if (!container) return;

  // Wymiary i marginesy
  const margin = { top: 80, right: 50, bottom: 80, left: 140 },
      width = 650 - margin.left - margin.right,
      height = 650 - margin.top - margin.bottom;

  // Kategorie ryzyka
  const categories = [
    "Ryzyko kredytowe", "Ryzyko rynkowe", "Ryzyko operacyjne",
    "Ryzyko płynności", "Ryzyko modeli", "Ryzyko reputacyjne", "Ryzyko prawne"
  ];

  // Przykładowe dane korelacji (symetryczna macierz)
  const correlationData = [
    [1.00, 0.65, 0.42, 0.58, 0.72, 0.35, 0.28],
    [0.65, 1.00, 0.38, 0.52, 0.60, 0.30, 0.25],
    [0.42, 0.38, 1.00, 0.45, 0.48, 0.62, 0.55],
    [0.58, 0.52, 0.45, 1.00, 0.55, 0.42, 0.38],
    [0.72, 0.60, 0.48, 0.55, 1.00, 0.50, 0.43],
    [0.35, 0.30, 0.62, 0.42, 0.50, 1.00, 0.68],
    [0.28, 0.25, 0.55, 0.38, 0.43, 0.68, 1.00]
  ];

  // Skala kolorów w odcieniach pomarańczowych
  const colorScale = d3.scaleLinear()
    .domain([0, 0.5, 1])
    .range(["#f7f7f7", "#d9a575", "#a85903"])
    .interpolate(d3.interpolateHcl);

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
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", -40)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .style("fill", "#a85903")
    .text("Mapa korelacji ryzyk");

  // Dodanie podtytułu
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", -15)
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .style("fill", "#737373")
    .text("Współczynniki korelacji Pearsona między różnymi typami ryzyk");

  // Skale dla osi X i Y
  const x = d3.scaleBand()
    .range([0, width])
    .domain(categories)
    .padding(0.05);

  const y = d3.scaleBand()
    .range([0, height])
    .domain(categories)
    .padding(0.05);

  // Dodanie osi X
  svg.append("g")
    .attr("transform", `translate(0,0)`)
    .call(d3.axisTop(x).tickSize(0))
    .select(".domain").remove();

  // Rotacja etykiet osi X dla lepszej czytelności
  svg.selectAll(".tick text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-.5em");

  // Dodanie osi Y
  svg.append("g")
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain").remove();

  // Style osi
  svg.selectAll(".tick text")
    .style("font-size", "12px")
    .style("fill", "#737373");

  // Funkcja do tworzenia macierzy danych
  function createDataMatrix() {
    const data = [];
    for (let i = 0; i < categories.length; i++) {
      for (let j = 0; j < categories.length; j++) {
        data.push({
          x: categories[j],
          y: categories[i],
          value: correlationData[i][j]
        });
      }
    }
    return data;
  }

  // Tworzenie mapy ciepła
  const heatmapCells = svg.selectAll("rect")
    .data(createDataMatrix())
    .enter()
    .append("rect")
    .attr("x", d => x(d.x))
    .attr("y", d => y(d.y))
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .style("fill", d => colorScale(d.value))
    .style("stroke", "white")
    .style("stroke-width", 1)
    .style("opacity", 0)
    .on("mouseover", function(event, d) {
      // Podświetlenie przy najechaniu
      d3.select(this)
        .style("stroke", "#a85903")
        .style("stroke-width", 2);
      
      // Tooltip
      tooltip.style("opacity", 1)
        .html(`<strong>${d.y}</strong> i <strong>${d.x}</strong>:<br>Korelacja: <strong>${d.value.toFixed(2)}</strong>`)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 20) + "px");
    })
    .on("mouseout", function() {
      // Usunięcie podświetlenia
      d3.select(this)
        .style("stroke", "white")
        .style("stroke-width", 1);
      
      // Ukrycie tooltipu
      tooltip.style("opacity", 0);
    })
    .on("click", function(event, d) {
      // Podświetlenie całego wiersza i kolumny
      const clickedX = d.x;
      const clickedY = d.y;
      
      svg.selectAll("rect")
        .style("opacity", 0.3);
      
      svg.selectAll("rect")
        .filter(d => d.x === clickedX || d.y === clickedY)
        .style("opacity", 1)
        .style("stroke", "#d17a1b")
        .style("stroke-width", 1);
      
      // Specjalne podświetlenie dla klikniętej komórki
      d3.select(this)
        .style("stroke", "#a85903")
        .style("stroke-width", 2);
    });

  // Animowane wejście komórek
  heatmapCells.transition()
    .duration(1000)
    .delay((d, i) => i * 10)
    .style("opacity", 1);

  // Dodanie wartości do komórek
  svg.selectAll("text.cell-value")
    .data(createDataMatrix())
    .enter()
    .append("text")
    .attr("class", "cell-value")
    .attr("x", d => x(d.x) + x.bandwidth() / 2)
    .attr("y", d => y(d.y) + y.bandwidth() / 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .style("font-size", "12px")
    .style("fill", d => d.value > 0.5 ? "white" : "#737373")
    .style("opacity", 0)
    .text(d => d.value.toFixed(2))
    .transition()
    .duration(1000)
    .delay((d, i) => 500 + i * 10)
    .style("opacity", 1);

  // Tooltip
  const tooltip = d3.select("body")
    .append("div")
    .attr("class", "heatmap-tooltip")
    .style("opacity", 0);

  // Dodanie legendy
  const legendWidth = 200;
  const legendHeight = 15;
  
  const legend = svg.append("g")
    .attr("transform", `translate(${width - legendWidth},${height + 30})`);
  
  const legendScale = d3.scaleLinear()
    .domain([0, 1])
    .range([0, legendWidth]);
  
  const legendAxis = d3.axisBottom(legendScale)
    .ticks(5)
    .tickFormat(d => d.toFixed(1));
  
  legend.append("g")
    .call(legendAxis);
  
  const legendGradient = legend.append("defs")
    .append("linearGradient")
    .attr("id", "legend-gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%");
  
  legendGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#f7f7f7");
  
  legendGradient.append("stop")
    .attr("offset", "50%")
    .attr("stop-color", "#d9a575");
  
  legendGradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#a85903");
  
  legend.append("rect")
    .attr("width", legendWidth)
    .attr("height", legendHeight)
    .style("fill", "url(#legend-gradient)")
    .attr("transform", `translate(0,-${legendHeight})`);
  
  legend.append("text")
    .attr("x", 0)
    .attr("y", -legendHeight - 5)
    .style("text-anchor", "start")
    .style("font-size", "12px")
    .style("fill", "#737373")
    .text("Siła korelacji");

  // Dodanie przycisku do zmiany metody korelacji
  const button = d3.select(container)
    .append("div")
    .attr("class", "correlation-controls")
    .append("button")
    .attr("class", "correlation-button")
    .text("Zmień miarę korelacji")
    .on("click", function() {
      // Przykładowy kod zamiany między Pearson/Spearman
      const currentText = svg.select("text:nth-child(2)").text();
      if (currentText.includes("Pearsona")) {
        svg.select("text:nth-child(2)")
          .text("Współczynniki korelacji Spearmana między różnymi typami ryzyk");
        d3.select(this).text("Pokaż korelację Pearsona");
      } else {
        svg.select("text:nth-child(2)")
          .text("Współczynniki korelacji Pearsona między różnymi typami ryzyk");
        d3.select(this).text("Pokaż korelację Spearmana");
      }
      
      // Tutaj można by dodać kod do rzeczywistej zmiany danych korelacji
    });
});
