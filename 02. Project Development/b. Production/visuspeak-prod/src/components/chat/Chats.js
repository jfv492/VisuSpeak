import React, { useEffect, useState, useContext } from "react";
import defaultProfilePicture from "../../assets/images/AccountSettingsHeadshot.jpg";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext.js";
import { ChatContext } from "../../context/ChatContext.js";
import { db } from "../../firebase.js";
import Notification from "../notifications/NotificationList.js";
import {
  onUserStatusChanged,
  refreshUserOnlineStatus,
} from "../../utils/UserPresence.js";
import { useTranslation } from "react-i18next";

const Chats = () => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  const [chatsWithStatus, setChatsWithStatus] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { data, dispatch } = useContext(ChatContext);
  const [selectedChat, setSelectedChat] = useState(null);
  const [lastKnownChats, setLastKnownChats] = useState({});
  const showArchived = data.showArchived;
  const sortOrder = data.sortOrder;

  useEffect(() => {
    let interval;
    let unsubFromUserChats = () => {};

    if (!currentUser || !currentUser.uid) {
      return;
    }

    if (currentUser?.uid) {
      // Only set the interval if currentUser is defined
      interval = setInterval(() => {
        refreshUserOnlineStatus(currentUser.uid);
      }, 10000); // Increase interval to reduce frequency

      const fetchUsersPhotoUrl = async (uid) => {
        const userDoc = await getDoc(doc(db, "users", uid));
        return userDoc.exists() ? userDoc.data().photoURL : "";
      };

      const userChatsRef = doc(db, "userChats", currentUser.uid);

      unsubFromUserChats = onSnapshot(userChatsRef, async (docSnapshot) => {
        if (docSnapshot.exists()) {
          const chatsData = docSnapshot.data();
          let chatsArray = [];

          if (chatsData) {
            // Since this is async, we use 'let' to define chatsArray
            chatsArray = await Promise.all(
              Object.entries(chatsData).map(async ([id, chatInfo]) => {
                let photoURL = defaultProfilePicture; // Default image URL in case userInfo is undefined
                if (chatInfo.userInfo && chatInfo.userInfo.uid) {
                  photoURL = await fetchUsersPhotoUrl(chatInfo.userInfo.uid);
                }
                return {
                  id,
                  ...chatInfo,
                  status: "offline",
                  userInfo: {
                    ...chatInfo.userInfo,
                    photoURL,
                  },
                };
              })
            );

            chatsArray.sort((a, b) => {
              const dateA = a.date ? a.date.seconds : 0;
              const dateB = b.date ? b.date.seconds : 0;
              return sortOrder === "leastRecent"
                ? dateA - dateB
                : dateB - dateA;
            });

            if (localStorage.getItem("accountType") === "admin") {
              const filteredChats = chatsArray.filter((chat) => {
                const isUserTypeSelected = data.userTypes.includes(
                  chat.userInfo?.type
                );
                const isArchiveStatusMatch =
                  showArchived === Boolean(chat.isArchive);
                return isUserTypeSelected && isArchiveStatusMatch;
              });
              setChatsWithStatus(filteredChats);
            } else {
              setChatsWithStatus(chatsArray);
            }

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

          // Now you can log the variables because they are defined in this scope
          console.log("Chats Data:", chatsData);
          console.log("Chats Array:", chatsArray);
        } else {
          console.log(`No chats found for user ${currentUser.uid}`);
        }
      });
    } else {
      console.log("No current user found.");
    }

    return () => {
      clearInterval(interval);
      unsubFromUserChats();
    };
  }, [currentUser, sortOrder, showArchived, data.userTypes]);

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
    <>
      <div className="list-group list-group-flush rounded-3 admin-chat-list">
        {chatsWithStatus.map((chat) => {
          const date = chat.date
            ? new Date(chat.date.seconds * 1000)
            : new Date();
          const options = { weekday: "short", month: "short", day: "numeric" };
          let formattedDate;
          {
            currentLanguage === "en"
              ? (formattedDate = date.toLocaleString("en-ca", options))
              : (formattedDate = date.toLocaleString("fr-ca", options));
          }
          const isActive = chat.userInfo.uid === selectedChat;

          return (
            <a
              className={`list-group-item list-group-item-action chat-list-item bg-gradient ${
                isActive ? "active" : ""
              }`}
              href="#"
              key={chat.id}
              onClick={() => handleSelect(chat)}
            >
              <div className="d-flex align-items-center">
                <div
                  className="me-3"
                  style={{ position: "relative", display: "inline-block" }}
                >
                  {chat.userInfo?.photoURL === "" ? (
                    <img
                      src={defaultProfilePicture}
                      alt="User"
                      className="rounded-circle shadow"
                      style={{
                        width: "45px",
                        height: "45px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <img
                      src={chat.userInfo?.photoURL}
                      alt="User"
                      className="rounded-circle shadow"
                      style={{
                        width: "45px",
                        height: "45px",
                        objectFit: "cover",
                      }}
                    />
                  )}

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
                <div className="flex-fill">
                  <div className="d-flex">
                    <div className="d-flex align-items-center w-100">
                      <span
                        class={`badge rounded-pill me-1 ${
                          chat.userInfo?.type === "admin"
                            ? "text-bg-primary"
                            : "text-bg-secondary"
                        }`}
                      >
                        {chat.userInfo?.type === "guest" ? `${t("Guest")}` : `${t("Admin")}`}
                      </span>
                      <h5 className="mb-1 chat-name-ellipsis">
                        {chat.userInfo?.displayName}
                      </h5>

                      <small className="ms-auto w-50 text-end">
                        {formattedDate}
                      </small>
                    </div>
                  </div>
                  <div className="last-message fw-light two-line-ellipsis">
                    {chat.lastMessage?.text != null && (
                      <>
                        <strong>{chat.lastSender?.lastSenderName}: </strong>
                        {chat.lastMessage?.text}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
};

export default Chats;