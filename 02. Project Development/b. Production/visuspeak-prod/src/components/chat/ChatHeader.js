import React, { useState } from "react";
import ChatAlert from "../ChatAlert";
import ChatActions from "./ChatActions.js";

const ChatHeader = (props) => {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };
  return (
    <div class="messages-heading row align-items-end mb-1 z-3 position-relative">
      <div class="">
        <div className="chat-header rounded-4 bg-gradient shadow">
          <div className="user-info">
            <div class="">
            <img
                  src={props.photo}
                  alt="User"
                  className="rounded-circle me-2"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
            </div>
            <h3 className="user-name">{props.user}</h3>
          </div>
          <ChatAlert alert={alert}/>
          <ChatActions showAlert={showAlert}/>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
