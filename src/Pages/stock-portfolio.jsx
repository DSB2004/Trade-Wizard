import React, { useEffect, useState } from "react";
import "../styles/stock-portfolio.css";
import Graphs from "../components/stock-portfolio/graphs";
import Companyprofile from "../components/stock-portfolio/company-profile";
import Quote from "../components/stock-portfolio/quote";

import { useParams } from "react-router-dom";
import { StockData } from "../util/data/yearly";

export default function StockPortfolio() {
  const { stock } = useParams();
  const [data, setData] = useState(null);
  const [Stockdata, setStockData] = useState(null);
  const [CompanyProfile, setProfile] = useState(null);
  const [yearlyData, updateYearlyData] = useState(null);
  const fetchAction = async (stock) => {
    setData(await StockData(stock));
  };
  useEffect(() => {
    document.title = `${stock}`;
    fetchAction(stock);
  }, [stock]);
  useEffect(() => {
    if (data) {
      setStockData(data);
      setProfile(data.profile);
      updateYearlyData(data.prevData);
    }
  }, [data]);
  return (
    <>
      <div className="flex-center flex-column stock-page-div index-container">
        <div className="flex-center stock-container ">
          <Companyprofile data={CompanyProfile} />
          <Quote data={Stockdata} />
        </div>
        <div className="flex-center flex-wrap graph-container">
          <Graphs data={yearlyData} />
        </div>
      </div>
    </>
  );
}
