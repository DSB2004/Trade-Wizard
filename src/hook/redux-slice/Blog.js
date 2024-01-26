import { createSlice } from "@reduxjs/toolkit";

const Blog = createSlice({
  name: "Blog content",
  initialState: null,
  reducers: {
    AddBlog: (state, action) => {
      if (state === null) return [action.payload];
      else return [...state, action.payload];
    },
  },
});

export default Blog.reducer;
export const { AddBlog } = Blog.actions;
