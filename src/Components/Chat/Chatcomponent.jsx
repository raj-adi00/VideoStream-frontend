const BACKEND_URL = "http://localhost:8000";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { info } from "../../Store/ErrorMessageSlice";
import handleAxiosError from "../Frequent/HandleAxiosError";
import LeftChatBox from "./LeftChatBox";
import RightChatBox from "./RightChatBox";

let socket;

function ChatComponent() {
  const user = useSelector((state) => state.auth.userDetails);
  const [dataLoaded, setDataLoaded] = useState(false);
  const dispatch = useDispatch();
  const [allMessageData, setAllMessageData] = useState({});
  const [currentUserChats, setCurrentUserChats] = useState([]);
  const [currentUserSelectedDetails, setCurrentUserSelectedDetails] = useState(
    {}
  );
  let chatDisplayeduserId = "";
  useEffect(() => {
    chatDisplayeduserId = currentUserSelectedDetails?.id;
    if (chatDisplayeduserId) {
      setCurrentUserChats(allMessageData[chatDisplayeduserId].messages);
    }
  }, [currentUserSelectedDetails, allMessageData]);
  useEffect(() => {
    const userid = user._id;
    if (!userid) {
      dispatch(info("YOu are not logged in"));
      return;
    }
    const getUserMessage = async () => {
      try {
        const messageData = localStorage.getItem("chats");
        if (!messageData) {
          dispatch(info("NO chat data found"));
          return;
        }
        const MessageData = await JSON.parse(messageData);
        setAllMessageData(MessageData);
      } catch (error) {
        console.log(error);
        dispatch(info(handleAxiosError(error).message));
        return;
      }
    };
    getUserMessage();
    socket = io(BACKEND_URL, { withCredentials: true });

    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
      dispatch(info(`Connected to server ${socket.id}`));
      socket.emit("userOnline", userid);
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
      dispatch(info(handleAxiosError(err)));
      return;
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server.");
      dispatch(info("Disconnected from server"));
    });
    socket.on(
      "receiveMessage",
      ({ message, senderId, receiverId, timestamp }) => {
        const MessageSent = {
          message,
          senderId,
          receiverId,
          isRead: false,
          timestamp,
        };

        const key = senderId === user._id ? receiverId : senderId;

        // Update allMessageData
        setAllMessageData((prevData) => {
          const updatedData = { ...prevData };

          if (!updatedData[key]) {
            updatedData[key] = { messages: [] }; // Initialize if not present
          }

          updatedData[key].messages = [
            ...updatedData[key].messages,
            MessageSent,
          ];

          return updatedData;
        });
      }
    );

    return () => {
      if (socket) {
        socket.disconnect();
        console.log("Socket disconnected.");
        dispatch(info("Socket disconnected"));
      }
    };
  }, []);

  if (!allMessageData)
    return (
      <div className="flex justify-center items-center">
        <span>Your Chats are Loading. Please Wait...</span>
      </div>
    );
  return (
    <div className="flex w-screen h-screen">
      <div className="w-1/3 pt-4">
        <LeftChatBox
          setCurrentUserChats={setCurrentUserChats}
          allMessageData={allMessageData}
          setCurrentUserSelectedDetails={setCurrentUserSelectedDetails}
        />
      </div>
      <div className="w-2/3 pt-4">
        <RightChatBox
          currentUserChats={currentUserChats}
          currentUserSelectedDetails={currentUserSelectedDetails}
          socket={socket}
          setAllMessageData={setAllMessageData}
          allMessageData={allMessageData}
          setCurrentUserChats={setCurrentUserChats}
        />
      </div>
    </div>
  );
}

export default ChatComponent;
