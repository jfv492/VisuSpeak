import React, { useState } from "react";
import MessageList from "./MessageList.js";
import InputArea from "./InputArea.js";
import ActionBar from "./ActionBar.js";

const ChatContainer = () => {
  const PORT = process.env.PORT || 8081;
  const serverUrl = `http://localhost:${PORT}`;
  const chatUrl = `${serverUrl}/chat/messages`;
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (newMessage) => {
    // Logic to send message, possibly update state or call an API
    console.log(newMessage); // For testing purposes
    // setMessages([...messages, newMessage]); // Uncomment to update messages list
  };

  return (
    <div className="chat-container">
      <h1>New Chat</h1>
      <MessageList messages={messages} />
      <InputArea onSendMessage={handleSendMessage} />
      <ActionBar />
    </div>
  );
};

export default ChatContainer;
