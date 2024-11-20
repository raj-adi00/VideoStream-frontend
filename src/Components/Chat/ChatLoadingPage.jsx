import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatService from "../Utility/Chat";
import { useDispatch, useSelector } from "react-redux";
import { info } from "../../Store/ErrorMessageSlice";
import handleAxiosError from "../Frequent/HandleAxiosError";

function ChatLoadingPage() {
  const navigate = useNavigate();
  const [loadingPercentage, setLoadingPercentage] = useState(0); // Track progress.
  const [loadingMessage, setLoadingMessage] = useState("Initializing...");
  const [dataLoaded, setDataLoaded] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.userDetails);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let progress = 0;

        setLoadingMessage("Fetching chats...");
        const chatResponse = await ChatService.GetAllFriendChat();
        if (chatResponse.statusCode > 300) {
          dispatch(info(handleAxiosError(chatResponse).message));
          return;
        }
        progress += 25;
        setLoadingPercentage(progress);

        processChats(chatResponse.data, userDetails._id);
        progress += 25; // Update progress.
        setLoadingPercentage(progress);

        // Step 2: Fetch non-friend users
        setLoadingMessage("Fetching non-friend users...");
        const nonFriendsResponse = await ChatService.GetAllNonFreindUser();
        if (nonFriendsResponse.statusCode > 300) {
          dispatch(info(handleAxiosError(nonFriendsResponse).message));
          return;
        }
        progress += 25;
        saveNonFriends(nonFriendsResponse.data);
        progress += 25; // Update progress.
        setLoadingPercentage(progress);

        setLoadingMessage("Complete!");
        setDataLoaded(true);
      } catch (error) {
        console.error(error);
        dispatch(info(handleAxiosError(error).message));
      }
    };

    fetchData();
  }, [userDetails]);

  const processChats = (data, currentUserId) => {
    const chatMap = {};

    data.forEach(
      ({ messages, friendId, friendName, friendEmail, freindAvatar }) => {
        const key =
          friendId === currentUserId ? messages[0].senderId : friendId;
        chatMap[key] = {
          owner: {
            name: friendName,
            email: friendEmail,
            avatar: freindAvatar,
          },
          messages,
        };
      }
    );
    localStorage.setItem("chats", JSON.stringify(chatMap));
  };

  const saveNonFriends = (data) => {
    localStorage.setItem("nonFriends", JSON.stringify(data));
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-blue-300 text-white">
      {dataLoaded ? (
        <div className="w-full max-w-md bg-white text-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Welcome!</h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            Data has been successfully loaded. What would you like to do next?
          </p>
          <div className="flex justify-around">
            <button
              onClick={() => navigate("/add-friend")}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            >
              Add Friends
            </button>
            <button
              onClick={() => navigate("/chat")}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
            >
              Chat with Friends
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-75 mb-6"></div>

          {/* Loading Message */}
          <p className="text-lg mb-4">{loadingMessage}</p>

          {/* Progress Bar */}
          <div className="w-3/4 h-2 bg-white bg-opacity-25 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-500"
              style={{ width: `${loadingPercentage}%` }}
            ></div>
          </div>

          {/* Percentage */}
          <p className="text-sm mt-2">{loadingPercentage}%</p>
        </div>
      )}
    </div>
  );
}

export default ChatLoadingPage;
