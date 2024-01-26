import React, { useState } from "react";
import "./user-portfolio.css";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { SignOutFromTradeWizard } from "../../firebase/auth/email-user";
import Coverbtn from "../cover-btn/cover-btn";
export default function UserPortfolio({ userinfo }) {
  const darkTheme = useSelector((state) => state.Theme);
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="user-portfolio-container">
        <div
          onClick={() => {
            setOpen(true);
          }}
          className={`user-portfolio trans-500 ${darkTheme
              ? "dark-sub-container dark-user-portfolio"
              : "light-sub-container light-user-portfolio"
            }`}
        >
          <FaUser
            className={`trans-500 ${darkTheme ? "dark-text" : "light-text"
              }`}
          />
        </div>
        <div
          className={` 
          flex-column trans-500 flex-left ${darkTheme
              ? "dark-sub-container dark-mode"
              : " light-mode light-sub-container"
            } user-portfolio-slider ${open ? "open-user-portfolio" : "close-user-portfolio"
            }`}
        >
          <div className=" flex-center-left full-width">
            <IoClose
              className={`${darkTheme ? "dark-text" : "light-text"} trans-500 
            open-close-icon margin-10`}
              onClick={() => {
                setOpen(false);
              }}
            />
          </div>
          <div
            className="
         user-portfolio-intro flex-center flex-column"
          >
            <FaUser
              className={`user-portfolio-img ${darkTheme
                  ? "dark-sub-container dark-mode dark-text"
                  : "light-text  light-mode light-sub-container"
                }`}
            />
            <h1
              className={`user-portfolio-header margin-5 ${darkTheme ? "dark-text dark-shadow" : "light-text light-shadow "
                }`}
            >
              {userinfo && userinfo.name}
            </h1>
            <h4
              className={`user-portfolio-id margin-5 ${darkTheme ? "dark-text dark-shadow" : "light-text  light-shadow"
                }`}
            >
              {userinfo && userinfo.email}
            </h4>
          </div>
          <div className="margin-auto full-width flex-center margin-bottom-10">
            <Coverbtn
              text="Logout"
              bgColor="red"
              func={SignOutFromTradeWizard}
            />
          </div>
        </div>
      </div>
    </>
  );
}
