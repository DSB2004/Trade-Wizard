import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Background from "./layouts/background/background";
// Home import

import Notify from "./layouts/notify/notify";

import Home from "./pages/home";

// auth import
import AuthPage from "./pages/auth";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/Signup";

// // Dashboard import
import Dashboard from "./pages/dashboard";

import TradingDashboard from "./pages/trading-dashboard";
import StockPortfolio from "./pages/stock-portfolio";
import Article from "./pages/article";

// // error import
import NotFound from "./pages/not-found";

import LoadingPage from "./layouts/loading-page/loading-page";
import { useSelector } from "react-redux";
export default function App() {
  const userinfo = useSelector((state) => state.User);
  const [IsLoading, toggleLoading] = useState(true);
  const [showLoader, toggleLoader] = useState(true);

  const navigate = useNavigate();

  const loadingEvent = async (user) => {
    toggleLoading(true);
    if (user !== null) {
      setTimeout(() => {
        navigate(`/${userinfo.status}/${userinfo.id}`);
      }, 500);
    } else {
      setTimeout(() => {
        navigate(`/`);
      }, 500);
    }
    setTimeout(() => {
      toggleLoading(false);
    }, 3000);
  };

  useEffect(() => {
    if (IsLoading === true) {
      setTimeout(() => {
        toggleLoader(true);
      }, 500);
    } else {
      if (IsLoading === false) {
        setTimeout(() => {
          toggleLoader(false);
        }, 500);
      }
    }
  }, [IsLoading]);

  useEffect(() => {
    loadingEvent(userinfo);
  }, [userinfo]);
  return (
    <>
      <Background />
      {showLoader ? (
        <>
          <div
            className={`trans-500 relative ${IsLoading ? "opacity-in" : "opacity-out"
              }`}
          >
            <LoadingPage />
          </div>
        </>
      ) : (
        <>
          <Notify />
          <div
            className={`trans-500  ${IsLoading ? "opacity-out" : "opacity-in"}`}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<AuthPage />}>
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
              </Route>
              <Route path="/:auth/:id/" element={<Dashboard />}>
                <Route index element={<TradingDashboard />} />
                <Route path="dashboard/:stock" element={<StockPortfolio />} />
                <Route path="news-blog" element={<Article />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </>
      )}
    </>
  );
}
