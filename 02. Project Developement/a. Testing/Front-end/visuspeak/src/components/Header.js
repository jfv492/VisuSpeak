import ColourLogo from "../images/PrimaryLogo.png";
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div>
        <nav className="navbar bg-body-tertiary shadow-lg">
          <div className="container-fluid">
            <Link className="navbar-brand mx-5" to="/">
              <img src={ColourLogo} alt="VisuSpeak Logo" width="150" />
            </Link>
            <ul className="nav nav-pills nav-pills-link-active-color justify-content-end mx-5 ">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Chat
                </a>
                <ul className="dropdown-menu p-2 shadow-lg">
                  <li>
                    <a className="dropdown-item" href="#">
                      New Chat
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Chat History
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">
                  ASL Resources
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  About Us
                </a>
              </li>
              <li className="nav-item dropdown">
                <Link
                  to="/"
                  className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle dropdown-toggle-split"
                  data-bs-toggle="dropdown"
                  data-bs-display="static"
                  aria-expanded="false"
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt=""
                    width="40"
                    height="40"
                    className="rounded-circle me-2"
                  />
                </Link>
                <ul className="dropdown-menu dropdown-menu-lg-end p-2 shadow-lg">
                  <li>
                    <a className="dropdown-item" href="/">
                      Account Settings
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Logout
                    </a>
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
