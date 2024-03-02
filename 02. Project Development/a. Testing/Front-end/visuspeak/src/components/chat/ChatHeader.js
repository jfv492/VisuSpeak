import React, { useState } from "react";
import ChatAlert from "../ChatAlert";
import ChatActions from "./ChatActions.js";
import defaultProfilePicture from "../../assets/images/AccountSettingsHeadshot.jpg";

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
    <div class="messages-heading row align-items-end mb-1 z-3 position-relative ">
      <div class="">
        <div className="chat-header rounded-4 bg-gradient shadow">
          <div className="user-info col-sm-8">
            <img
              src={props.photo || defaultProfilePicture}
              alt="User"
              className="rounded-circle me-2"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />

            <h3 className="user-name chat-name-ellipsis">{props.user}</h3>
          </div>
          <ChatAlert alert={alert} />
          <ChatActions showAlert={showAlert} />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
