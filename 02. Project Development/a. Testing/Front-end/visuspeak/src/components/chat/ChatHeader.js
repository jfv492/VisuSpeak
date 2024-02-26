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
              <i
                class="rounded-circle fa-solid fa-circle-user fa-2xl me-2"
                style={{ color: "#000" }}
              ></i>
              <div class="status-indicator glowing"></div>
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
