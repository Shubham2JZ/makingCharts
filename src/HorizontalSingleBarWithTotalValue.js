import React, { useEffect, useRef } from "react";
import "./HorizontalSingleBarWithTotalValue.css";

const chartData = [
  { label: "Available", value: 10 },
  { label: "Vacant", value: 4 },
  { label: "tmkc", value: 5 },
];

const bgcolor = ["#E4E4E4", "#004B97"];
const fontcolor = ["#000", "#fff"];

const StackedBarChartHorizontal = () => {
  return (
    <div>
      <div>Stacked Bar Chart Horizontal</div>
      <div className="bar-container">
        <div className="bar">
          {chartData.map((n, i) => (
            <div
              className={`bar-${i + 1}`}
              key={i}
              style={{
                flex: n.value,
                backgroundColor: bgcolor[i] || "gray",
                color: fontcolor[i] || "black",
              }}
            >
              {n.value}
            </div>
          ))}
        </div>
        {/* <div className="bar">
          <div className="bar-1" style={{ flex: chartData.available }}>
            {chartData.available}
          </div>
          <div className="bar-2" style={{ flex: chartData.vacant }}>
            {chartData.vacant !== 0 && chartData.vacant}
          </div>
        </div> */}
        <div className="total-value">hi</div>
      </div>
    </div>
  );
};
export default StackedBarChartHorizontal;
