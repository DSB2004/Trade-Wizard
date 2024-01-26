import { createSlice } from "@reduxjs/toolkit";


const YearlyData = createSlice({
    name: "Current Stock Previous Data",
    initialState: [],
    reducers: {
        addToPrev: (state, action) => {
            return [...state, action.payload];
        },

    }
})

export default YearlyData.reducer;
export const { addToPrev } = YearlyData.actions;