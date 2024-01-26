import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <>
      <footer className={`flex-center footer`} id="footer">
        <Link to="/">
          <h1 className="dark-text footer-heading ">Made By Damanjeet Singh</h1>
        </Link>
      </footer>
    </>
  );
}
