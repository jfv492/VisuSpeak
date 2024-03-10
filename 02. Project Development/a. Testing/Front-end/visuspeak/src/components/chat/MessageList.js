import React, { useState, useContext, useEffect } from "react";
import Message from "./Message.js";
import { ChatContext } from "../../context/ChatContext.js";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.js";
import { useTranslation } from "react-i18next";

// This function remains outside since it's not directly using the hook
const groupMessagesByDate = (messages, currentLanguage) => {
  const grouped = {};
  messages.forEach((msg) => {
    const messageDate = new Date(msg.date.seconds * 1000);
    const options = { weekday: "short", month: "short", day: "numeric" };
    let date = messageDate.toLocaleDateString(currentLanguage === "en" ? "en-ca" : "fr-ca", options);
    
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(msg);
  });
  return grouped;
};

const MessageList = () => {
  const [groupedMessages, setGroupedMessages] = useState({});
  const { data } = useContext(ChatContext);
  const { i18n } = useTranslation(); // Moved inside the component
  const currentLanguage = i18n.language; // Moved inside the component

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      if (doc.exists()) {
        // Pass the current language to the function
        const grouped = groupMessagesByDate(doc.data().messages, currentLanguage);
        setGroupedMessages(grouped);
      }
    });

    return () => {
      unSub();
    };
  }, [data.chatId, currentLanguage]); // Add currentLanguage as a dependency

  return (
    <div className="messages">
      {Object.keys(groupedMessages).map((date) => (
        <div key={date}>
          <div className="divider">
            <div className="divider-text">
              {new Date(date).toDateString() === new Date().toDateString() ? "Today" : date}
            </div>
          </div>
          {groupedMessages[date].map((message) => (
            <Message message={message} key={message.id} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
