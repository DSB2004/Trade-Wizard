import React, { useState } from "react";
import "../styles/dashboard-news.css";
import BlogContainer from "../components/articles/blog-container";
import NewsContainer from "../components/articles/news-container";
import BlogWriter from "../components/articles/blog-writer";
export default function Article() {
  const [isClose, setClose] = useState(true);
  return (
    <>
      <div className=" index-container flex-center news">
        <BlogWriter
          isClose={isClose}
          closeFunc={() => {
            setClose(true);
          }}
        />
        <NewsContainer />
        <BlogContainer
          openFunc={() => {
            setClose(false);
          }}
        />
      </div>
    </>
  );
}
