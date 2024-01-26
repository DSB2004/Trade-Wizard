import React, { useState, useEffect } from "react";
import Filter from "../../layouts/filter/filter";
import LineGraph from "../../layouts/graph/graph";
import { useSelector } from "react-redux";
import LoadingValue from "../../layouts/loading-value/loading-value";
import LoadingDiv from "../../layouts/loading-div/loading";
import { changeGraphData } from "../../util/common/change-graph-data";
import NavButton from "../../layouts/nav-button/nav-button";
import { Link } from "react-router-dom";
export default function StockPortfolio() {
  const darkTheme = useSelector((state) => state.Theme);
  const stockData = useSelector((state) => state.Current);
  const [activeFilter, setFilter] = useState("");
  const [logo, setLogo] = useState(null);
  const [name, setName] = useState(<LoadingValue text="Name" />);
  const [symbol, setSymbol] = useState(<LoadingValue text="SYMBOL" />);
  const [price, setprice] = useState(<LoadingValue text="$ 00.00" />);
  const [change, setChange] = useState(<LoadingValue text="00.00 %" />);
  const [GraphObject, changeObject] = useState(null);

  useEffect(() => {
    if (stockData) {
      setFilter("Buy");
      setLogo(stockData.profile.logo);
      setName(stockData.profile.name);
      setSymbol(stockData.profile.ticker);
      setprice("$ " + stockData.quotedata.o);
      setChange(stockData.quotedata.dp + " %");
      changeObject(changeGraphData(stockData.recommendedtrend, activeFilter));
    }
  }, [stockData]);
  useEffect(() => {
    if (stockData) {
      changeObject(changeGraphData(stockData.recommendedtrend, activeFilter));
    }
  }, [activeFilter]);
  return (
    <>
      {stockData === null ? (
        <>
          <LoadingDiv style={{ height: "100%", width: "100%" }} />
        </>
      ) : (
        <>
          <div
            className={`
      stock-intro-header
      ${darkTheme ? "dark-trending-stock" : "light-trending-stock"}
      `}
          >
            <img src={logo} alt="" className="stock-intro-icon" />
            <div className="flex-left flex-column margin-10">
              <h3
                className={`stock-intro-name ${
                  darkTheme ? "dark-text" : "light-text"
                }`}
              >
                {name}
              </h3>
              <h4
                className={`stock-intro-symbol ${
                  darkTheme ? "dark-symbol" : "light-symbol"
                }`}
              >
                {symbol}
              </h4>
            </div>
            <div className="flex-left flex-column auto-left">
              <h4
                className={`stock-intro-price ${
                  darkTheme ? "dark-text" : "light-text"
                }`}
              >
                {price}
              </h4>
              <h4
                className={`trans-500 stockpercentage ${
                  typeof change === "string" &&
                  Number(change.replace("%", "")) > 0
                    ? darkTheme
                      ? "up-dark-percentage"
                      : "up-light-percentage"
                    : "downPercentage"
                }`}
              >
                {change}
              </h4>
            </div>
          </div>
          <div className="graph-chart flex-center flex-column">
            <h1
              className={`graph-heading trans-500 ${
                darkTheme ? "dark-text" : "light-text"
              }`}
            >
              Recommend Trend
            </h1>
            <div className="filterDiv flex-right">
              <Filter
                value="Buy"
                active={activeFilter}
                onClick={(filter) => {
                  setFilter(filter);
                }}
              />
              <Filter
                value="Hold"
                active={activeFilter}
                onClick={(filter) => {
                  setFilter(filter);
                }}
              />
              <Filter
                value="Sell"
                active={activeFilter}
                onClick={(filter) => {
                  setFilter(filter);
                }}
              />
            </div>
          </div>
          <div className="trend-graph-container flex-center">
            {GraphObject === null ? (
              <>
                <LoadingDiv style={{ height: "100%", width: "100%" }} />
              </>
            ) : (
              <LineGraph
                data={GraphObject}
                style={{ height: "90%", width: "100%" }}
              />
            )}
          </div>

          <Link
            to={`dashboard/${symbol}`}
            className="flex-center full-width margin-5"
          >
            <NavButton text="Read More" />
          </Link>
        </>
      )}
    </>
  );
}
