import ColourLogo from "../assets/logos/VisuSpeakPrimaryLogo.png";
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  let navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.clear();
    navigate("/");
  };
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  return (
    <>
      <div>
        <nav className="navbar bg-body-tertiary shadow">
          <div className="container-fluid">
            <Link className="navbar-brand mx-5" to="/">
              <img src={ColourLogo} alt="VisuSpeak Logo" height="50" />
            </Link>
            <ul className="nav nav-pills nav-pills-link-active-color justify-content-end mx-5 ">
              <li className="nav-item dropdown">
                <Link
                  className={`nav-link dropdown-toggle mx-1 ${
                    location.pathname === "/chat" ? "active" : ""
                  } ${
                    localStorage.getItem("username") === null ? "disabled" : ""
                  }`}
                  to="/chat"
                  role="button"
                  aria-expanded="false"
                >
                  Chat
                </Link>
                <ul className="dropdown-menu p-2 shadow-lg">
                  <li>
                    <Link className="dropdown-item" to="/">
                      <i
                        class="fa-solid fa-message me-2"
                        style={{ color: "#000000" }}
                      ></i>
                      New Chat
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/">
                      <i
                        class="fa-solid fa-bars me-2"
                        style={{ color: "#000000" }}
                      ></i>
                      Chat History
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link mx-1 ${
                    location.pathname === "/resources" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/resources"
                >
                  ASL Resources
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link mx-1 ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About Us
                </Link>
              </li>
              <li
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
                  <strong className="me-2">
                    {localStorage.getItem("username")}
                  </strong>
                </Link>
                <ul className="dropdown-menu dropdown-menu-lg-end p-2 shadow-lg">
                  <li>
                    <Link className="dropdown-item" to="/">
                      <i
                        class="fa-solid fa-gear me-3"
                        style={{ color: "#000000" }}
                      ></i>
                      Account Settings
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={handleSignOut}
                      to="/"
                    >
                      <i
                        class="fa-solid fa-right-from-bracket me-3"
                        style={{ color: "#000000" }}
                      ></i>
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
