import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./StackedBarChart.css";

const chartData1 = {
  chartName: "Visit Compliance",
  values: [
    {
      month: "Nov",
      value: 0.8,
    },
    {
      month: "Dec",
      value: 1,
    },
    {
      month: "Jan",
      value: 0.8,
    },
    {
      month: "Feb",
      value: 0.5,
    },
    {
      month: "Mar",
      value: 0.5,
    },
    {
      month: "Apr",
      value: 0.3,
    },
  ],
  displayFormat: "0.00%",
};
const chartData2 = {
  chartName: "Visit Compliance",
  values: [
    {
      month: "Nov",
      value: 0.2,
    },
    {
      month: "Dec",
      value: 0.4,
    },
    {
      month: "Jan",
      value: 0.6,
    },
    {
      month: "Feb",
      value: 0.8,
    },
    {
      month: "Mar",
      value: 1,
    },
    {
      month: "Apr",
      value: 0.5,
    },
  ],
  displayFormat: "0.00%",
};

const StackedBarChart = () => {
  let i = 0;
  const dataObj = [];
  while (chartData1.values[i]) {
    let month = chartData1.values[i].month;
    let value1 = chartData1.values[i].value || 0;
    let value2 = chartData2.values[i].value || 0;
    dataObj.push({ month, value1, value2 });
    i++;
  }

  const svgRef = useRef();

  const width = 130;
  const height = 80;

  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  useEffect(() => {
    const xScale = d3
      .scaleBand()
      .range([0, width])
      .padding(0.25)
      .domain(dataObj.map((d) => d.month));

    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(dataObj, (d) => d.value1 + d.value2) * 2]);

    const yScale2 = d3
      .scaleLinear()
      .range([40, 0])
      .domain([0, d3.max(dataObj, (d) => d.value1 + d.value2) * 1.2]);

    const svg = d3.select(svgRef.current).attr("background-color", "red");

    const stackedData = d3.stack().keys(["value1", "value2"])(dataObj);

    const color = d3.scaleOrdinal().range(["steelblue", "darkorange"]);

    const groupBars = svg.append("g").attr("class", "group-bars");
    const groupValues = svg.append("g").attr("class", "group-values");
    const groupLines = svg.append("g").attr("class", "group-lines");
    const groupPoints = svg.append("g").attr("class", "group-points");

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
      .attr("x", (d) => xScale(d.data.month))
      .attr("y", height)
      .attr("height", 0)
      .attr("width", xScale.bandwidth())
      .on("mouseover", (d) => {
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip
          .html(Math.round((d[1] - d[0]) * 100) / 100)
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 28 + "px");
      })
      .on("mouseout", (d) => {
        tooltip.transition().duration(200).style("opacity", 0);
      })
      .transition()
      .duration(1000)
      .attr("y", (d) => yScale(d[1]))
      .attr("height", (d) => yScale(d[0]) - yScale(d[1]));

    groupValues
      .selectAll("text")
      .data(dataObj)
      .enter()
      .append("text")
      .text((d) => Math.round((d.value1 + d.value2) * 100) / 100)
      .attr("x", (d) => xScale(d.month) + xScale.bandwidth() / 2)
      .attr("y", height)
      .attr("font-size", "5px")
      .attr("text-anchor", "middle")
      .attr("opacity", 0)
      .transition()
      .duration(1000)
      .attr("y", (d) => yScale(d.value1 + d.value2) - 2)
      .attr("opacity", 1);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - 7})`)
      .call(d3.axisBottom(xScale))
      .attr("font-size", "0.4rem")
      .attr("stroke-width", "0");

    const line0 = d3
      .line()
      .x((d) => xScale(d.month) + xScale.bandwidth() / 2)
      .y((d) => height)
      .curve(d3.curveCatmullRom);

    const line1 = d3
      .line()
      .x((d) => xScale(d.month) + xScale.bandwidth() / 2)
      .y((d) => yScale2(d.value1))
      .curve(d3.curveCatmullRom);

    const line2 = d3
      .line()
      .x((d) => xScale(d.month) + xScale.bandwidth() / 2)
      .y((d) => yScale2(d.value2))
      .curve(d3.curveCatmullRom);

    groupLines
      .append("path")
      .datum(dataObj)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 0.75)
      .attr("d", line0)
      .attr("shape-rendering", "geometricPrecision")
      .attr("opacity", 0)
      .transition()
      .duration(1000)
      .attr("opacity", 1)
      .attr("d", line1);

    groupLines
      .append("path")
      .datum(dataObj)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 1)
      .attr("d", line0)
      .attr("opacity", 0)
      .transition()
      .duration(1000)
      .attr("d", line2)
      .attr("opacity", 1);

    groupPoints
      .selectAll(".line-point1")
      .data(dataObj)
      .enter()
      .append("circle")
      .attr("class", "line-point1")
      .attr("cx", (d) => xScale(d.month) + xScale.bandwidth() / 2)
      .attr("cy", height)
      .attr("r", 2)
      .attr("fill", "black")
      .attr("opacity", 0)
      .transition()
      .duration(1000)
      .attr("cy", (d) => yScale2(d.value1))
      .attr("opacity", 1);

    groupPoints
      .selectAll(".line-point2")
      .data(dataObj)
      .enter()
      .append("circle")
      .attr("class", "line-point2")
      .attr("cx", (d) => xScale(d.month) + xScale.bandwidth() / 2)
      .attr("cy", height)
      .attr("r", 2)
      .attr("fill", "blue")
      .attr("opacity", 0)

      .transition()
      .duration(1000)
      .attr("cy", (d) => yScale2(d.value2))
      .attr("opacity", 1);

    svg.selectAll("path").attr("shape-rendering", "optimizeQuality");
  }, [dataObj, height, width]);

  return (
    <div className="stacked-bar-chart-container">
      <div className="single-bar-chart-kpi-label">
        Stacked Bar Chart with Line Chart
      </div>
      <svg
        ref={svgRef}
        className="single-bar-chart-svg"
        viewBox={`0 0 130 90`}
      ></svg>
    </div>
  );
};
export default StackedBarChart;
