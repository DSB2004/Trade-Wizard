import React from "react";
import "./background.css";
import { useSelector } from "react-redux";
export default function Background() {
  const darkTheme = useSelector((state) => state.Theme);
  return (
    <div
      className={`background trans-500 ${
        darkTheme ? "dark-mode" : "light-mode"
      }`}
    ></div>
  );
}
