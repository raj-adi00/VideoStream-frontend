import React, { useEffect, useState } from "react";
import ChatService from "../Utility/Chat";
import { useDispatch } from "react-redux";
import { info } from "../../Store/ErrorMessageSlice";
import handleAxiosError from "../Frequent/HandleAxiosError";
import AddFriendCard from "./AddFreindCard";

function AddFriend() {
  const [nonFriendUsers, setNonFriendUsers] = useState([]); // Holds users not yet friends
  const dispatch = useDispatch();

  // Fetching non-friend users on component mount
  useEffect(() => {
    ChatService.GetAllNonFreindUser()
      .then((response) => {
        setNonFriendUsers(response.data); // Assuming response has a "data" field with user details
      })
      .catch((error) => {
        dispatch(info(handleAxiosError(error).message));
      });
  }, [dispatch]);

  // Function to handle adding a friend and removing the user from the UI
  const handleAddFriend = async (id) => {
    try {
      const response = await ChatService.AddFriend(id); // Assuming AddFriend is a method in ChatService
      if (response.statusCode === 200) {
        // Remove user from the state
        setNonFriendUsers((prevUsers) =>
          prevUsers.filter((user) => user._id != id)
        );
      }
    } catch (error) {
      dispatch(info(handleAxiosError(error).message));
    }
  };

  return (
    <div className="flex flex-wrap gap-4 p-10">
      {nonFriendUsers && nonFriendUsers.length > 0 ? (
        nonFriendUsers.map((user) => (
          <AddFriendCard
            key={user._id}
            user={user}
            onAddFriend={handleAddFriend}
          />
        ))
      ) : (
        <p className="text-gray-500">No users to display!</p>
      )}
    </div>
  );
}

export default AddFriend;
