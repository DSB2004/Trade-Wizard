import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./blog-writer-input.css";
export default function BlogWriterBar({
  style,
  type,
  icon,
  placeholder,
  onValueChange,
}) {
  const darkTheme = useSelector((state) => state.Theme);
  if (type === "textarea") {
    return (
      <>
        <div
          style={style}
          className={`blog-textarea-bar flex-center-left trans-500 ${
            darkTheme ? "dark-input-bar" : "light-input-bar"
          }`}
        >
          <div
            className={`blog-input-icon flex-center trans-500 ${
              darkTheme ? "dark-text" : "light-text"
            }`}
          >
            {icon}
          </div>
          <textarea
            rows="15"
            placeholder={placeholder}
            className={`blog-writer-textarea trans-500 ${
              darkTheme ? "dark-text dark-input" : "light-text light-input"
            }`}
            onChange={(e) => {
              if (onValueChange) {
                onValueChange(e.target.value);
              }
            }}
          />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          style={style}
          className={`blog-input-bar flex-center-left trans-500 ${
            darkTheme ? "dark-input-bar" : "light-input-bar"
          }`}
        >
          <div
            className={`blog-input-icon flex-center trans-500 ${
              darkTheme ? "dark-text" : "light-text"
            }`}
          >
            {icon}
          </div>
          <input
            type="text"
            placeholder={placeholder}
            className={`blog-writer-input trans-500 ${
              darkTheme ? "dark-text dark-input" : "light-text light-input"
            }`}
            onChange={(e) => {
              if (onValueChange) {
                onValueChange(e.target.value);
              }
            }}
          />
        </div>
      </>
    );
  }
}
