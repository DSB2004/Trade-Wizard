import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Trending from "../components/trading-dashboard/trending";
import StockPortfolio from "../components/trading-dashboard/stock-portfolio";
import InputBar from "../layouts/input-bar/input-bar";
import "../styles/trading-dashboard.css";
import { IoMdSearch } from "react-icons/io";
import { searchStock } from "../util/data/search";

export default function TradingDashboard() {
  const darkTheme = useSelector((state) => state.Theme);
  const [searchVal, changeSearch] = useState("");

  useEffect(() => {
    if (searchVal && searchVal !== "") searchStock(searchVal);
  }, [searchVal]);

  return (
    <>
      <div className="auto-right search-bar-div">
        <InputBar
          style={{ margin: "10px" }}
          placeholder="Search for stocks here..."
          onSubmit={(value) => {
            changeSearch(value);
          }}
          icon={<IoMdSearch />}
        />
      </div>
      <div className="index-container flex-center stock-home-div ">
        <div
          className={` ${
            darkTheme ? "dark-sub-container" : "light-sub-container"
          } index-sub-container trending trans-500 `}
        >
          <Trending />
        </div>
        <div
          className={`  ${
            darkTheme ? "dark-sub-container" : "light-sub-container"
          } index-sub-container aboutThisStock trans-500`}
        >
          <StockPortfolio />
        </div>
      </div>
    </>
  );
}
