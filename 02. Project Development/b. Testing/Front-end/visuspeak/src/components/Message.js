// Message.js
import React from 'react';

function Message({ user, text, timestamp }) {
  return (
    <div className={`message ${user.type}`}>
      <span className="user">{user.username}</span>
      <p className="text">{text}</p>
      <span className="timestamp">{timestamp}</span>
    </div>
  );
}

export default Message;
