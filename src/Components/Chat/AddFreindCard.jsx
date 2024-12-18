import React from "react";

const AddFriendCard = ({ user, onAddFriend }) => {
  const handleAddFriend = async () => {
    onAddFriend(user._id);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-gray-100 flex flex-col items-center gap-2">
      <img
        src={user.avatar}
        alt={`${user.username} avatar`}
        className="w-24 h-24 rounded-full object-cover"
      />
      <h3 className="text-lg font-semibold">{user.fullname}</h3>
      <p className="text-gray-500">@{user.username}</p>
      <button
        onClick={handleAddFriend}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Friend
      </button>
    </div>
  );
};

export default AddFriendCard;
