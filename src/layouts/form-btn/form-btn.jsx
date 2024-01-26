import React from "react";
import "./form-btn.css";
import { useSelector } from "react-redux";
export default function FormBtn({ func, text }) {
  const darkTheme = useSelector((state) => state.Theme);
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          func();
        }}
        className={`trans-500 form-button ${
          darkTheme ? "dark-btn" : "light-btn"
        }`}
      >
        {text}
      </button>
    </>
  );
}
