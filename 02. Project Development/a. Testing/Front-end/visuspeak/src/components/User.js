import React from "react";
import { Link, useNavigate } from "react-router-dom";

const User = () => {
  let navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.clear();
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
          <div className="">
            <i
              className="rounded-circle fa-solid fa-circle-user fa-2xl me-2"
              style={{ color: "#000000" }}
            ></i>
            <div className="status-indicator glowing"></div>
          </div>
          <strong className="me-2">{localStorage.getItem("username")}</strong>
        </Link>
        <ul className="dropdown-menu dropdown-menu-lg-end p-2 shadow-lg">
          <li>
            <Link className="dropdown-item" to="/">
              <i className="fa-solid fa-gear me-3" style={{ color: "#000000" }}></i>
              Account Settings
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item" onClick={handleSignOut} to="/">
              <i
                className="fa-solid fa-right-from-bracket me-3"
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
