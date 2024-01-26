import React from "react";
import "./auth-provider.css";
import { useSelector } from "react-redux";
export default function AuthProvider({ func, icon, text }) {
  const darkTheme = useSelector((state) => state.Theme);
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          func();
        }}
        className={`auth-provider trans-500 ${darkTheme ? "dark-auth-provider" : "light-auth-provider"
          }`}
      >
        <div className={`auth-provider-icon flex-center trans-500 ${darkTheme ? "dark-text" : "light-text"}`}>
          {icon}
        </div>
        SignIn with {text}
      </button>
    </>
  );
}
