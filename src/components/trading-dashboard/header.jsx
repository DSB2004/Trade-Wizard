import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Themebtn from "../../layouts/themebtn/themebtn";
import Navlist from "../../layouts/nav-list/nav-list";
import "../../styles/header.css"
import { useSelector } from "react-redux";
import UserPortfolio from "../../layouts/user-portfolio/user-portfolio";
import SliderMenu from "../../layouts/slider-menu/slider-menu";
import { RiMenu3Line } from "react-icons/ri"
import { useLocation } from "react-router-dom";
export default function Header() {
  const darkTheme = useSelector((state) => state.Theme);
  const location = useLocation();
  const userinfo = useSelector((state) => state.User);
  const [active, setActive] = useState("dashboard");
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false)
  const sliderListItems = [
    { text: "Dashboard", func: () => { navigate("") } },
    { text: "News/Blogs", func: () => { navigate("news-blog") } }
  ];
  useEffect(() => {
    const urlArray = location.pathname.split("/");
    const target = urlArray[urlArray.length - 1];
    if (target === "news-blog") {
      setActive("news-blog");
    } else {
      setActive("dashboard");
    }
  }, [location.pathname]);
  return (
    <>
      <header
        className={`flex-center full-width fixed-top trans-500 padding-5-0 ${darkTheme ? "dark-mode" : "light-mode"
          }`}
      >
        <h1
          className={` header-heading margin-5  auto-right trans-500 ${darkTheme ? "dark-text dark-shadow" : "light-text light-shadow "
            }`}
        >
          Trade Wizard
        </h1>
        <ul className="flex-center header-ul  margin-10">
          <Navlist
            onClick={() => {
              setActive("dashboard");
              navigate("");
            }}
            active={active}
            text="Dashboard"
            nav_key="dashboard"
          />
          <Navlist
            onClick={() => {
              setActive("news-blog");
              navigate("news-blog");
            }}
            active={active}
            text="Blogs/News"
            nav_key="news-blog"
          />
        </ul>
        <Themebtn />
        <RiMenu3Line onClick={() => { setOpen(true) }} className={`margin-5 ${darkTheme ? "dark-text" : "light-text"} trans-500 slider-icon `} />
        <UserPortfolio userinfo={userinfo} />
      </header>
      <SliderMenu isOpen={isOpen} changeFunc={setOpen} NavList={sliderListItems} user={userinfo} />
    </>
  );
}
