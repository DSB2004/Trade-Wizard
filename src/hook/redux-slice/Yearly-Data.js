import { createSlice } from "@reduxjs/toolkit";


const YearlyData = createSlice({
    name: "Current Stock Previous Data",
    initialState: [],
    reducers: {
        addToPrev: (state, action) => {
            console.log("added to previous")
            return [...state, action.payload];
        },

    }
})

export default YearlyData.reducer;
export const { addToPrev } = YearlyData.actions;