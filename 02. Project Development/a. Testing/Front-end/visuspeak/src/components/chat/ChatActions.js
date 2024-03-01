import React, { useEffect, useState, useContext } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from "../../context/ChatContext.js";
import { db } from "../../firebase.js";

const ChatActions = (props) => {
  const [messages, setMessages] = useState([]);
  const { data, dispatch } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  const copyMessagesToClipboard = async () => {
    // Format messages into a single string
    const formattedMessages = messages
      .map((msg, index) => {
        // Example format: "1: [SenderID] MessageText - Timestamp"
        const messageDate = msg.date
          ? new Date(msg.date.seconds * 1000)
          : new Date();
        return `${index + 1}: [${msg.senderDisplayName}] ${
          msg.text
        } - ${messageDate}`;
      })
      .join("\n");

    try {
      await navigator.clipboard.writeText(formattedMessages);
      props.showAlert("Messages copied to clipboard!", "success");
    } catch (err) {
      console.error("Failed to copy messages: ", err);
      props.showAlert("Failed to copy messages", "danger");
    }
  };

  const handleCancelClick = () => {
    dispatch({ type: "RESET_CHAT" });
  };
  return (
    <div className="row chat-actions">
      <button
        class="btn chat-action-button bg-gradient me-2"
        type="button"
        aria-expanded="false"
        onClick={copyMessagesToClipboard}
      >
        <i class="fa-regular fa-copy"></i>
      </button>
      <button
        class="btn chat-action-button bg-gradient me-2"
        type="button"
        aria-expanded="false"
        onClick={handleCancelClick}
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};

export default ChatActions;
