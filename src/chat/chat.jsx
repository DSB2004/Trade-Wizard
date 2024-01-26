import React, { useEffect, useState } from "react";
import "./chat.css";
import { useSelector } from "react-redux";
import { LuMessagesSquare } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import MessageCard from "../layouts/message-card/message-card";
import { SliderView } from "../util/common/slider";
import Coverbtn from "../layouts/cover-btn/cover-btn";
import {
  onSnapshot,
  serverTimestamp,
  orderBy,
  query,
} from "@firebase/firestore";
import { MessageCollection, sendMessage } from "../firebase/database/message";
export default function Chat() {
  const darkTheme = useSelector((state) => state.Theme);
  const userinfo = useSelector((state) => state.User);
  const [open, setOpen] = useState(false);
  const [messageArray, updateArray] = useState([]);
  const [messageString, changeMessage] = useState("");

  async function messageUpdate() {
    const queriedCollection = query(MessageCollection, orderBy("timestamp"));
    onSnapshot(queriedCollection, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const msgObj = change.doc.data();
        const id = change.doc.id;
        if (change.type === "added") {
          updateArray((prevState) => [
            ...prevState,
            <MessageCard
              message={msgObj.message}
              id={msgObj.user}
              key={id}
              user={msgObj.user === userinfo.email}
            />,
          ]);
        }
        SliderView("scroll-ref-div");
      });
    });
  }
  useEffect(() => {
    if (userinfo !== null) {
      messageUpdate();
    }
  }, [userinfo]);

  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
        }}
        className={`chat-btn flex-center trans-500 ${
          darkTheme
            ? "dark-sub-container  dark-mode dark-text"
            : "light-text  light-mode light-sub-container"
        } `}
      >
        <LuMessagesSquare
          className={` trans-500 ${
            darkTheme ? "dark-shadow dark-text" : "light-text  light-shadow"
          } `}
        />
      </div>
      <div
        className={`chat-area trans-500 ${
          darkTheme
            ? "dark-sub-container dark-mode dark-text"
            : "light-text  light-mode light-sub-container"
        } ${open ? "open-chat-area" : "close-chat-area"} `}
      >
        <div
          className={`${darkTheme ? "dark-text" : "light-text"} trans-500 
            chat-toggle-icon `}
        >
          <IoClose
            className="margin-5"
            onClick={() => {
              setOpen(false);
            }}
          />
        </div>
        <h2
          className={`${darkTheme ? "dark-text" : "light-text"} trans-500 
              chat-header margin-10`}
        >
          Join the Global Conversation on Stock Trends and Insights
        </h2>
        <div
          className={` chat-message-div margin-5 trans-500 ${
            darkTheme ? "dark-border" : " light-border"
          }`}
        >
          {messageArray}
          <div id="scroll-ref-div"></div>
        </div>
        <div className=" flex-column flex-center chat-submit-div margin-5">
          <textarea
            onChange={(e) => {
              changeMessage(e.target.value);
            }}
            id="msg-input"
            placeholder="Express Your Thoughts here..."
            className={`chat-input margin-5  trans-500 ${
              darkTheme ? "dark-text dark-border" : "light-text light-border"
            }`}
            rows="5"
          ></textarea>
          <Coverbtn
            text="Send"
            bgColor="#03a9f4"
            func={() => {
              const msginput = document.querySelector("#msg-input");
              if (msginput) {
                msginput.value = "";
              }
              sendMessage({
                user: userinfo.email,
                message: messageString,
                timestamp: serverTimestamp(),
              });
            }}
          />
        </div>
      </div>
    </>
  );
}
