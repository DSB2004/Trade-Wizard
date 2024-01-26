import { createSlice } from "@reduxjs/toolkit";

const Trending = createSlice({
  name: "Trending List",
  initialState: { dataArray: [], lastestAdded: undefined },
  reducers: {
    addIntoTrending: (state, action) => {
      state.lastestAdded = action.payload;
      console.log(state.dataArray.length);
      state.dataArray = [action.payload, ...state.dataArray];
    },
  },
});

export default Trending.reducer;
export const { createTrending, addIntoTrending } = Trending.actions;
