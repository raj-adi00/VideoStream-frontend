import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import CommentSlice from './CommentSlice'
import HomePageSlice from './HomePageSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        comments: CommentSlice,
        homePage: HomePageSlice
    }
})

export default store