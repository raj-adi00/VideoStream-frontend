import React, { useState } from "react";
import AutoResizeTextarea from "./AutoResizeTextarea";
import { useDispatch, useSelector } from "react-redux";
import { info } from "../../Store/ErrorMessageSlice";
import ChatService from "../Utility/Chat";
import handleAxiosError from "../Frequent/HandleAxiosError";

function SendMessageForm({
  currentUserSelectedDetails,
  socket,
  setAllMessageData,
  allMessageData,
  setCurrentUserChats,
  currentUserChats,
}) {
  // Handle message sending (for now, just clears the input field)
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((state) => state.auth.userDetails);
  const dispatch = useDispatch();
  const [sending, setSending] = useState(false);
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) {
      setNewMessage("");
      dispatch(info("Message Can't be empty"));
      return;
    }
    if (!socket) {
      dispatch(info("Server not connected. Something is wrong"));
      return;
    }
    if (!currentUserSelectedDetails.id) {
      dispatch(info("Receiver details is not available"));
      return;
    }
    if (!user) {
      dispatch(info("It seems that you are not logged in"));
      return;
    }
    setSending(true);
    try {
      const saveMessageToDatabase = await ChatService.sendMessage({
        message: newMessage,
        senderId: user._id,
        receiverId: currentUserSelectedDetails.id,
      });
      const timestamp = new Date().toISOString();
      if (saveMessageToDatabase.statusCode < 300) {
        socket.emit("sendMessage", {
          message: newMessage,
          receiverId: currentUserSelectedDetails.id,
          senderId: user._id,
          timestamp,
        });
        const key = currentUserSelectedDetails.id;
        const senderId = user._id;
        const receiverId = currentUserSelectedDetails.id;
        const message = newMessage;
        const isRead = false;
        const MessageSent = {
          message,
          senderId,
          receiverId,
          isRead,
          timestamp,
        };
        const PreviousMessageData = { ...allMessageData };
        PreviousMessageData[key].messages = [
          ...PreviousMessageData[key].messages,
          MessageSent,
        ];
        setAllMessageData(PreviousMessageData);
        setCurrentUserChats([...PreviousMessageData[key].messages]);
        setNewMessage("");
      } else {
        dispatch(info(handleAxiosError(saveMessageToDatabase).message));
      }
    } catch (error) {
      console.log(error);
      dispatch(info(handleAxiosError(error).message));
    } finally {
      setSending(false);
    }
  };
  return (
    <form
      className="flex items-center gap-3 p-4 border-t bg-white"
      onSubmit={handleSendMessage}
    >
      <AutoResizeTextarea
        newMessage={newMessage}
        setNewMessage={setNewMessage}
      />
      {!sending && (
        <button
          type="submit"
          className="px-4 py-2 text-white bg-green-500 rounded-full hover:bg-green-600"
        >
          Send
        </button>
      )}
    </form>
  );
}

export default SendMessageForm;
