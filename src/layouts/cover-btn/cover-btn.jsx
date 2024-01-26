import React from "react";
import "./cover-btn.css";
import { useSelector } from "react-redux";
export default function Coverbtn({ bgColor, text, func, style }) {
  const darkTheme = useSelector((state) => state.Theme);

  return (
    <button
      style={style}
      onClick={() => {
        if (func) {
          func();
        }
      }}
      className={`cover-btn margin-5  trans-500 ${
        darkTheme ? " dark-border" : " light-border"
      } `}
    >
      <span
        className={` ${darkTheme ? "dark-text" : "light-text"} cover-btn-text`}
      >
        {text}
      </span>
      <div
        className="cover-btn-cover"
        style={{ backgroundColor: bgColor }}
      ></div>
    </button>
  );
}
