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
import NoNotifications from "../../assets/icons/NoNotifications.png";
import { useTranslation } from "react-i18next";

const NotificationsList = ({ userId }) => {
  const { t } = useTranslation();
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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const mobileView = windowWidth < 600;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        {unreadCount != 0 && (
          <span class={`position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger mt-1`}>
            {unreadCount <= 10 ? unreadCount : "10+"}
          </span>
        )}
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
                      <span>
                      {t("NewMessageFrom")} <b>{notification.senderName}</b>:
                      </span>
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
                  </div>
                  <hr class="dropdown-divider" />
                </li>
              </>
            ))}
          </>
        ) : (
          <div className="d-flex fs-6 text-center align-items-center px-2">
            <span>{t("NoNewMessages")}</span>

            {/* <img src={NoNotifications} height="200" className="no-notifications-icon"/> */}
          </div>
        )}
      </ul>
    </>
  );
};

export default NotificationsList;
