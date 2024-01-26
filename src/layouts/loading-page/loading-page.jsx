import React, { useEffect, useState } from "react";
import "./loading-page.css";
import { useSelector } from "react-redux";
import LoadingValue from "../loading-value/loading-value";
export default function LoadingPage() {
  const [content, setContent] = useState("LOADING");
  const darkTheme = useSelector((state) => state.Theme);

  return (
    <>
      <div
        className={`loading-page flex-center flex-column trans-500 ${
          darkTheme ? "dark-mode" : "light-mode"
        }`}
      >
        <h1 className="loading-page-header">
          <LoadingValue text={content} />
        </h1>
        <section className="dots-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </section>
      </div>
    </>
  );
}
