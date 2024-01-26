import React from "react";

import "./news-card.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function NewsCard({ data }) {
  const darkTheme = useSelector((state) => state.Theme);
  return (
    <>
      <div className={` flex-center news-card  flex-column trans-500 `}>
        <img
          src={data && data.image ? data.image : null}
          alt=""
          className="news-card-img"
        />
        <div className="flex-left flex-column margin-10 ">
          <h1
            className={` margin-5-0 trans-500 news-card-heading ${
              darkTheme ? "dark-text" : "light-text"
            }`}
          >
            {data && data.headline}
          </h1>
          <p
            className={` margin-5-0 trans-500 news-card-content ${
              darkTheme ? "dark-text" : "light-text"
            }`}
          >
            {data && data.summary}
          </p>
          <Link
            className={` margin-5-0 trans-500 news-card-link ${
              darkTheme ? "dark-text" : "light-text"
            }`}
            to={data && data.url ? data.url : null}
          >
            Know More: {data && data.url}
          </Link>
        </div>
      </div>
    </>
  );
}
