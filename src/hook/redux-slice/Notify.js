import { createSlice } from "@reduxjs/toolkit";


const Notify = createSlice({
    name: "notification",
    initialState: {
        status: false,
        content: null
    },
    reducers: {
        changeStatus: (state, action) => {
            state.status = action.payload.status
            state.content = action.payload.content
        }
    }
})


export default Notify.reducer;
export const { changeStatus } = Notify.actions;
