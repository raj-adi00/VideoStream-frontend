import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  userDetails: null,
  isLoggedin: false,
  isBackendReady: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.isLoggedin = true;
      state.userDetails = action.payload;
    },
    userLogout: (state) => {
      state.isLoggedin = false;
      state.userDetails = null;
    },
    setBackendReady: (state, action) => {
      state.isBackendReady = action.payload;
    },
    setLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { userLogin, userLogout, setBackendReady, setLoadingState } =
  authSlice.actions;
export default authSlice.reducer;
