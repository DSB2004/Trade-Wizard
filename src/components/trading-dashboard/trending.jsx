import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TrendingStock from "../../layouts/trending-stock/trending-stock";
import LoadingDiv from "../../layouts/loading-div/loading";
import { updateTrending } from "../../util/data/trending";
import { showNotification } from "../../util/common/notify-user";
export default function Trending() {
  const darkTheme = useSelector((state) => state.Theme);
  const TrendingData = useSelector((state) => state.Trending);
  const [stockArray, updateArray] = useState([]);

  const AddToTrendingList = async (data) => {
    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          updateArray((prevState) => {
            const isKeyUnique = !prevState.some(
              (item) => item.key === data.symbol
            );

            if (isKeyUnique) {
              return [
                <TrendingStock key={data.symbol} data={data} />,
                ...prevState,
              ];
            } else {
              return prevState;
            }
          });
          resolve();
        }, 500);
      });
    } catch (error) {
      showNotification("error")
    }
  };
  useEffect(() => {
    if (TrendingData.lastestAdded) {
      AddToTrendingList(TrendingData.lastestAdded);
    }
  }, [TrendingData.lastestAdded]);

  useEffect(() => {
    if (TrendingData.dataArray.length === 0) {
      updateArray([]);
      updateTrending();
    } else {
      updateArray([]);
      TrendingData.dataArray.forEach((element) => {
        AddToTrendingList(element);
      });
    }
  }, []);

  return (
    <>
      {stockArray === null ? (
        <>
          <LoadingDiv style={{ height: "100%", width: "100%" }} />
        </>
      ) : (
        <>
          <h1
            className={`trans-500 ${darkTheme ? "dark-text" : "light-text"
              } trendingStockhead`}
          >
            Trending Stocks
          </h1>
          <div className="trending-scrollDiv">{stockArray}</div>
        </>
      )}
    </>
  );
}
