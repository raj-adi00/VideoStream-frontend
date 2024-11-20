import React from "react";
import UserCard from "./UserCard";

function LeftChatBox({ setCurrentUserChats, allMessageData,setCurrentUserSelectedDetails }) {
  // Handle click on a UserCard
  const handleCardClick = (messages,owner) => {
    setCurrentUserChats(messages); // Set the messages of the selected user
    setCurrentUserSelectedDetails(owner)
  };

  return (
    <div className="p-4 bg-gray-100 h-full">
      <h4 className="text-xl font-semibold mb-4">Chats</h4>
      <div className="flex flex-col space-y-4">
        {Object.entries(allMessageData).map(([keyId, { owner, messages }]) => (
          <div
            key={keyId}
            onClick={() => handleCardClick(messages,owner)}
            className="cursor-pointer"
          >
            <UserCard keyId={keyId} owner={owner} messages={messages} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeftChatBox;
