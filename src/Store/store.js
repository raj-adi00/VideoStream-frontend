import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import CommentSlice from "./CommentSlice";
import HomePageSlice from "./HomePageSlice";
import ErrorMessageSlice from "./ErrorMessageSlice";
import ChatSlice from "./ChatSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    comments: CommentSlice,
    homePage: HomePageSlice,
    error: ErrorMessageSlice,
    chat: ChatSlice,
  },
});

export default store;
