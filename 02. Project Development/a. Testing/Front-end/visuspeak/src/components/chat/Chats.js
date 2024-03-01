import React, { useEffect, useState, useContext } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext.js";
import { ChatContext } from "../../context/ChatContext.js";
import { db, realtimeDb } from "../../firebase.js";
import {
  onUserStatusChanged,
  refreshUserOnlineStatus,
} from "../../utils/UserPresence.js";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatsWithStatus, setChatsWithStatus] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { data, dispatch } = useContext(ChatContext);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentUser?.uid) {
        refreshUserOnlineStatus(currentUser.uid);
      }
    }, 5000); // refresh status every 60 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [currentUser?.uid]);

  useEffect(() => {
    // Listen for changes to the user's chats
    if (currentUser && currentUser.uid) {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        const chatsData = doc.data();
        if (chatsData) {
          // Store the chat data and set up listeners for each user's online status
          const statusListeners = Object.entries(chatsData).map(
            ([chatId, chatInfo]) => {
              return onUserStatusChanged(chatInfo.userInfo.uid, (status) => {
                setChatsWithStatus((prevChats) => {
                  return prevChats.map((c) => {
                    if (c.id === chatId) {
                      return { ...c, status: status.state };
                    }
                    return c;
                  });
                });
              });
            }
          );

          // Set the initial chats with the offline status as default
          setChatsWithStatus(
            Object.entries(chatsData).map(([id, chatInfo]) => ({
              id,
              ...chatInfo,
              status: "offline", // Default to offline until the real status is fetched
            }))
          );

          // Return a cleanup function that unsubscribes from all listeners
          return () => {
            statusListeners.forEach((unsub) => unsub());
          };
        }
      });

      

      // Cleanup subscription on unmount
      return () => unsub();
    }
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
    <div className="list-group list-group-flush rounded-4 admin-chat-list">
      {chatsWithStatus.map((chat) => {
        const date = chat.date
          ? new Date(chat.date.seconds * 1000)
          : new Date();
        const formattedDate = date.toLocaleString();
        const isActive = chat.uid === selectedChat; // Ensure that selectedChat is tracking the right identifier

        return (
          <a
            className={`list-group-item list-group-item-action chat-list-item bg-gradient ${
              isActive ? "active" : ""
            }`}
            key={chat.id} // Ensure that each chat has a unique identifier
            onClick={() => handleSelect(chat.userInfo)}
          >
            <div className="d-flex w-100 justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div
                  className="me-3"
                  style={{ position: "relative", display: "inline-block" }}
                >
                  <img
                    src={currentUser?.photoURL}
                    alt="User"
                    className="rounded-circle"
                    style={{
                      width: "45px",
                      height: "45px",
                      objectFit: "cover",
                    }}
                  />
                  {chat.status == "offline" ? (
                    <i
                      className="fa-solid fa-clock"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        color: "#fec700",
                        backgroundColor: "white",
                        borderRadius: "50%",
                        padding: "3px",
                        transform: "translate(30%, 30%)",
                      }}
                    />
                  ) : (
                    <i
                      className="fa-solid fa-circle-check"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        color: "#77bb41",
                        backgroundColor: "white",
                        borderRadius: "50%",
                        padding: "3px",
                        transform: "translate(30%, 30%)",
                      }}
                    />
                  )}
                </div>
                <div>
                  <div className="d-flex">
                    <h5 className="mb-0">{chat.userInfo?.displayName}</h5>
                  </div>
                  <div className="last-message">
                    <strong>{chat.lastSender?.lastSenderName}: </strong>
                    {chat.lastMessage?.text}
                  </div>
                </div>
              </div>
              <small>{formattedDate}</small>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default Chats;
