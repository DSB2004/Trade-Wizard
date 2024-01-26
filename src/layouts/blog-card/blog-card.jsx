import React from "react";

import "./blog-card.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function BlogCard({ data }) {
  const darkTheme = useSelector((state) => state.Theme);
  return (
    <>
      <div className={` flex-left blog-card  flex-column trans-500 `}>
        <div className="flex-left flex-column margin-10 ">
          <h1
            className={` margin-5-0 trans-500 blog-card-heading ${
              darkTheme ? "dark-text" : "light-text"
            }`}
          >
            {data && data.header}
          </h1>
          <p
            className={` margin-5-0 trans-500 blog-card-content ${
              darkTheme ? "dark-text" : "light-text"
            }`}
          >
            {data && data.summary}
          </p>
          <Link
            className={` margin-5-0 trans-500 blog-card-link ${
              darkTheme ? "dark-text" : "light-text"
            }`}
            to={data && data.link ? data.link : null}
          >
            Know More: {data && data.link}
          </Link>
        </div>
      </div>
    </>
  );
}
