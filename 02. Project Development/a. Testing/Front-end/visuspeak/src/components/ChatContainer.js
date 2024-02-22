import React, { useState, useEffect } from "react";
import axios from "axios";
import MessageList from "./MessageList.js";
import InputArea from "./InputArea.js";
import ActionBar from "./ActionBar.js";
import serverUrl from "../Server-env.js";

const ChatContainer = () => {
  let userId = localStorage.getItem("userID");
  let currentSessionId = localStorage.getItem("sessionId");
  const sendMessageUrl = `${serverUrl}/chat/messages`;
  const getMessagesUrl = `${serverUrl}/chat/getmessages/${userId}`;
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const currentDate = new Date();
  const timestamp = currentDate.getTime();

  useEffect(() => {

    const newSocket = new WebSocket("ws://localhost:8081"); // Adjust your WebSocket URL
    setSocket(newSocket);

    // Listen for messages from the WebSocket server
    newSocket.onmessage = (event) => {
      if (typeof event.data === "string") {
        // Handle string data (JSON)
        const newMessage = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else if (event.data instanceof Blob) {
        // Handle Blob data
        const reader = new FileReader();
        reader.onload = () => {
          const newMessage = JSON.parse(reader.result);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        };
        reader.readAsText(event.data);
      }
    }

    const fetchMessages = async () => {
      try {
        const response = await axios.get(getMessagesUrl);

        if (response.status === 200) {
          const retrievedMessages = response.data;
          setMessages(retrievedMessages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (currentSessionId) {
      fetchMessages();
    }
  }, [userId, currentSessionId]);

  const handleSendMessage = async (newMessage) => {
    // Send message through WebSocket
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        userID: localStorage.getItem("userID"),
        username: localStorage.getItem("username"),
        text: newMessage,
        timestamp: currentDate,
        type: "text",
        status: "sent",
        sessionID: currentSessionId
      }));
    }
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
