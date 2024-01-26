import React, { useEffect } from "react";
import Intro from "../components/home/Intro";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import HomeContent from "../components/home/HomeContent";
import { about, feature } from "../asset/static/home";
import "../styles/home.css";
export default function Home() {
  useEffect(() => {
    document.title = "Welcome to Trade Wizard";
  }, []);
  return (
    <>
      <div className="Home">
        <Header />
        <Intro />
        <HomeContent head="About Us" content={about} id="about" />
        <HomeContent head="Features" content={feature} id="feature" />
        <Footer />
      </div>
    </>
  );
}
