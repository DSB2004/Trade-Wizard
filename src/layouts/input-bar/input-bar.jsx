import React, { useEffect, useState } from "react";
import "./input-bar.css";
import { useSelector } from "react-redux";
import { FaEyeSlash } from "react-icons/fa";
export default function InputBar({
  onValueChange,
  onSubmit,
  placeholder,
  icon,
  password,
  style,
}) {
  const darkTheme = useSelector((state) => state.Theme);
  const [input, changeInput] = useState("");
  const [isPassword, togglePassword] = useState(false);
  useEffect(() => {
    if (password) {
      togglePassword(password);
    }
  }, [password]);
  return (
    <>
      <div
        style={style}
        className={`input-bar flex-center-left trans-500 ${
          darkTheme ? "dark-input-bar" : "light-input-bar"
        }`}
      >
        <button
          className={`input-btn flex-center trans-500 ${
            darkTheme ? "dark-text" : "light-text"
          }`}
          onClick={() => {
            if (onSubmit) {
              onSubmit(input);
            }
          }}
        >
          {icon}
        </button>
        <input
          type={isPassword ? "password" : "text"}
          placeholder={placeholder}
          className={`input trans-500 ${
            darkTheme ? "dark-text dark-input" : "light-text light-input"
          }`}
          onChange={(e) => {
            changeInput(e.target.value);
            if (onValueChange) {
              onValueChange(e.target.value);
            }
          }}
        />
        {password ? (
          <>
            <div className="passwordChanger flex-center ">
              <FaEyeSlash
                className={`trans-500 
              ${darkTheme ? "dark-text" : "light-text"} 
              `}
                onClick={() => {
                  togglePassword(!isPassword);
                }}
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
