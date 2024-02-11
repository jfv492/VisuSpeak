import React, { useState, useEffect } from 'react';
import axios from "axios";
import MessageList from "./MessageList.js";
import InputArea from "./InputArea.js";
import ActionBar from "./ActionBar.js";

const ChatContainer = () => {
  let userId = localStorage.getItem("userID");
  const PORT = process.env.PORT || 8081;
  const serverUrl = `http://localhost:${PORT}`;
  const sendMessageUrl = `${serverUrl}/chat/messages`;
  const getMessagesUrl = `${serverUrl}/chat/getmessages/${userId}`;
  const [messages, setMessages] = useState([]); // State to store messages

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(getMessagesUrl);

        if (response.status === 200) {
          const retrievedMessages = response.data;
          setMessages(retrievedMessages);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    // Fetch messages when the component mounts
    fetchMessages();
  }, [userId]); // Include userId in the dependency array to refetch when userId changes

  const handleSendMessage = async (newMessage, userId) => {
    try {
      const response = await axios.post(sendMessageUrl, {
        userID: localStorage.getItem("userID"), // The user's ID
        username: localStorage.getItem("username"),
        text: newMessage, // The message text
        type: 'text', // Assuming the message is of type 'text'
        status: 'sent' // Assuming the message has a status of 'sent'
      });

      // Handle the response accordingly
      if (response.status === 201) {
        console.log('Message stored', response.data);
        // Update the local state with the new message
        setMessages([...messages, response.data]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      <h1>New Chat</h1>
      {/* Pass the 'messages' state to the MessageList component */}
      <MessageList messages={messages} />
      <InputArea onSendMessage={handleSendMessage} />
      <ActionBar />
    </div>
  );
};

export default ChatContainer;
