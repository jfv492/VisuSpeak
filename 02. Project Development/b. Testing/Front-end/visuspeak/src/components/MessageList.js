import React from 'react';
import Message from './Message.js';

function MessageList({ messages }) {
    
  return (
    <div className="message-list mx-5 ">
      {messages.map((message, index) => (
        <Message key={index} {...message} />
      ))}
    </div>
  );
}

export default MessageList;
