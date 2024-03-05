import React, { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const messageDate = message.date
    ? new Date(message.date.seconds * 1000)
    : new Date();
  const timeOptions = { hour: "2-digit", minute: "2-digit" };
  const dateString = messageDate.toLocaleTimeString([], timeOptions);
  return (
    <>
      <div
        ref={ref}
        class={`message ${
          message.senderId === currentUser.uid ? "mine" : "theirs"
        }`}
      >
        <div class="message-content">
          <span class="username">{message.senderDisplayName}</span>
          <p>{message.text}</p>
        </div>
      </div>
      <span
        class={`time mb-4 ${
          message.senderId === currentUser.uid ? "mine" : "theirs"
        }`}
      >
        {dateString}
      </span>
    </>
  );
};

export default Message;
