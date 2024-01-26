import React from "react";
import "../styles/auth.css";
import Header from "../components/auth/Header";
import { Outlet } from "react-router-dom";
// import Background from "../UI/background/background";
export default function AuthPage() {
  return (
    <>
      {/* <Background /> */}
      <Header />
      <div className="Auth flex-center">
        <Outlet />
      </div>
    </>
  );
}
