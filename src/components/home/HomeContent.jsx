import React from "react";
import { useSelector } from "react-redux";
import Underline from "../../layouts/underline/underline";
export default function HomeContent({ head, content, id }) {
  const darkTheme = useSelector((state) => state.Theme);
  return (
    <div id={id} className={`flex-left  content  flex-column `}>
      <h1
        className={`heading margin-0 trans-500  flex-left flex-column ${
          darkTheme ? "dark-text dark-shadow" : "light-text light-shadow "
        }`}
      >
        {head}
      </h1>
      <Underline
        style={{ width: "30%", margin: "0px 0px 20px 0px" }}
      />
      <p
        className={`para trans-500 margin-5 ${
          darkTheme ? "dark-text " : "light-text  "
        }`}
      >
        {content}
      </p>
      <div className="btndiv flex-center auto-left"></div>
    </div>
  );
}
