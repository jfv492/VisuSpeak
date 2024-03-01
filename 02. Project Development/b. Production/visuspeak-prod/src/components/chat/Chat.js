import React, { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import MessageList from "./MessageList";
import Input from "./Input";
import ChatHeader from "./ChatHeader";

const Chat = () => {
  const { data } = useContext(ChatContext);
  let displayName = data.user?.displayName;
  let photo = data.user?.photoURL;
  return (
    <div className="admin-chat-box rounded-4">
      {displayName ? (
        <>
          <ChatHeader user={displayName} photo={photo}/>

          <div class="chatbox-scrollable">
            <MessageList />
          </div>
          <Input />
        </>
      ) : (
        <div class="centered-text lead p-3">
          Click on a chat to preview messages
        </div>
      )}
    </div>
  );
};

export default Chat;
