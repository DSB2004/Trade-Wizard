import React, { useState } from "react";
import "../../styles/header.css";
import { useNavigate } from "react-router-dom";
import Themebtn from "../../layouts/themebtn/themebtn";
import Navlist from "../../layouts/nav-list/nav-list";
import { useSelector } from "react-redux";
import SliderMenu from "../../layouts/slider-menu/slider-menu";
import { RiMenu3Line } from "react-icons/ri";
import { SliderView } from "../../util/common/slider";
export default function Header() {
  const darkTheme = useSelector((state) => state.Theme);
  const [active, setActive] = useState("intro");
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  const sliderAction = (id) => {
    setOpen(false);
    SliderView(id);
  };
  const sliderListItems = [
    {
      text: "Home",
      func: () => {
        sliderAction("intro");
      },
    },
    {
      text: "About Us",
      func: () => {
        sliderAction("about");
      },
    },
    {
      text: "Features",
      func: () => {
        sliderAction("feature");
      },
    },
    {
      text: "Developer Info",
      func: () => {
        sliderAction("footer");
      },
    },
    {
      text: "Sign Up",
      func: () => {
        navigate("/auth/signup");
      },
    },
    {
      text: "Sign In",
      func: () => {
        navigate("/auth/signin");
      },
    },
  ];
  return (
    <>
      <header
        className={`flex-center full-width fixed-top trans-500 padding-5-0 ${
          darkTheme ? "dark-mode" : "light-mode"
        }`}
      >
        <h1
          className={` header-heading margin-5  auto-right trans-500 ${
            darkTheme ? "dark-text dark-shadow" : "light-text text-shadow "
          }`}
        >
          Trade Wizard
        </h1>
        <ul className="flex-center margin-10 header-ul">
          <Navlist
            onClick={() => {
              setActive("intro");
              SliderView("intro");
            }}
            active={active}
            text="Home"
            nav_key="intro"
            slideto="intro"
          />
          <Navlist
            onClick={() => {
              setActive("about");
              SliderView("about");
            }}
            text="About Us"
            nav_key="about"
            active={active}
            slideto="about"
          />
          <Navlist
            onClick={() => {
              SliderView("feature");
              setActive("feature");
            }}
            text="Features"
            nav_key="feature"
            active={active}
            slideto="feature"
          />
          <Navlist
            onClick={() => {
              navigate("/auth/signin");
            }}
            text="SignIn"
            nav_key="SignIn"
            active={active}
          />
        </ul>

        <Themebtn />
        <RiMenu3Line
          onClick={() => {
            setOpen(true);
          }}
          className={`margin-5 ${
            darkTheme ? "dark-text" : "light-text"
          } trans-500 slider-icon `}
        />
      </header>
      <SliderMenu
        isOpen={isOpen}
        changeFunc={setOpen}
        NavList={sliderListItems}
      />
    </>
  );
}
