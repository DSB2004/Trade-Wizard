import React, { useEffect, useState } from "react";
import { getNewsData } from "../../util/data/news";
import NewsCard from "../../layouts/news-card/news-card";
import { useSelector } from "react-redux";
import { showNotification } from "../../util/common/notify-user";
export default function NewsContainer() {
  const darkTheme = useSelector((state) => state.Theme);
  const [newsArray, setNewsArray] = useState([]);
  const newscaller = async () => {
    try {
      setNewsArray([]);
      const newsdata = await getNewsData();
      if (newsdata) {
        for (let index = 0; index < newsdata.length; index++) {
          await new Promise((resolve, reject) => {
            setTimeout(() => {
              setNewsArray((prevState) => [
                ...prevState,
                <NewsCard data={newsdata[index]} key={index} />,
              ]);
              resolve();
            }, 100);
          });
        }
      }
    } catch (err) {
      showNotification("error")
    }
  };
  useEffect(() => {
    newscaller();
  }, []);
  return (
    <>
      <div
        className={`news-container trans-500 ${darkTheme ? "dark-sub-container" : "light-sub-container"
          } `}
      >
        <h1
          className={`stock-market-news-blog-header margin-10 trans-500 ${darkTheme ? "dark-text dark-shadow" : "light-text light-shadow"
            }`}
        >
          Wizardry in the Markets
        </h1>
        <div className="news-array flex-center-left flex-wrap">{newsArray}</div>
      </div>
    </>
  );
}
