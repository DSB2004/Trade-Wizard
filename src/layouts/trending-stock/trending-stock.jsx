import React, { useEffect, useState } from "react";
import "./trending-stock.css";
import { useSelector } from "react-redux";
import { changeIntro } from "../../util/data/filter-data";
import LoadingValue from "../loading-value/loading-value";
export default function TrendingStock({ data }) {
  const darkTheme = useSelector((state) => state.Theme);
  const [logo, setLogo] = useState(null);
  const [name, setName] = useState(<LoadingValue text="Name" />);
  const [symbol, setSymbol] = useState(<LoadingValue text="SYMBOL" />);
  const [price, setprice] = useState(<LoadingValue text="$ 00.00" />);
  const [change, setChange] = useState(<LoadingValue text="00.00 %" />);
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLogo(data.profile.logo);
        setName(data.profile.name);
        setSymbol(data.profile.ticker);
        setprice("$ " + data.quotedata.o);
        setChange(data.quotedata.dp + " %");
      }, 900);
    }
  }, [data]);
  return (
    <>
      <div
        onClick={() => {
          changeIntro(data);
        }}
        className={`
        trans-500
      trending-stock
      ${darkTheme ? "dark-trending-stock" : "light-trending-stock"}
      `}
      >
        <img src={logo} alt="" className="stock-icon" />
        <div className="flex-left flex-column margin-10">
          <h3
            className={`stock-name ${darkTheme ? "dark-text" : "light-text"}`}
          >
            {name}
          </h3>
          <h4
            className={`stock-symbol ${
              darkTheme ? "dark-symbol" : "light-symbol"
            }`}
          >
            {symbol}
          </h4>
        </div>
        <div className="flex-left flex-column auto-left">
          <h4
            className={`stock-price ${darkTheme ? "dark-text" : "light-text"}`}
          >
            {price}
          </h4>
          <h4
            className={`trans-500 stockpercentage ${
              typeof change === "string" && Number(change.replace("%", "")) > 0
                ? darkTheme
                  ? "up-dark-percentage"
                  : "up-light-percentage"
                : "down-percentage"
            }`}
          >
            {change}
          </h4>
        </div>
      </div>
    </>
  );
}
