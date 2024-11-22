import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ChatCards from "./ChatCards";
import SendMessageForm from "./SendMessageForm";
import "../../App.css";

function RightChatBox({
  currentUserChats,
  currentUserSelectedDetails,
  socket,
  setAllMessageData,
  allMessageData,
  setCurrentUserChats,
}) {
  const user = useSelector((state) => state.auth.userDetails);
  const chatContainerRef = useRef(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [currentUserChats]);
  const userDetails = currentUserSelectedDetails.name
    ? {
        name: currentUserSelectedDetails.name,
        avatar:
          currentUserSelectedDetails.avatar || "https://via.placeholder.com/50",
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
      <div
        className="flex-1 overflow-y-auto hide-scrollbar p-4"
        ref={chatContainerRef}
      >
        {currentUserChats?.length ? (
          currentUserChats.map((msg, index) => (
            <ChatCards user={user} key={msg._id || index} msg={msg} />
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
      {userDetails && (
        <SendMessageForm
          currentUserSelectedDetails={currentUserSelectedDetails}
          socket={socket}
          setAllMessageData={setAllMessageData}
          allMessageData={allMessageData}
          setCurrentUserChats={setCurrentUserChats}
          currentUserChats={currentUserChats}
        />
      )}
    </div>
  );
}

export default RightChatBox;
