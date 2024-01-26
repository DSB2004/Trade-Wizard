import { createSlice } from "@reduxjs/toolkit";


const Current = createSlice({
    name: "Current stock",
    initialState: null,
    reducers: {
        changeCurrent: (state, action) => {
            // console.log("Current Changed");
            return action.payload
        },

    }
})

export default Current.reducer;
export const { changeCurrent } = Current.actions;