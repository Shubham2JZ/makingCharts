import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./HorizontalSingleBarWithTotalValueAAAA.css";

const available = {
  chartName: "Visit Compliance",
  values: [
    {
      type: "ASM",
      value: 2,
    },
    {
      type: "TSM",
      value: 6,
    },
    {
      type: "SO",
      value: 20,
    },
  ],
  displayFormat: "0.00%",
};
const vacant = {
  chartName: "Visit Compliance",
  values: [
    {
      type: "ASM",
      value: 1,
    },
    {
      type: "TSM",
      value: 3,
    },
    {
      type: "SO",
      value: 6,
    },
  ],
  displayFormat: "0.00%",
};
const total = {
  chartName: "Visit Compliance",
  values: [
    {
      type: "ASM",
      value: 3,
    },
    {
      type: "TSM",
      value: 9,
    },
    {
      type: "SO",
      value: 26,
    },
  ],
  displayFormat: "0.00%",
};

const HorizontalSingleBarWithTotalValueAAAA = () => {
  let i = 0;
  const dataObj = [];
  while (available.values[i]) {
    let type = available.values[i].type;
    let value1 = available.values[i].value || 0;
    let value2 = vacant.values[i].value || 0;
    dataObj.push({ type, value1, value2 });
    i++;
  }

  const svgRef = useRef();

  const width = 130;
  const height = 50;

  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  useEffect(() => {
    const xScale = d3
      .scaleLinear()
      .range([0, width - 25])
      .domain([0, d3.max(dataObj, (d) => d.value1 + d.value2) * 1.2]);

    const yScale = d3
      .scaleBand()
      .range([height, 0])
      .padding(0.25)
      .domain(dataObj.map((d) => d.type));

    const svg = d3.select(svgRef.current).attr("background-color", "red");

    const stackedData = d3.stack().keys(["value1", "value2"])(dataObj);

    const color = d3.scaleOrdinal().range(["steelblue", "darkorange"]);

    const groupBars = svg.append("g").attr("class", "group-bars");
    const groupValues = svg.append("g").attr("class", "group-values");

    groupBars
      .selectAll(".bar")
      .data(stackedData)
      .enter()
      .append("g")
      .attr("fill", (d) => color(d.key))
      .selectAll("rect")
      .data((d) => d)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d[0]) + 20)
      .attr("y", (d) => yScale(d.data.type))
      .attr("height", yScale.bandwidth())
      .attr("width", (d) => xScale(d[1]) - xScale(d[0]))
      .on("mouseover", (d) => {
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip
          .html(Math.round((d[1] - d[0]) * 100) / 100)
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 28 + "px");
      })
      .on("mouseout", (d) => {
        tooltip.transition().duration(200).style("opacity", 0);
      });

    groupValues
      .selectAll("text")
      .data(dataObj)
      .enter()
      .append("text")
      .text((d) => Math.round((d.value1 + d.value2) * 100) / 100)
      .attr("y", (d) => yScale(d.type) + yScale.bandwidth() / 2)
      .attr("x", (d) => xScale(d.value1 + d.value2) + 25)
      .attr("font-size", "3px")
      .attr("text-anchor", "middle");

    svg
      .append("g")
      .attr("transform", `translate(25, 0)`)
      .call(d3.axisLeft(yScale))
      .attr("font-size", "0.4rem")
      .attr("stroke-width", "0");
  }, [dataObj, height, width]);

  return (
    <div className="stacked-bar-chart-horizontal-container">
      <div className="stacked-bar-chart-horizontal-label">
        Stacked Bar Chart Horizontal
      </div>
      <svg
        ref={svgRef}
        className="single-bar-chart-svg"
        viewBox={`0 0 130 50`}
      ></svg>
    </div>
  );
};
export default HorizontalSingleBarWithTotalValueAAAA;
