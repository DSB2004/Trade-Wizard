import React, { useEffect } from "react";
import "../styles/not-found.css"
import { Link } from "react-router-dom";
export default function NotFound() {
  useEffect(() => {
    document.title = "404...Not Found!!";
  }, [window.location]);
  return (
    <>
      <div className="flex-center full-scale flex-column">
        <h1 className="errorpage-head">
          "Oops! The Page is Lost in Cyberspace."
        </h1>
        <p className="errorpage-para">
          "Looks like you've ventured into the unknown. The page you're
          searching for might have taken a detour or evaporated into the digital
          abyss."
        </p>
        <ul>
          <h3>What you can do:</h3>
          <li className="errorpage-list">
            "Double-check the URL for typos or try again."
          </li>
          <li className="errorpage-list">
            "Return to the homepage and start fresh."
          </li>
        </ul>
        <Link to="/" className="errorpage-para">
          <p>Click Me to Go back to Home Page</p>
        </Link>
      </div>
    </>
  );
}
