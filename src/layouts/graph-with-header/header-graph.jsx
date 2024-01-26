import React from "react";
import LineGraph from "../graph/graph";
import LoadingDiv from "../loading-div/loading";
import "./header-graph.css";
import { useSelector } from "react-redux";
export default function HeaderGraph({ text ,data }) {
  const darkTheme = useSelector((state) => state.Theme);
  return (
    <div
      className={`prev-graph-div flex-column flex-center trans-500 ${
        darkTheme ? "dark-sub-container" : "light-sub-container"
      }`}
    >
      {data === null || data === undefined ? (
        <LoadingDiv style={{ height: "100%", width: "100%" }} />
      ) : (
        <>
          <h2 className={"prev-graph-header"}>{text}</h2>
          <LineGraph style={{ height: "80%", width: "95%" }} data={data} />
        </>
      )}
    </div>
  );
}
