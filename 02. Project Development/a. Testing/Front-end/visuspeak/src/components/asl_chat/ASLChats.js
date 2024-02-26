import React, { useEffect, useState, useContext } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext.js";
import { ChatContext } from "../../context/ChatContext.js";
import { db } from "../../firebase.js";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null); // New state for tracking selected chat
  const { currentUser } = useContext(AuthContext);
  const { data, dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  useEffect(() => {
    // Reset selectedChat when the chat is reset in the context
    if (data.chatId === "null") {
      setSelectedChat(null);
    }
  }, [data.chatId]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    setSelectedChat(u.uid); // Update the selected chat
  };

  console.log(Object.entries[chats]);
  return (
    <div className="list-group list-group-flush rounded-4 asl-chat-list">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => {
          const date = chat[1].date
            ? new Date(chat[1].date.seconds * 1000)
            : new Date();
          const formattedDate = date.toLocaleString();

          // Determine if the current chat is the selected chat
          const isActive = chat[1].userInfo.uid === selectedChat;

          return (
            <a
              className={`list-group-item list-group-item-action chat-list-item bg-gradient ${isActive ? 'active' : ''}`}
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{chat[1].userInfo.displayName}</h5>
                <small>{formattedDate}</small>
              </div>
              <div className="two-line-ellipsis small">
                <b>{chat[1].lastSender?.lastSenderName}:</b> {chat[1].lastMessage?.text}
              </div>
            </a>
          );
        })}
    </div>
  );
};

export default Chats;
