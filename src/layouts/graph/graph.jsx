import { useSelector } from "react-redux";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "./graph.css";
import { formatYAxisLabel } from "../../util/common/format";
import {
  Chart,
  CategoryScale,
  Tooltip,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Filler,
} from "chart.js";

Chart.register(
  CategoryScale,
  Tooltip,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Filler
);

export default function LineGraph({ data, style }) {
  const darkTheme = useSelector((state) => state.Theme);
  const [labelArray, setLabels] = useState([]);
  const [dataArray, setArray] = React.useState([]);

  let graphdata = {
    labels: labelArray,
    datasets: [
      {
        data: dataArray,
        cubicInterpolationMode: "monotone",
        borderColor: darkTheme ? "white" : "black",
        fill: {
          target: "origin",
          below: darkTheme ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
          backgroundColor: darkTheme
            ? "rgba(255, 255, 255, 0.2)"
            : "rgba(0, 0, 0, 0.2)",
        },
      },
    ],
  };
  let graphoptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        title: {
          display: false,
        },
        grid: {
          color: darkTheme ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
          display: false,
        },
        ticks: {
          className: "trans-500",
          color: darkTheme ? "white" : "black",
        },
      },
      y: {
        display: true,
        // beginAtZero: true,
        title: {
          display: false,
        },
        grid: {
          color: darkTheme ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
          display: false,
        },
        ticks: {
          callback: formatYAxisLabel,
          className: "trans-500",
          color: darkTheme ? "white" : "black",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  React.useEffect(() => {
    if (data) {
      setArray(data.dataArray);
      setLabels(data.labelArray);
    }
  }, [data]);

  return (
    <>
      <>
        <div style={style} className="graph-outer-div">
          <Line data={graphdata} options={graphoptions} />
        </div>
      </>
    </>
  );
}
