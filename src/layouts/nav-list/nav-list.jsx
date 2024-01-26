import React from "react";
import "./nav-list.css";
import { useSelector } from "react-redux";
export default function Navlist({ text, nav_key, active, onClick }) {
  const darkTheme = useSelector((state) => state.Theme);
  return (
    <>
      <div
        className={`margin-5 navlist flex-left flex-column ${
          nav_key === active ? "activekey" : ""
        }`}
        onClick={() => {
          if (onClick) {
            onClick();
          }
        }}
      >
        <p
          className={`navlist-text trans-500 margin-0 
          ${darkTheme ? "dark-text dark-shadow" : "light-text text-shadow "}`}
        >
          {text}
        </p>
        <div
          className={`
          ${darkTheme === true ? "dark-underline" : "light-underline"}  
          underlineEffect trans-500`}
        ></div>
      </div>
    </>
  );
}
