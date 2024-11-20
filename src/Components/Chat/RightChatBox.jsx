import React, { useState } from "react";

function RightChatBox({ currentUserChats, currentUserSelectedDetails }) {
  const [newMessage, setNewMessage] = useState("");

  // Extract user details if chats are available
  console.log(currentUserSelectedDetails)
  const userDetails = currentUserChats?.length
    ? {
        name:  currentUserSelectedDetails.name || "Unknown User", // Replace with actual data field
        avatar: currentUserSelectedDetails.avatar || "https://via.placeholder.com/50", // Replace with actual user avatar
      }
    : null;

  // Handle message sending (for now, just clears the input field)
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log("Message sent:", newMessage); // Replace with actual logic to send a message
      setNewMessage("");
    }
  };

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
            <div
              key={index}
              className={`flex ${
                msg.isRead ? "justify-start" : "justify-end"
              } mb-3`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  msg.isRead
                    ? "bg-gray-200 text-black"
                    : "bg-green-500 text-white"
                }`}
              >
                {msg.message}
              </div>
            </div>
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
      <form
        className="flex items-center gap-3 p-4 border-t bg-white"
        onSubmit={handleSendMessage}
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className="flex px-4 py-2 border rounded-full outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-green-500 rounded-full hover:bg-green-600"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default RightChatBox;
