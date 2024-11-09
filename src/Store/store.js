import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import CommentSlice from './CommentSlice'
import HomePageSlice from './HomePageSlice'
import ErrorMessageSlice from './ErrorMessageSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        comments: CommentSlice,
        homePage: HomePageSlice,
        error: ErrorMessageSlice
    }
})

export default store