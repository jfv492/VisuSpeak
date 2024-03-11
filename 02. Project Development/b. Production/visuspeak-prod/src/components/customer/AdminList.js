import React, { useState, useEffect, useContext } from "react";
import { realtimeDb, db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import defaultProfilePicture from "../../assets/images/AccountSettingsHeadshot.jpg";
import SettingsUserInfo from "../account_setting/UserInfo.js";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/AuthContext.js";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

const AdminList = (props) => {
  const { t } = useTranslation();
  const [admins, setAdmins] = useState([]);
  const [guests, setGuests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const statusRef = ref(realtimeDb, "/status");
    const unsubscribe = onValue(statusRef, async (snapshot) => {
      const statuses = snapshot.val();
      const onlineUsers = [];

      for (let userId in statuses) {
        if (statuses[userId].state === "online") {
          onlineUsers.push(userId);
        }
      }

      const fetchedUsers = await Promise.all(
        onlineUsers.map(async (userId) => {
          const userDocRef = doc(db, "users", userId);
          const userDocSnap = await getDoc(userDocRef);
          return userDocSnap.exists()
            ? { uid: userId, ...userDocSnap.data() }
            : null;
        })
      );

      const adminsList = fetchedUsers.filter(
        (user) =>
          user?.type === "admin" &&
          user?.displayName !== localStorage.getItem("username")
      );
      const guestsList = fetchedUsers.filter((user) => user?.type !== "admin");

      setAdmins(adminsList);
      setGuests(guestsList);
    });

    return () => unsubscribe();
  }, []);
  const filteredAdmins = admins.filter((admin) =>
    admin.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = async (user) => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const chatRef = doc(db, "chats", combinedId);
      const res = await getDoc(doc(db, "chats", combinedId));

      if (res.exists() === false) {
        await setDoc(chatRef, { messages: [] });

        // Create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            type: user.type,
          },
          [combinedId + ".date"]: serverTimestamp(),
          [combinedId + ".isArchive"]: false,
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName:
              currentUser.displayName || localStorage.getItem("username"),
            photoURL: currentUser.photoURL,
            type: currentUser.type || localStorage.getItem("accountType"),
          },
          [combinedId + ".date"]: serverTimestamp(),
          [combinedId + ".isArchive"]: false,
        });

        console.log(
          user.uid,
          currentUser.displayName || localStorage.getItem("username"),
          currentUser.photoURL,
          currentUser.type
        );
      }
    } catch (error) {
      console.error("Error selecting user:", error);
    }
    setUsername(""); // Reset input
    setUsers([]); // Clear suggestions
  };
  return (
    <div>
      <div className="mb-2" >
        <h5>{t("AvailableAdmins")}</h5>
        <div className="d-flex justify-content-center admin-list align-items-center">
          {filteredAdmins.map((user) => (
            <div
              key={user.uid}
              className="text-center m-3"
              onClick={() => handleSelect(user)}
              style={{ cursor: "pointer" }}
            >
              <div
                className=""
                style={{ position: "relative", display: "inline-block" }}
              >
                <img
                  src={user.photoURL || defaultProfilePicture}
                  alt="Admin"
                  className="rounded-circle"
                  style={{ height: "50px", width: "50px", objectFit: "cover" }}
                />
                <i
                  className={`fa-solid fa-circle-check`}
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
              </div>
              <p>{user.displayName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminList;
