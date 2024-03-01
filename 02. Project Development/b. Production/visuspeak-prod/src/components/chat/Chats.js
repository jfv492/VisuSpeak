import React, { useEffect, useState, useContext } from "react";
import { doc, getDoc, onSnapshot, collection } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext.js";
import { ChatContext } from "../../context/ChatContext.js";
import { db } from "../../firebase.js";
import {
  onUserStatusChanged,
  refreshUserOnlineStatus,
} from "../../utils/UserPresence.js";

const Chats = () => {
  const [chatsWithStatus, setChatsWithStatus] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { data, dispatch } = useContext(ChatContext);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    let interval;
    let unsubFromUserChats = () => {};

    const fetchUsersPhotoUrl = async (uid) => {
      const userDoc = await getDoc(doc(db, 'users', uid));
      return userDoc.exists() ? userDoc.data().photoURL : '';
    };
  

    if (currentUser?.uid) {
      interval = setInterval(() => {
        refreshUserOnlineStatus(currentUser.uid);
      }, 10000); // Increase interval to reduce frequency

      unsubFromUserChats = onSnapshot(doc(db, 'userChats', currentUser.uid), async (doc) => {
        const chatsData = doc.data();
        if (chatsData) {
          let chatsArray = await Promise.all(Object.entries(chatsData).map(async ([id, chatInfo]) => {
            const photoURL = await fetchUsersPhotoUrl(chatInfo.userInfo.uid);
            return {
              id,
              ...chatInfo,
              status: 'offline', // Default to offline until the real status is fetched
              userInfo: {
                ...chatInfo.userInfo,
                photoURL, // Add photoURL to userInfo
              },
            };
          }));

          chatsArray.sort((a, b) => {
            const dateB = b.date ? b.date.seconds : 0;
            const dateA = a.date ? a.date.seconds : 0;
            return dateB - dateA;
          });

          setChatsWithStatus(chatsArray);

          chatsArray.forEach((chat) => {
            onUserStatusChanged(chat.userInfo.uid, (status) => {
              setChatsWithStatus((prevChats) => {
                return prevChats.map((c) => {
                  if (c.id === chat.id) {
                    return { ...c, status: status.state };
                  }
                  return c;
                });
              });
            });
          });
        }
      });
    }

    return () => {
      clearInterval(interval);
      unsubFromUserChats();
    };
  }, [currentUser?.uid]);

  useEffect(() => {
    if (data.chatId === "null") {
      setSelectedChat(null);
    }
  }, [data.chatId]);

  const handleSelect = (chat) => {
    dispatch({ type: "CHANGE_USER", payload: chat.userInfo });
    setSelectedChat(chat.userInfo.uid);
  };

  return (
    <div className="list-group list-group-flush rounded-4 admin-chat-list">
      {chatsWithStatus.map((chat) => {
        const date = chat.date
          ? new Date(chat.date.seconds * 1000)
          : new Date();
        const options = { weekday: "short", month: "short", day: "numeric" };
        const formattedDate = date.toLocaleString("en-us", options);
        const isActive = chat.userInfo.uid === selectedChat;

        return (
          <a
            className={`list-group-item list-group-item-action chat-list-item bg-gradient ${
              isActive ? "active" : ""
            }`}
            key={chat.id}
            onClick={() => handleSelect(chat)}
          >
            <div className="d-flex w-100 justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div
                  className="me-3"
                  style={{ position: "relative", display: "inline-block" }}
                >
                  <img
                    src={chat.userInfo.photoURL || 'default-image-url-if-needed'}
                    alt="User"
                    className="rounded-circle"
                    style={{
                      width: "45px",
                      height: "45px",
                      objectFit: "cover",
                    }}
                  />
                  <i
                    className={`fa-solid ${
                      chat.status === "offline" ? "fa-clock" : "fa-circle-check"
                    }`}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      color: chat.status === "offline" ? "#fec700" : "#77bb41",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      padding: "3px",
                      transform: "translate(30%, 30%)",
                    }}
                  />
                </div>
                <div>
                  <h5 className="mb-0 chat-name-ellipsis">
                    {chat.userInfo?.displayName}
                  </h5>
                  <div className="last-message">
                    {chat.lastMessage?.text != null && (
                      <>
                        <strong>{chat.lastSender?.lastSenderName}: </strong>
                        {chat.lastMessage?.text}
                      </>
                    )}
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
