// import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
// import rough from "https://cdn.jsdelivr.net/npm/roughjs@4.5.1/bundled/rough.esm.js";

export function drawPackedBubbleAnimated(containerSelector, dataPath) {
  const width = 500;
  const height = 400;

  const morandiPalette = {
    flavor: ['#F28CA6', '#E6B2BA', '#FFE3E3', '#FF8A8A','#F7B5CA','#EDDFE0'],
    type:   ['#F39E60', '#FFE6A9', '#FFD09B', '#FFB38E'],
    brew:   ['#C5D3E8', '#BAC5D1', '#CAD6DE','#D4F6FF'],
    origin: ['#95D2B3', '#CADABF', '#ACE1AF','#BFF6C3']
  };

  const svg = d3.select(containerSelector)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const tooltip = d3.select("#hover-info-bubble");

  d3.json(dataPath).then(data => {
    const pack = d3.pack().size([width, height]).padding(4);
    const root = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
    pack(root);

    const colorMap = {};
    const counters = {};
    root.leaves().forEach(d => {
      const cat = d.data.category;
      counters[cat] = (counters[cat] || 0);
      const palette = morandiPalette[cat] || ["#ccc"];
      colorMap[d.data.name] = palette[counters[cat] % palette.length];
      counters[cat] += 1;

      d.originalX = d.x;
      d.originalY = d.y;
    });

    const node = svg.selectAll("g")
      .data(root.leaves())
      .join("g")
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .attr("data-category", d => d.data.category)
      .attr("data-name", d => d.data.name);

    // const rc = rough.svg(svg.node());
    const rc = window.rough.svg(svg.node());

    node.each(function (d) {
      const roughCircle = rc.circle(0, 0, 2 * d.r, {
        stroke: "black",
        fill: colorMap[d.data.name],
        fillStyle: "cross-hatch",
        fillWeight: 1.5,
        hachureAngle: 60,
        hachureGap: 4
      });
      d3.select(this).node().appendChild(roughCircle);
    });

    node.append("text")
      .text(d => d.data.name)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .style("font-size", d => Math.max(10, d.r / 3) + "px")
      .style("fill", "black")
      .style("font-family", "Comic Sans MS, sans-serif")
      .style("pointer-events", "none");

    node.on("mouseover", function (event, d) {
      d3.select(this)
        .raise()
        .transition()
        .duration(300)
        .attr("transform", `translate(${d.originalX}, ${d.originalY - 10}) scale(1.15)`);

      d3.select(this).select("text")
        .transition()
        .duration(300)
        .style("font-size", Math.max(10, d.r / 2.2) + "px")
        .style("font-weight", "bold");

      tooltip
        .style("display", "block")
        .html(`
          <strong>${d.data.name}</strong><br/>
          <b>Category:</b> ${d.data.category}<br/>
          <b>Count:</b> ${d.data.value}<br/>
        `)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 20) + "px");
    })
    .on("mouseout", function (event, d) {
      d3.select(this)
        .transition()
        .duration(300)
        .attr("transform", `translate(${d.originalX}, ${d.originalY}) scale(1)`);

      d3.select(this).select("text")
        .transition()
        .duration(300)
        .style("font-size", Math.max(10, d.r / 3) + "px")
        .style("font-weight", "normal");

      tooltip.style("display", "none");
    })
    .on("click", function (event, d) {
      const keyword = encodeURIComponent(d.data.name);
      window.open(`https://www.google.com/search?q=coffee+${keyword}`, '_blank');
    });

    // Hover interaction from explanation block to dim unrelated bubbles
    d3.selectAll(".category-highlight").on("mouseover", function () {
      const category = this.dataset.category;
      svg.selectAll("g")
        .transition()
        .duration(200)
        .style("opacity", function () {
          const thisCat = this.getAttribute("data-category");
          return thisCat === category ? "1" : "0.2";
        });
    }).on("mouseout", function () {
      svg.selectAll("g")
        .transition()
        .duration(200)
        .style("opacity", "1");
    });
  });
}
