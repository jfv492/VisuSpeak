import React, { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useSpeechSynthesis } from "react-speech-kit";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { speak } = useSpeechSynthesis();

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
        className={`message ${
          message.senderId === currentUser.uid ? "mine" : "theirs"
        }`}
      >
        <div className="message-content">
          <span className="username">{message.senderDisplayName}</span>
          <p>{message.text}</p>
        </div>
      </div>
      <span
        className={`time mb-4 ${
          message.senderId === currentUser.uid ? "mine" : "theirs"
        }`}
      >
        {dateString} <i className="fa-solid fa-volume-high" onClick={() => speak({ text: message.text })} style={{cursor: "pointer"}}></i>
      </span>
    </>
  );
};

export default Message;
