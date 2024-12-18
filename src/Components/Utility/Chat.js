// const BACKEND_URL = "http://localhost:8000";
const BACKEND_URL="https://itube-iser.onrender.com"

import axios from "axios";
import { response_interceptor } from "../Interceptor/apiClient";
import handleAxiosError from "../Frequent/HandleAxiosError";

export class chat {
  async GetAllNonFreindUser() {
    try {
      const NonFriendsUser = await response_interceptor.get(
        "/chat/get-non-friend-users"
      );
      if (NonFriendsUser.status < 300) return NonFriendsUser.data;
      else return handleAxiosError(NonFriendsUser);
    } catch (error) {
      console.logJ(error);
      return handleAxiosError(error);
    }
  }
  async AddFriend(newFriendId) {
    try {
      const AddedFriendstatus = await response_interceptor.get(
        `/chat/add-friend?newFriendId=${newFriendId}`
      );
      if (AddedFriendstatus.status < 300) return AddedFriendstatus.data;
      else return handleAxiosError(AddedFriendstatus);
    } catch (error) {
      console.log(error);
      return handleAxiosError(error);
    }
  }
  async GetAllFriendChat() {
    try {
      const Chats = await response_interceptor.get(`/chat/get-messages`);
      if (Chats.status < 300) return Chats.data;
      else return handleAxiosError(Chats);
    } catch (error) {
      console.log(error);
      return handleAxiosError(error);
    }
  }
  async sendMessage({ message, receiverId, senderId }) {
    try {
      const encodedMessage = encodeURIComponent(message);
      const MessageSentStatus = await response_interceptor.post(
        `/chat/save-message?receiverId=${receiverId}&message=${encodedMessage}&senderId=${senderId}`
      );
      if (MessageSentStatus.status < 300) return MessageSentStatus.data;
      else return handleAxiosError(MessageSentStatus);
    } catch (error) {
      console.error(error);
      return handleAxiosError(error);
    }
  }
}
const ChatService = new chat();
export default ChatService;
