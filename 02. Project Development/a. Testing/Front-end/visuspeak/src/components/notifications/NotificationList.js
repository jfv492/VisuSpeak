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
  writeBatch,
  getDocs,
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
      const notifications = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => b.date.toMillis() - a.date.toMillis());
      setNotifications(notifications);
      setUnreadCount(notifications.length);
    });

    return () => {
      unsubscribe();
    };
  }, [userId]);

  const handleClearNotifications = async () => {
    const q = query(
      collection(db, "users", userId, "notifications"),
      where("read", "==", false)
    );
    const snapshot = await getDocs(q);
    const batch = writeBatch(db);

    snapshot.docs.forEach((docSnapshot) => {
      const docRef = doc(db, "users", userId, "notifications", docSnapshot.id);
      batch.update(docRef, { read: true });
    });

    await batch.commit();
    setNotifications([]); // Clears notifications from state
    setUnreadCount(0); // Reset unread count
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

  // const handleSelect = (senderId, senderName) => {
  //   dispatch({ type: "CHANGE_USER", payload: senderName });
  //   // setSelectedChat(senderId);
  //   navigate("/chat");
  // };

  return (
    <>
      <button
        class="nav-link btn-raised"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i class="fa-solid fa-bell fs-3"></i>
        { unreadCount != 0 && <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger mt-1">
          {unreadCount <= 10 ? unreadCount : "10+"}
        </span>}
      </button>

      <ul class="dropdown-menu dropdown-menu-end notification-list fs-6">
        {unreadCount != 0 ? (
          <>
            <li>
              <div
                onClick={handleClearNotifications}
                className="text-end fst-italic notification-action btn-raised px-2 rounded-3"
              >
                <i class="fa-solid fa-trash me-2"></i>
                Clear All
              </div>
            </li>
            <hr class="dropdown-divider" />
            {notifications.map((notification) => (
              <>
                <li key={notification.id}>
                  <div class="d-flex align-items-end dropdown-item" href="#">
                    <div
                      className="two-line-ellipsis notification-text col-sm-8 me-3"
                      style={{ width: "20rem" }}
                    >
                      <span>New Message from <b>{notification.senderName}</b>:</span>
                      <br />
                      {notification.text}
                    </div>
                    <div
                      className="ms-auto fst-italic notification-action btn-raised px-2 rounded-3"
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      <i class="fa-solid fa-check me-2"></i>
                      Mark as Read
                    </div>
                    {/* <button onClick={() => handleSelect(notification.senderName, notification.senderId)}>
              Go to chat
            </button> */}
                  </div>
                  <hr class="dropdown-divider" />
                </li>
              </>
            ))}
          </>
        ) : (
          <div className="fs-6">No new messages</div>
        )}
      </ul>
    </>
  );
};

export default NotificationsList;
