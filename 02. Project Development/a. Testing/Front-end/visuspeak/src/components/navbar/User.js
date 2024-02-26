import { signOut } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext.js";

const User = () => {
  const {currentUser} = useContext(AuthContext)
  let navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.clear();
    signOut(auth);
    navigate("/");
  };
  return (
    <div>
      <div
        className={`nav-item dropdown mt-2 verticalLine ${
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
          <div class="">
            <i
              class="rounded-circle fa-solid fa-circle-user fa-2xl me-2"
              style={{ color: "#000000" }}
            ></i>
            <div class="status-indicator glowing"></div>
          </div>
          <strong className="me-2">{localStorage.getItem("username")}</strong>
        </Link>
        <ul className="dropdown-menu dropdown-menu-lg-end p-2 shadow-lg">
          <li>
            <Link className="dropdown-item" to="/">
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
