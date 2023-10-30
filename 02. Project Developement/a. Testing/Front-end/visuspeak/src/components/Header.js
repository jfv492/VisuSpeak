import '../VisuSpeak.css';
import ColourLogo from "../images/VisuSpeak_Logo.jpeg";
import React from "react";

export default function Header() {
  return (
    <div>
      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            <img src={ColourLogo} width="150" />
          </a>
          <ul class="nav nav-pills nav-pills-link-active-color justify-content-end">
            <li class="nav-item">
              <a class="active nav-link" aria-current="page" href="/">
                ASL Resources
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/">
                About Us
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                href="/"
                role="button"
                aria-expanded="false"
              >
                User
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="/">
                    Account Settings
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="/">
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
