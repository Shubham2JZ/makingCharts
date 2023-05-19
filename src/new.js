import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const HorizontalBarChart = (props) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(chartRef.current);

    const data = [
      { name: "Group A", value1: 10, value2: 20 },
      { name: "Group B", value1: 20, value2: 30 },
      { name: "Group C", value1: 30, value2: 10 },
      { name: "Group D", value1: 40, value2: 20 },
    ];

    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value1 + d.value2)])
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([margin.top, height - margin.bottom])
      .padding(0.1);

    svg
      .selectAll(".bar1")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar1")
      .attr("x", margin.left)
      .attr("y", (d) => y(d.name))
      .attr("width", (d) => x(d.value1) - margin.left)
      .attr("height", y.bandwidth())
      .attr("fill", "steelblue");

    svg
      .selectAll(".bar2")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar2")
      .attr("x", (d) => x(d.value1))
      .attr("y", (d) => y(d.name))
      .attr("width", (d) => x(d.value2) - x(d.value1))
      .attr("height", y.bandwidth())
      .attr("fill", "orange");

    // svg
    //   .selectAll(".bar3")
    //   .data(data)
    //   .enter()
    //   .append("rect")
    //   .attr("class", "bar3")
    //   .attr("x", (d) => x(0))
    //   .attr("y", (d) => y(d.name))
    //   .attr("width", (d) => x(d.value2))
    //   .attr("height", y.bandwidth())
    //   .attr("fill", "rgba(0,0,0,0)")
    //   .attr("rx", "2px");
  }, []);

  return <svg ref={chartRef} width="500" height="300"></svg>;
};

export default HorizontalBarChart;
