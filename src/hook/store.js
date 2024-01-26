import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from "./redux-slice/Theme";
import UserReducer from "./redux-slice/User"
import TrendingReducer from "./redux-slice/Trending"
import CurrentReducer from "./redux-slice/Current"
import YearlyDataReducer from "./redux-slice/Yearly-Data"
import NewsReducer from "./redux-slice/News"
import BlogReducer from "./redux-slice/Blog";
const store = configureStore({
    reducer: {
        Theme: ThemeReducer,
        User: UserReducer,
        Trending: TrendingReducer,
        Current: CurrentReducer,
        YearlyData: YearlyDataReducer,
        Blog: BlogReducer,
        News: NewsReducer

    }
})

export default store