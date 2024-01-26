import React from "react";
import "./nav-button.css";
export default function NavButton({ text }) {
  return (
    <>
      <button
        className={`button trans-500 `}
      >
        {text}
      </button>
    </>
  );
}
