import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navlist from "../../layouts/nav-list/nav-list";
import "../../styles/header.css"
import SliderMenu from "../../layouts/slider-menu/slider-menu";
import { RiMenu3Line } from "react-icons/ri"
import Themebtn from "../../layouts/themebtn/themebtn";
import { useSelector } from "react-redux";

export default function Header() {
  const darkTheme = useSelector((state) => state.Theme);
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setOpen] = useState(false)
  const sliderListItems = [
    { text: "Sign Up", func: () => { navigate("/auth/signup") } },
    { text: "Sign In", func: () => { navigate("/auth/signin") } },
    { text: "Home", func: () => { navigate("/") } },
  ];
  useEffect(() => {
    if (location.pathname === "/auth/signin") {
      setActive("signin");
    } else if (location.pathname === "/auth/signup") {
      setActive("signup");
    } else {
    }
  }, [location.pathname]);
  return (
    <>
      <header
        className={` flex-center full-width fixed-top trans-500 padding-5-0`}
      >
        <h1
          className={` header-heading margin-5  auto-right trans-500 ${darkTheme ? "dark-text dark-shadow" : "light-text text-shadow "
            }`}
        >
          Trade Wizard
        </h1>
        <ul className="flex-center margin-10 header-ul">
          <Navlist
            onClick={() => {
              navigate("/");
            }}
            text="Home"
            active={active}
            nav_key="home"
          />
          <Navlist
            onClick={() => {
              navigate("/auth/signin");
              setActive("signin");
            }}
            text="Sign In"
            active={active}
            nav_key="signin"
          />
          <Navlist
            onClick={() => {
              navigate("/auth/signup");
              setActive("signup");
            }}
            text="Sign Up"
            active={active}
            nav_key="signup"
          />
        </ul>
        <Themebtn />
        <RiMenu3Line onClick={() => { setOpen(true) }} className={`margin-5 ${darkTheme ? "dark-text" : "light-text"} trans-500 slider-icon `} />
      </header>
      <SliderMenu isOpen={isOpen} changeFunc={setOpen} NavList={sliderListItems} />
    </>
  );
}
