import React from "react";
import Typewriter from "../../layouts/typewriter/typewriter";
import { useSelector } from "react-redux";
import NavButton from "../../layouts/nav-button/nav-button";
import { Link } from "react-router-dom";
import { marketLines, subhead, head } from "../../asset/static/home"
export default function Intro() {
  const darkTheme = useSelector((state) => state.Theme);

  return (
    <>
      <div id="intro" className=" intro flex-justified ">
        <div className={` flex-center flex-column`}>
          <h1
            className={` text-shadow intro-sub-head margin-5  ${
              darkTheme ? "dark-shadow" : " light-shadow "
            }`}
          >
            {subhead}
          </h1>
          <h1
            className={`intro-head  trans-500  ${
              darkTheme ? "dark-text dark-shadow" : "light-text light-shadow "
            }`}
          >
            {head}
          </h1>
          <Typewriter content={marketLines} />
          <div className="flex-center intro-btn-div">
            <a href="/" target="_blank">
              <NavButton text="Read Docs" />
            </a>
            <Link to="/auth/signup">
              <NavButton text="Get Started" />
            </Link>
            <Link to="/1234/true">
              <NavButton text="Try Now" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
