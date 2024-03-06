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
    <div className="">
      {displayName ? (
        <>
          <ChatHeader user={displayName} photo={photo} />

          <MessageList />
          <div class="chat-input-container">
            <Input />
          </div>
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
