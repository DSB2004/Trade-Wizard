import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { generateMonthArray } from "../../util/common/generator";
import StockInfoList from "../../layouts/stock-info-list/stock-info-list";
import LineGraph from "../../layouts/graph/graph";
import LoadingDiv from "../../layouts/loading-div/loading";
export default function Quote({ data }) {
  const darkTheme = useSelector((state) => state.Theme);

  const [open, setopen] = useState();
  const [close, setclose] = useState();
  const [high, sethigh] = useState();
  const [low, setlow] = useState();
  const [volume, setvolume] = useState();
  const [previousClose, setPrevClose] = useState();
  const [percentageChange, setChange] = useState();
  const [QuoteData, setQuoteData] = useState();
  const [TradeValue, setTradeValue] = useState();

  useEffect(() => {
    if (data) {
      setTradeValue({
        labelArray: generateMonthArray(),
        dataArray: data.prevData.t,
      });
      setQuoteData(data.quotedata);
    }
  }, [data]);
  useEffect(() => {
    if (QuoteData) {
      setPrevClose(QuoteData.pc);
      setopen(QuoteData.o);
      sethigh(QuoteData.h);
      setlow(QuoteData.l);
      setclose(QuoteData.c);
      setChange(QuoteData.dp);
      setvolume(QuoteData.t);
    }
  }, [QuoteData]);
  return (
    <>
      <div
        className={`Stock-intro flex-inbw ${
          darkTheme ? "dark-sub-container" : "light-sub-container"
        } trans-500`}
      >
        <div className="quote-data flex-center flex-column">
          <h1 className="stock-intro-heading margin-10-0">Stock Price</h1>
          <StockInfoList text="Open Price" data={open} symbol="$" />
          <StockInfoList text="Close Price" data={close} symbol="$" />
          <StockInfoList text="High" data={high} symbol="$" />
          <StockInfoList text="Low" data={low} symbol="$" />
          <StockInfoList text="Trade Volume" data={volume} />
          <StockInfoList
            text="Previous Close"
            data={previousClose}
            symbol="$"
          />
          <StockInfoList
            text="Percentage Change"
            data={percentageChange ? `${percentageChange}%` : percentageChange}
          />
        </div>
        <div className="volume-graph">
          {TradeValue ? (
            <>
              <h1 className="stock-intro-heading margin-10-0">Trade Volume</h1>
              <LineGraph
                data={TradeValue}
                style={{ height: "80%", width: "100%" }}
              />
            </>
          ) : (
            <>
              <LoadingDiv />
            </>
          )}
        </div>
      </div>
    </>
  );
}
