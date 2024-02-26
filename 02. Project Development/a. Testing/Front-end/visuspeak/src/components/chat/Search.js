import React, { useState, useContext } from "react";
import { db } from "../../firebase.js";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext.js";
import { doc, setDoc, updateDoc } from "firebase/firestore";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether group (chats in firestore) exists or not, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const chatRef = doc(db, "chats", combinedId);
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log(res.exists());
      if (res.exists() == false) {
        await setDoc(chatRef, { messages: [] });

        //create user chats
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
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {}
    setUser("");
  };

  return (
    <>
      <div class="input-group border rounded mb-4">
        <span class="input-group-text input-icon">
          <i
            class="fa-solid fa-magnifying-glass search-icon fa-xl"
            style={{ color: "#006262" }}
          ></i>
        </span>

        <input
          type="search"
          class="form-control search-input"
          aria-label="Search"
          placeholder="Find a user"
          list="list-user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <ul className="list-group list-group-flush">
        {user && (
          <li class="list-group-item search-field">
            <div class="btn" onClick={handleSelect}>
              <span>{user.displayName}</span>
            </div>
          </li>
        )}
        {err && <span>User not found</span>}
      </ul>
    </>
  );
};

export default Search;
