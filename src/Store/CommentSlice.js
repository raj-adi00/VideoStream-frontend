import { createSlice } from "@reduxjs/toolkit";
import UserSevice from "../Components/Utility/User";

const initialState = {
    comments: []
}

const CommentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        GetComment: (state, action) => {
            console.log(action.payload)
            state.comments = action.payload
        },
        NewComment: (state, action) => {
            // console.log(action.payload)
            state.comments=([action.payload, ...state.comments]);
            // console.log(state.comments)
        }
    }
})

export const { GetComment, NewComment } = CommentSlice.actions
export default CommentSlice.reducer