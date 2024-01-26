import React from "react";
import "./loading.css";
import { useSelector } from "react-redux";
export default function LoadingDiv({ style }) {
  const darkTheme = useSelector((state) => state.Theme);
  return (
    <div
      className={`${
        darkTheme ? "dark-loader" : "light-loader"
      } diagonal-shine-effect`}
      style={style}
    ></div>
  );
}
