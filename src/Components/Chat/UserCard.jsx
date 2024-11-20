import React from "react";

function UserCard({ keyId, owner, messages, setCurrentUserChats }) {
  const latestMessage = messages[messages.length - 1]; // Get the latest message if available

  return (
    <div
      className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
      key={keyId}
    >
      {/* User Avatar */}
      <div className="flex items-center gap-4">
        <img
          src={owner.avatar}
          alt={`${owner.name}'s avatar`}
          className="w-12 h-12 rounded-full object-cover border"
        />
        {/* Name and Latest Message */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800">{owner.name}</h4>
          {latestMessage ? (
            <p className="text-sm text-gray-600 truncate w-48">
              {latestMessage.message}
            </p>
          ) : (
            <p className="text-sm text-gray-400">No messages yet</p>
          )}
        </div>
      </div>
      {/* Timestamp of the latest message */}
      <div className="text-xs text-gray-500">
        {latestMessage &&
          new Date(latestMessage.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
}

export default UserCard;
