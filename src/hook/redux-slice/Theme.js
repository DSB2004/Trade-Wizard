import { createSlice } from "@reduxjs/toolkit";


const Theme = createSlice({
    name: "Theme-reducer",
    initialState: false,
    reducers: {
        changeTheme: state => {
            return !state
        }
    }
})

export default Theme.reducer;
export const { changeTheme } = Theme.actions;