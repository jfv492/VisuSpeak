import React, { useState, useEffect } from "react";
import axios from "axios"; // For making HTTP requests
import serverUrl from "../Server-env.js"; // URL of the server
import MessageList from "./MessageList.js"; // Component to display list of messages
import InputArea from "./InputArea.js"; // Component for input area
import ChatHeader from "./ChatHeader.js";

const ChatBox = () => {
  const [messages, setMessages] = useState([]); // State for storing messages
  const sendMessageUrl = `${serverUrl}/chat/messages`; // URL to send messages
  const [isSigning, setIsSigning] = useState(false); // State to track if user is signing
  const [fetchInterval, setFetchInterval] = useState(10000); // Interval for fetching messages

  // Function to handle sending a new message
  const handleSendMessage = async (newMessage) => {
    try {
      const response = await axios.post(sendMessageUrl, {
        userID: localStorage.getItem("userID"),
        username: localStorage.getItem("username"),
        text: newMessage,
        type: "text",
        status: "sent",
        sessionID: localStorage.getItem("sessionId"),
      });

      if (response.status === 201) {
        console.log("Message stored", response.data);
        setMessages([...messages, response.data]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <div class="chat-box shadow rounded-4">
      <ChatHeader />
      <div class="row">
        <div class="col chatbox-scrollable">
          <MessageList messages={messages} />
        </div>
      </div>

      <InputArea
        onSendMessage={handleSendMessage}
        isFetchingEnabled={isSigning}
        fetchInterval={fetchInterval}
      />
    </div>
  );
};

export default ChatBox;
