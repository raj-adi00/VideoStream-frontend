import React, { useState, useRef } from "react";

const AutoResizeTextarea = ({ setNewMessage, newMessage }) => {
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  return (
    <textarea
      ref={textareaRef}
      value={newMessage}
      onChange={handleInputChange}
      placeholder="Type a message"
      className="flex px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500 w-full resize-none overflow-y-hidden"
      rows="1"
    />
  );
};

export default AutoResizeTextarea;
