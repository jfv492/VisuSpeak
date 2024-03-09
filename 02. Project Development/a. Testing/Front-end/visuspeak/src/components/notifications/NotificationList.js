import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase.js";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { ChatContext } from "../../context/ChatContext.js";

const NotificationsList = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const { dispatch } = useContext(ChatContext);
  const [selectedChat, setSelectedChat] = useState(null);
  let navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, "users", userId, "notifications"),
      where("read", "==", false)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notifications = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(notifications);
    });
    const q1 = query(
      collection(db, "users", userId, "notifications"),
      where("read", "==", false)
    );
    const unsubscribeCount = onSnapshot(q1, (querySnapshot) => {
      const notifications = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(notifications);
      // Set the count of unread notifications
      setUnreadCount(notifications.length);
    });

    return () => {
      unsubscribe();
      unsubscribeCount();
    };
  }, [userId]);

  const handleClearNotification = async (notificationId) => {
    await deleteDoc(doc(db, "users", userId, "notifications", notificationId));
    // Optionally, filter out the notification from the local state for an immediate UI update
  };

  const handleMarkAsRead = async (notificationId) => {
    const notificationRef = doc(
      db,
      "users",
      userId,
      "notifications",
      notificationId
    );
    await updateDoc(notificationRef, { read: true });
  };

  const handleSelect = (senderId, senderName) => {
    dispatch({ type: "CHANGE_USER", payload: senderName });
    // setSelectedChat(senderId);
    navigate("/chat");
  };

  return (
    <>
      <button
        class="nav-link  btn-raised"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i class="fa-solid fa-bell fs-3"></i>
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ">
        {unreadCount <= 100 ? unreadCount : "100 +"}
        </span>
      </button>
      <ul class="dropdown-menu">
        {notifications.map((notification) => (
          <li key={notification.id}>
            <a class="dropdown-item" href="#">
              <p>{notification.text}</p>
              <button onClick={() => handleMarkAsRead(notification.id)}>
                Mark as Read
              </button>
              {/* <button onClick={() => handleSelect(notification.senderName, notification.senderId)}>
              Go to chat
            </button> */}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NotificationsList;
