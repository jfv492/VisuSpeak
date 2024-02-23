import React from "react";
import Message from "./Message.js";

function MessageList({ messages }) {
  return (
    <div className="message-list chat-messages">
      <div class="divider">
        <div class="divider-text">Messages</div>
      </div>
      {messages.map((message, index) => (
        <Message key={index} {...message} />
      ))}
    </div>
  );
}

export default MessageList;
