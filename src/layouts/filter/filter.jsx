import React, { useState } from "react";
import "./filter.css";
import { useSelector } from "react-redux";

export default function Filter({ value, active, onClick }) {
  const darkTheme = useSelector((state) => state.Theme);
  return (
    <>
      <div
        className={`trans-500 filter ${
          darkTheme
            ? "dark-sub-container dark-mode dark-text"
            : "light-text  light-mode light-sub-container"
        }  ${value === active ? "activeFilter" : ""}`}
        onClick={() => {
          onClick(value);
        }}
      >
        {value}
      </div>
    </>
  );
}
