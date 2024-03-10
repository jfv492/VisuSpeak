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
import { useTranslation } from "react-i18next";

const Search = (props) => {
  const { t } = useTranslation();
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
        // Fetch users based on displayName, but filter further in the application
        let q = query(
          usersRef,
          where("displayName", ">=", username),
          where("displayName", "<=", username + "\uf8ff"),
        );
    
        try {
          const querySnapshot = await getDocs(q);
          const organizationName = localStorage.getItem("organizationName");
          const fetchedUsers = [];
          querySnapshot.forEach((doc) => {
            const user = doc.data();
            // Filter by type and organizationName in the application
            if (user.type === "admin" && user.organizationName === organizationName) {
              fetchedUsers.push(user);
            }
          });
          setUsers(fetchedUsers);
        } catch (error) {
          console.error("Error fetching users:", error);
          setErr(true);
        }
      };
    
      fetchUsers();
    }, [username, currentUser?.displayName]);
    

  const handleSortChange = (sortOrder) => {
    dispatch({ type: "CHANGE_SORT_ORDER", payload: sortOrder });
  };

  const handleUserTypeChange = (e) => {
    const userType = e.target.name;
    const isChecked = e.target.checked;

    if (
      !isChecked &&
      data.userTypes.length === 1 &&
      data.userTypes.includes(userType)
    ) {
      props.showAlert("You must select at least one user type.", "danger");
      return; // Exit without making changes
    }

    dispatch({ type: "TOGGLE_USER_TYPE", payload: userType });
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
    <div
      className="search-container"
      style={{ position: "relative", width: "100%" }}
    >
      <div className="d-flex align-items-center">
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
            placeholder={t("SearchPlaceholder")}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div class="dropdown">
          <i
            class="fa-solid fa-filter fs-4 ms-2"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></i>
          <ul class="dropdown-menu fw-medium fs-6 p-2">
            <li className="mb-2">
              <input
                type="checkbox"
                name="admin" // Use appropriate values for identifying user types
                checked={data.userTypes.includes("admin")} // Ensure checkbox state reflects context
                onChange={handleUserTypeChange}
              />
              <label class="form-check-label ms-2 mt-1" for="adminCheckbox">
                {t("Admin")}
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                name="guest"
                checked={data.userTypes.includes("guest")}
                onChange={handleUserTypeChange}
              />
              <label class="form-check-label ms-2 mt-1" for="guestCheckbox">
                {t("Guest")}
              </label>
            </li>
          </ul>
        </div>
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
        {localStorage.getItem("accountType") === "admin" && (
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
                {t("Back")}
              </>
            ) : (
              <>
                <i class="fa-solid fa-box-archive me-2"></i>
                {t("Archive")}
              </>
            )}
          </div>
        )}
        <div class="dropdown" style={{ cursor: "pointer" }}>
          <div
            class="fw-medium fs-6"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {sortOrderText === "Most Recent" ? (
              <>
                {t("MostRecent")}
                <i class="fa-solid fa-arrow-down-short-wide ms-2"></i>
              </>
            ) : (
              <>
                {t("LeastRecent")}
                <i class="fa-solid fa-arrow-up-wide-short ms-2"></i>
              </>
            )}
          </div>
          <ul className="dropdown-menu" aria-labelledby="sortDropdown">
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleSortChange("mostRecent")}
              >
                {t("MostRecent")}
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleSortChange("leastRecent")}
              >
                {t("LeastRecent")}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Search;
