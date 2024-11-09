import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    val: null
}

const ErrorMessageslice = createSlice({
    name: "error",
    initialState,
    reducers: {
        info: (state, action) => {
            toast.info(`${action.payload}`, {
                position: "bottom-center"
            });
        },
        warn: (state, action) => {
            toast.warn("Warning Notification !", {
                position: "bottom-center"
            });
        }
    }
})

export const { info, warn } = ErrorMessageslice.actions
export default ErrorMessageslice.reducer