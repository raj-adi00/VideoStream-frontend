import React from "react";

function ChatCards({ msg, user }) {
  function formatTime(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const time = `${hours}:${minutes}`;
    return time;
  }
  return (
    <div
      className={`flex ${
        msg.senderId == user._id ? "justify-start" : "justify-end"
      } mb-3`}
    >
      <div
        className={`max-w-xs p-3 rounded-lg text-sm ${
          msg.senderId == user._id
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        <div className={``}>
          {msg.message}
          <div className="text-right">{formatTime(msg.timestamp)}</div>
        </div>
      </div>
    </div>
  );
}

export default ChatCards;
