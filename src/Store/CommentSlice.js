import { createSlice } from "@reduxjs/toolkit";
import UserSevice from "../Components/Utility/User";
import { act } from "react";

const initialState = {
    comments: []
}

const CommentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        GetComment: (state, action) => {
            // console.log(action.payload)
            state.comments = action.payload
        },
        NewComment: (state, action) => {
            // console.log(action.payload)
            state.comments = ([action.payload, ...state.comments]);
            // console.log(state.comments)
        },
        DeleteComment: (state, action) => {
            const id = action.payload;
            state.comments = state.comments.filter(item => item._id !== id);
        },
        EditComment: (state, action) => {
            const { id, editedComment } = action.payload;
            console.log(action.payload);

            // Use map to immutably update the comments array
            // state.comments = state.comments.map((comment) =>
            //     comment._id === id ? { ...comment, content: editedComment } : comment
            // );

            // console.log(state.comments); // You can log it after the update to verify
            const idx = state.comments.findIndex(comment => comment._id == id); // Corrected findIndex usage

            if (idx !== -1) {
                const updatedComment = { ...state.comments[idx], content: editedComment }; // Create a new comment object
                state.comments = state.comments.map((comment) =>
                    comment._id == id ? updatedComment : comment // Use map to update the comment
                );
            }
        }


    }
})

export const { GetComment, NewComment, DeleteComment, EditComment } = CommentSlice.actions
export default CommentSlice.reducer