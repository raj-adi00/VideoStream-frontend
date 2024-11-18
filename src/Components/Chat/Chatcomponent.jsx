const BACKEND_URL = "http://localhost:8000";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

let socket;

function ChatComponent() {
  const user = useSelector((state) => state.auth.userDetails);
  useEffect(() => {
    const userid = user?._id;
    socket = io(BACKEND_URL, { withCredentials: true });

    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
      socket.emit("userOnline", userid);
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server.");
    });

    // socket.emit("sendMessage", {
    //   senderId: 123,
    //   receiverId: 123,
    //   message: "Hi there",
    // });
    return () => {
      if (socket) {
        socket.disconnect();
        console.log("Socket disconnected.");
      }
    };
  }, []);

  return (
    <div>
      <h1>Welcome to the Chat</h1>
      <p>You're now connected to the chat server.</p>
    </div>
  );
}

export default ChatComponent;
