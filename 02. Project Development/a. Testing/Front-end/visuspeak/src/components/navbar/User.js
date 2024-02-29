import { signOut } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext.js";
import { setUserOffline } from "../../utils/UserPresence.js";

const User = () => {
  const { currentUser } = useContext(AuthContext);
  let navigate = useNavigate();
  const handleSignOut = async () => {
    // Set user status to offline
    if (currentUser && currentUser.uid) {
      await setUserOffline(currentUser.uid);
    }
    // Clear local storage and sign out
    localStorage.clear();
    await signOut(auth);
    navigate("/");
  };

  return (
    <div>
      <div
        className={`nav-item dropdown verticalLine ${
          localStorage.getItem("username") === null ? "d-none" : ""
        }`}
      >
        <Link
          to="/"
          className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle dropdown-toggle-split"
          data-bs-toggle="dropdown"
          data-bs-display="static"
          aria-expanded="false"
        >
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src={currentUser?.photoURL}
              alt="User"
              className="rounded-circle"
              style={{ width: "45px", height: "45px", objectFit: "cover" }}
            />
            <i
              className="fa-solid fa-circle-check"
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

          <strong className="mx-2">{localStorage.getItem("username")}</strong>
        </Link>
        <ul className="dropdown-menu dropdown-menu-lg-end p-2 shadow-lg">
          <li>
            <Link className="dropdown-item" to="/accountsettings">
              <i class="fa-solid fa-gear me-3" style={{ color: "#000000" }}></i>
              Account Settings
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item" onClick={handleSignOut} to="/">
              <i
                class="fa-solid fa-right-from-bracket me-3"
                style={{ color: "#000000" }}
              ></i>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default User;
