import React from "react";
import "./loading-value.css";
import { useSelector } from "react-redux";
export default function LoadingValue({ text }) {
  const darkTheme = useSelector((state) => state.Theme);
  return (
    <span
      className={`trans-500 loading-value  ${
        darkTheme ? "loading-dark-value" : "loading-light-value"
      } `}
    >
      {text}
    </span>
  );
}
