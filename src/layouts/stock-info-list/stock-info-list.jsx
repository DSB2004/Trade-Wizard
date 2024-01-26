import React, { useEffect, useState } from "react";
import "./stock-info-list.css";
import { useSelector } from "react-redux";
import LoadingValue from "../loading-value/loading-value";
export default function StockInfoList({ text, data, symbol }) {
  const darkTheme = useSelector((state) => state.Theme);
  const [listData, setListData] = useState(null);
  useEffect(() => {
    if (data) {
      setListData(data);
    }
  }, [data]);
  return (
    <>
      <li
        className={`dashboard-stock-li flex-inbw trans-500 ${
          darkTheme ? "dark-text dark-shadow" : "light-text light-shadow"
        }`}
      >
        {listData === null ? (
          <>
            <LoadingValue text={text} />
            <LoadingValue text="Value" />
          </>
        ) : (
          <>
            <span>{text}</span>
            <span className="stock-li-value">{symbol}{" "}{listData}</span>
          </>
        )}
      </li>
    </>
  );
}
