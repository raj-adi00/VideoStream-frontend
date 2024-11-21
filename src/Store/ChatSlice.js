import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
};

const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});
export const { setSocket } = ChatSlice.actions;
export default ChatSlice.reducer;
