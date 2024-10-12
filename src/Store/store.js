import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import CommentSlice from './CommentSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        comments: CommentSlice
    }
})

export default store