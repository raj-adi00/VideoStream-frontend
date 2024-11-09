import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userDetails: null,
    isLoggedin: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLogin: (state, action) => {
            state.isLoggedin = true
            state.userDetails = action.payload.data
        },
        userLogout: (state, action) => {
            state.isLoggedin = false
            state.userDetails = null
        }
    }
})

export const { userLogin, userLogout } = authSlice.actions
export default authSlice.reducer