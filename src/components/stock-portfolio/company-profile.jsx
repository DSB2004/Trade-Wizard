import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import StockInfoList from "../../layouts/stock-info-list/stock-info-list";
import { Link } from "react-router-dom";
export default function CompanyProfile({ data }) {
  const darkTheme = useSelector((state) => state.Theme);
  const [name, setname] = useState();
  const [symbol, setsymbol] = useState();
  const [IPO, setIPO] = useState();
  const [capital, setcapital] = useState();
  const [website, setwebsite] = useState();
  const [phone, setphone] = useState();
  const [country, setcountry] = useState();
  const [type, settype] = useState();
  const [logo, setLogo] = useState();
  useEffect(() => {
    if (data) {
      setname(data.name);
      setsymbol(data.ticker);
      setIPO(data.ipo);
      setcapital(data.marketCapitalization);
      setwebsite(data.weburl);
      setphone(data.phone);
      setcountry(data.country);
      settype(data.finnhubIndustry);
      setLogo(data.logo);
    }
  }, [data]);
  return (
    <div
      className={`Company-profile flex-center flex-column trans-500 ${darkTheme ? "dark-sub-container" : "light-sub-container"
        }`}
    >
      <>
        <div className="flex-center-left  dashboard-stock-header">
          <img src={logo} className="dashboard-stock-logo" />
          <h1 className={`margin-5 dashboard-stock-header-text`}>
            Company Profile
          </h1>
        </div>
        {/* <ul className="dashboard-stock-ul margin-0"> */}
        <div className="dashboard-stock-ul flex-center flex-column">
          <StockInfoList text="Name" data={name} />
          <StockInfoList text="Symbol" data={symbol} />
          <StockInfoList text="IPO" data={IPO} />
          <StockInfoList text="Market Capital" data={capital} symbol="$" />
          <StockInfoList text="Phone" data={phone} />
          <StockInfoList text="Country" data={country} />
          <StockInfoList text="Industry Type" data={type} />
          <StockInfoList
            text="Website"
            data={
              website ? (
                <Link
                  className={` trans-500 ${darkTheme
                    ? "dark-text dark-shadow"
                    : "light-text light-shadow"
                    }`}
                  to={website}
                >
                  {website}
                </Link>
              ) : (
                website
              )
            }
          />
        </div>
      </>
      {/* )} */}
    </div>
  );
}
