import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests

function Message({ username, text, timestamp }) {
  return (
    <div className={`message `}>
      <span className="user">{username}</span>

      <p className="text">{text}</p>
      <span className="timestamp">{timestamp}</span>
    </div>
  );
}

export default Message;
