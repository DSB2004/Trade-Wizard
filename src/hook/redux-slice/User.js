import { createSlice } from "@reduxjs/toolkit";


const User = createSlice({
    name: "User-info",
    initialState: null,
    reducers: {
        updateUser: (state, action) => {
            return action.payload
        }
    }
})

export default User.reducer;
export const { updateUser } = User.actions;