import React from "react";
import Message from "./Message.js";

function MessageList({ messages }) {
  // console.log("Messages in MessageList:", messages);
  return (
    <div className="message-list chat-messages">
      <div className="divider">
        <div className="divider-text">Messages</div>
      </div>
      {messages.map((message, index) => {
        console.log("Rendering message:", message);
        return <Message key={index} {...message} />;
      })}
    </div>
  );
}

export default MessageList;
