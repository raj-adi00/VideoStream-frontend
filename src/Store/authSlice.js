import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: null,
  isLoggedin: false,
  isBackendReady: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.isLoggedin = true;
      state.userDetails = action.payload;
    },
    userLogout: (state, action) => {
      state.isLoggedin = false;
      state.userDetails = null;
    },
    setBackendReady: (state, action) => {
      state.isBackendReady = action.payload;
    },
  },
});

export const { userLogin, userLogout,setBackendReady } = authSlice.actions;
export default authSlice.reducer;
