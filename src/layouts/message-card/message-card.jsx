import React from "react";
import "./message-card.css";
import { useSelector } from "react-redux";
export default function MessageCard({ user, message, id }) {
  const darkTheme = useSelector((state) => state.Theme);
  return (
    <>
      {message ? (
        <>
          <div
            className={`message-card margin-10 trans-500  ${
              user ? "auto-left self-msg" : "auto-right user-msg"
            } ${
              darkTheme ? "dark-text dark-border" : "light-text light-border "
            }`}
          >
            <p
              className={`message-id margin-0 trans-500 ${
                darkTheme ? "dark-text" : "light-text "
              }`}
            >
              {user ? "You" :  id }
            </p>
            <p
              className={`message-para  trans-500 ${
                darkTheme ? "dark-text" : "light-text"
              } `}
            >
              {message}
            </p>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
