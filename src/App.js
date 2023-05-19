import React from "react";
import "./App.css";
import StackedBarChart from "./StackedBarChart";
import StackedBarChartHorizontal from "./StackedBarChartHorizontal";
import HorizontalSingleBarWithTotalValue from "./HorizontalSingleBarWithTotalValue";
import HorizontalSingleBarWithTotalValueAAAA from "./HorizontalSingleBarWithTotalValueAAAA";
import HorizontalBarChart from "./new";

const App = () => {
  return (
    <div className="container">
      <StackedBarChart />
      <StackedBarChartHorizontal />
      <HorizontalSingleBarWithTotalValue />
      <HorizontalSingleBarWithTotalValueAAAA />
      <HorizontalBarChart />
    </div>
  );
};

export default App;
