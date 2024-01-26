import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import Coverbtn from "../../layouts/cover-btn/cover-btn";
import { blogContent } from "../../asset/static/dashboard";
import { FaInfoCircle, FaClipboard, FaExternalLinkAlt } from "react-icons/fa";
import BlogWriterBar from "../../layouts/blog-writer-input/blog-writer-input";
import { writeBlog } from "../../firebase/database/blog";
export default function BlogWriter({ isClose, closeFunc }) {
  const darkTheme = useSelector((state) => state.Theme);
  const [header, setHeading] = useState("");
  const [summary, setSummary] = useState("");
  const [link, setLink] = useState("");
  return (
    <>
      <div
        className={`blog-writer trans-500 ${darkTheme
          ? "dark-sub-container dark-mode"
          : "light-sub-container light-mode"
          } ${isClose ? "close-blog-writer" : "open-blog-writer"}`}
      >
        <IoClose
          onClick={() => {
            closeFunc();
          }}
          className={`blog-writer-close-icon margin-5 trans-500 ${darkTheme ? "dark-text dark-shadow" : "light-text light-shadow "
            }`}
        />
        <div className="flex-center flex-column  blog-writer-content">
          <div className="flex-left flex-column blog-writer-intro">
            <h2
              className={`blog-writer-h2  margin-5-0 ${darkTheme ? "dark-text dark-shadow" : "light-text light-shadow"
                }`}
            >
              Dear User,
            </h2>
            <p
              className={`blog-writer-para margin-5-0 ${darkTheme ? "dark-text" : "light-text"
                }`}
            >
              {blogContent.content}
            </p>
            <p
              className={`blog-writer-para margin-5-0 ${darkTheme ? "dark-text" : "light-text"
                }`}
            >
              {blogContent.note}
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex-center flex-column blog-writer-form margin-10"
          >
            <BlogWriterBar
              onValueChange={setHeading}
              placeholder="Mention Your Idea's Title..."
              icon={<FaInfoCircle />}
            />
            <BlogWriterBar
              placeholder="Be a Market Maven: Share, Collaborate, Thrive"
              icon={<FaClipboard />}
              onValueChange={setSummary}
              type="textarea"
            />
            <BlogWriterBar
              placeholder="Discover More Here..."
              onValueChange={setLink}
              icon={<FaExternalLinkAlt />}
            />
            <Coverbtn
              text="Sumbit Blog"
              bgColor="#03a9f4"
              func={() => {
                console.log("Change");
                closeFunc();
                writeBlog({ header, summary, link });
              }}
            />
          </form>
        </div>
      </div>
    </>
  );
}
