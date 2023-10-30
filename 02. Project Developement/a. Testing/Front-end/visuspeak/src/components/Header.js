import '../VisuSpeak.css';
import ColourLogo from "../images/VisuSpeak_Logo.jpeg";
import React from "react";
import {
    Link
  } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={ColourLogo} alt="VisuSpeak Logo" width="150" />
          </Link>
          <ul className="nav nav-pills nav-pills-link-active-color justify-content-end">
            <li className="nav-item">
              <a className="active nav-link" aria-current="page" href="/">
                ASL Resources
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                About Us
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                href="/"
                role="button"
                aria-expanded="false"
              >
                User
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/">
                    Account Settings
                  </a>
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
  );
}
