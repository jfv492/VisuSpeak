import React, { useState, useEffect } from "react";
import axios from "axios";
import MessageList from "./MessageList.js";
import InputArea from "./InputArea.js";
import ActionBar from "../about/ActionBar.js";
import serverUrl from "../../Server-env.js";

const ChatContainer = () => {
  let userId = localStorage.getItem("userID");
  let currentSessionId = localStorage.getItem("sessionId");
  const sendMessageUrl = `${serverUrl}/chat/messages`;
  const getMessagesUrl = `${serverUrl}/chat/getmessages/${userId}`;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
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
    try {
      const response = await axios.post(sendMessageUrl, {
        userID: localStorage.getItem("userID"),
        username: localStorage.getItem("username"),
        text: newMessage,
        type: "text",
        status: "sent",
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
    <div className="chat-container">
      <h1>New Chat</h1>
      <MessageList messages={messages} />
      <InputArea onSendMessage={handleSendMessage} />
      <ActionBar />
    </div>
  );
};

export default ChatContainer;
