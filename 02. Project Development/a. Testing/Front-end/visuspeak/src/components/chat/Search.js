import React, { useState, useContext, useEffect } from "react";
import { db } from "../../firebase.js";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext.js";
import defaultProfilePicture from "../../assets/images/AccountSettingsHeadshot.jpg";

const Search = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      if (username.trim() === "") {
        setUsers([]);
        return;
      }

      const q = query(
        collection(db, "users"),
        where("displayName", ">=", username),
        where("displayName", "<=", username + "\uf8ff")
      );

      try {
        const querySnapshot = await getDocs(q);
        const fetchedUsers = [];
        querySnapshot.forEach((doc) => {
          fetchedUsers.push(doc.data());
        });
        setUsers(fetchedUsers);
      } catch (error) {
        setErr(true);
      }
    };

    fetchUsers();
  }, [username]);

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
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName || localStorage.getItem("username"),
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error("Error selecting user:", error);
    }
    setUsername(""); // Reset input
    setUsers([]); // Clear suggestions
  };

  return (
    <div
      className="search-container"
      style={{ position: "relative", width: "100%" }}
    >
      <div className="input-group border rounded mb-4">
        <span className="input-group-text input-icon">
          <i
            className="fa-solid fa-magnifying-glass search-icon fa-xl"
            style={{ color: "#006262" }}
          ></i>
        </span>
        <input
          type="search"
          className="form-control search-input"
          aria-label="Search"
          placeholder="Find a user"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {users.length > 0 && (
        <ul
          className="list-group list-group-flush"
          style={{
            position: "absolute",
            width: "calc(100% - 2px)",
            zIndex: 1000,
            top: "100%",
            left: 0,
            margin: "0 -1px",
          }}
        >
          {users.map((user, index) => (
            <li
              key={index}
              className="list-group-item search-field border"
              onClick={() => handleSelect(user)}
              style={{ cursor: "pointer" }}
            >
              <img
              src={user.photoURL || defaultProfilePicture}
              alt="User"
              className="rounded-circle me-2"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
              <span>{user.displayName}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
