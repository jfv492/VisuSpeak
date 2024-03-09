import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ColourLogo from "../assets/logos/VisuSpeakPrimaryLogo.png";
import LoggedOutNavLinks from "../components/navbar/LoggedOutNavLinks.js";
import AdminNavLinks from "../components/navbar/AdminNavLinks.js";

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary shadow">
      <div class="container-fluid">
        <Link className="navbar-brand mx-3" to="/">
          <img src={ColourLogo} className="navbar-logo" alt="VisuSpeak Logo" height="45"/>
        </Link>
        <button
          class="navbar-toggler mx-3"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        {localStorage.getItem("accountType") === null &&<LoggedOutNavLinks />}
        {localStorage.getItem("accountType") === "admin" && <AdminNavLinks />}
      </div>
    </nav>
  );
};

export default Navbar;
