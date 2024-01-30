import React, { useEffect } from "react";
import Header from "../components/trading-dashboard/header";
import { Outlet } from "react-router-dom";
import { showNotification } from "../util/common/notify-user";
import Chat from "../chat/chat";
import "../styles/dashboard.css";
import { Auth } from "../firebase/app";
import { useParams, useNavigate } from "react-router-dom";
export default function Dashboard() {
  const userinfo = Auth.currentUser;
  const navigate = useNavigate();
  const { auth, id } = useParams();
  useEffect(() => {
    if (id !== userinfo.uid) {
      navigate("/");
    }
    if (userinfo.emailVerified !== true) {
      setTimeout(() => {
        showNotification("verify")
      }, 1000)
    }
  }, [auth, id]);
  return (
    <>
      <Header />
      <div className="flex-center flex-column dashboard-div">
        <Outlet />
      </div>
      <Chat />
    </>
  );
}
