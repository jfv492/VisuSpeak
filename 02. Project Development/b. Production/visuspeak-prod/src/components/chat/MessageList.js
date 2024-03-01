import React, { useState, useContext, useEffect } from "react";
import Message from "./Message.js";
import { ChatContext } from "../../context/ChatContext.js";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.js";

const groupMessagesByDate = (messages) => {
  const grouped = {};
  messages.forEach((msg) => {
    const messageDate = new Date(msg.date.seconds * 1000)
    const date = messageDate.toDateString();
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(msg);
  });
  return grouped;
};


const MessageList = () => {
  // const [messages, setMessages] = useState([]);
  const [groupedMessages, setGroupedMessages] = useState({});
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      if (doc.exists()) {
        const grouped = groupMessagesByDate(doc.data().messages);
        setGroupedMessages(grouped);
      }
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="messages">
      {Object.keys(groupedMessages).map((date) => (
        <div key={date}>
          <div className="divider">
          <div class="divider-text">
            {new Date(date).toDateString() === new Date().toDateString() ? "Today" : date}</div>
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
