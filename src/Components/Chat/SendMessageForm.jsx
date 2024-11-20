import React from "react";
import AutoResizeTextarea from "./AutoResizeTextarea";

function SendMessageForm() {
  // Handle message sending (for now, just clears the input field)
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log("Message sent:", newMessage); // Replace with actual logic to send a message
      setNewMessage("");
    }
  };
  return (
    <form
      className="flex items-center gap-3 p-4 border-t bg-white"
      onSubmit={handleSendMessage}
    >
      <AutoResizeTextarea />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-green-500 rounded-full hover:bg-green-600"
      >
        Send
      </button>
    </form>
  );
}

export default SendMessageForm;
