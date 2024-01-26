import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import NavButton from "../../layouts/nav-button/nav-button";
import BlogCard from "../../layouts/blog-card/blog-card";
export default function BlogContainer({ openFunc }) {
  const [blogArray, changeBlogArray] = useState([]);
  const darkTheme = useSelector((state) => state.Theme);
  const blogs = useSelector((state) => state.Blog);
  const blogCounter = useRef(0);
  const UpdateContent = async (blog) => {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        changeBlogArray((prevState) => [
          ...prevState,
          <BlogCard data={blog} key={blog.id} />,
        ]);
        resolve();
      }, 100);
    });
  };
  useEffect(() => {
    if (blogs !== null && blogCounter.current === 0) {
      blogs.forEach((blog) => {
        UpdateContent(blog);
      });
      blogCounter.current = blogs.length;
    } else if (blogs !== null && blogCounter.current + 1 <= blogs.length) {
      UpdateContent(blogs[blogs.length - 1]);
    }
  }, [blogs]);
  return (
    <>
      <div
        className={`blog-container trans-500 ${darkTheme ? "dark-sub-container" : "light-sub-container"
          } `}
      >
        <h1
          className={`stock-market-news-blog-header margin-10 trans-500 ${darkTheme ? "dark-text dark-shadow" : "light-text light-shadow"
            }`}
        >
          Trading Titan Tales
        </h1>
        <div className="blog-array flex-center flex-column">{blogArray}</div>
        <div
          onClick={() => {
            openFunc();
          }}
          className=" flex-center margin-10"
        >
          <NavButton text="Share Your Views" />
        </div>
      </div>
    </>
  );
}
