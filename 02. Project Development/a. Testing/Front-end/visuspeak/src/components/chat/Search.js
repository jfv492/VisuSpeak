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
import { ChatContext } from "../../context/ChatContext.js";
import defaultProfilePicture from "../../assets/images/AccountSettingsHeadshot.jpg";

const Search = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data, dispatch, toggleShowArchived } = useContext(ChatContext);

  const sortOrderText =
    data.sortOrder === "mostRecent" ? "Most Recent" : "Least Recent";

  useEffect(() => {
    const fetchUsers = async () => {
      if (username.trim() === "") {
        setUsers([]);
        return;
      }

      const usersRef = collection(db, "users");

      let q = query(
        usersRef,
        where("displayName", "!=", currentUser.displayName),
        where("displayName", ">=", username),
        where("displayName", "<=", username + "\uf8ff")
      );

      console.log("User list:", q);

      if (localStorage.getItem("accountType") === "admin") {
        q = query(
          usersRef,
          where("displayName", "!=", currentUser.displayName),
          where("displayName", ">=", username),
          where("displayName", "<=", username + "\uf8ff")
        );
      }

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

  const handleSortChange = (sortOrder) => {
    dispatch({ type: "CHANGE_SORT_ORDER", payload: sortOrder });
  };

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
          [combinedId + ".isArchive"]: false,
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName:
              currentUser.displayName || localStorage.getItem("username"),
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
          [combinedId + ".isArchive"]: false,
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
      <div className="input-group border rounded">
        <span className="input-group-text input-icon">
          <i
            className="fa-solid fa-magnifying-glass search-icon"
            style={{ color: "#006262" }}
          ></i>
        </span>
        <input
          type="search"
          className="form-control search-input"
          aria-label="Search"
          placeholder="Search user..."
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
      <div className="d-flex justify-content-between my-2 mx-1">
        <div class="dropdown">
          <div
            class="dropdown-toggle fw-medium fs-6"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {sortOrderText}
          </div>
          <ul className="dropdown-menu" aria-labelledby="sortDropdown">
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleSortChange("mostRecent")}
              >
                Most Recent
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleSortChange("leastRecent")}
              >
                Least Recent
              </a>
            </li>
          </ul>
        </div>
        <div
          class="fw-medium fs-6"
          style={{ cursor: "pointer" }}
          onClick={() => {
            toggleShowArchived();
          }}
        >
          {data.showArchived ? (
            <>
              <i class="fa-solid fa-arrow-left me-2"></i>
              Back
            </>
          ) : (
            <>
              <i class="fa-solid fa-box-archive me-2"></i>
              Archive
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
