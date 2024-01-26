import { createSlice } from "@reduxjs/toolkit";


const News = createSlice({
    name: "News content",
    initialState: null,
    reducers: {
        createNewsArray: (state, action) => {
            return action.payload
        },

    }
})

export default News.reducer;
export const { createNewsArray } = News.actions;