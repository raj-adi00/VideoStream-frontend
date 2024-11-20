import React, { useState } from "react";
import AutoResizeTextarea from "./AutoResizeTextarea";
import { useSelector } from "react-redux";
import ChatCards from "./ChatCards";
import SendMessageForm from "./SendMessageForm";

function RightChatBox({ currentUserChats, currentUserSelectedDetails }) {
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((state) => state.auth.userDetails);
  // Extract user details if chats are available
  console.log(currentUserSelectedDetails);
  const userDetails = currentUserSelectedDetails.name
    ? {
        name: currentUserSelectedDetails.name, // Replace with actual data field
        avatar:
          currentUserSelectedDetails.avatar || "https://via.placeholder.com/50", // Replace with actual user avatar
      }
    : null;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header Section */}
      <div className="flex items-center gap-3 p-4 border-b bg-white shadow-sm">
        {userDetails ? (
          <>
            <img
              src={userDetails.avatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <h4 className="text-lg font-semibold">{userDetails.name}</h4>
          </>
        ) : (
          <h4 className="text-lg font-semibold">Chatbox</h4>
        )}
      </div>

      {/* Chat Messages Section */}
      <div className="flex-1 overflow-y-auto p-4">
        {currentUserChats?.length ? (
          currentUserChats.map((msg, index) => (
            <ChatCards user={user} key={msg._id} msg={msg} />
          ))
        ) : userDetails ? (
          <p className="text-center text-gray-500">
            Start chatting with {userDetails.name}!
          </p>
        ) : (
          <p className="text-center text-gray-500">
            Select a user to start chatting.
          </p>
        )}
      </div>

      {/* Input Section */}
      {userDetails && <SendMessageForm />}
    </div>
  );
}

export default RightChatBox;
