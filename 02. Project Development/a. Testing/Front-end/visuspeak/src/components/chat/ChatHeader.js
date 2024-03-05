import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext.js";
import { ChatContext } from "../../context/ChatContext.js";
import { updateDoc, getDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../firebase.js";
import ChatAlert from "../ChatAlert";
import ChatActions from "./ChatActions.js";
import defaultProfilePicture from "../../assets/images/AccountSettingsHeadshot.jpg";

const ChatHeader = (props) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
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

  console.log("Archive? ", data.date);

  const handleClick = async () => {
    // Check if chatId is valid
    if (!data.chatId || data.chatId === "null") {
      console.error("No chat selected");
      // You can also set an error message state and display it to the user
      return;
    }

    let varIsArchive;

    const userDoc = await getDoc(doc(db, "users", currentUser.uid));
    if (userDoc.exists()) {
      varIsArchive = userDoc.data().isArchive;
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".isArchive"]: !varIsArchive,
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".isArchive"]: !varIsArchive,
    });
  };
  return (
    <div class="messages-heading row align-items-end mb-1 z-3 position-relative ">
      <div class="">
        <div className="chat-header rounded-3 bg-gradient shadow">
          <div className="user-info col-sm-8">
            <img
              src={props.photo || defaultProfilePicture}
              alt="User"
              className="rounded-circle me-2 shadow"
              style={{ width: "20%", objectFit: "cover" }}
            />

            <h4 className="user-name chat-name-ellipsis">{props.user}</h4>
            <button
              class="btn chat-action-button bg-gradient me-2"
              type="button"
              aria-expanded="false"
              onClick={handleClick}
            >
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
          </div>
          <ChatAlert alert={alert} />
          <ChatActions showAlert={showAlert} />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
