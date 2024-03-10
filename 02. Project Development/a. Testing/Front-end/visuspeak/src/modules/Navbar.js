import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ColourLogo from "../assets/logos/VisuSpeakPrimaryLogo.png";
import LoggedOutNavLinks from "../components/navbar/LoggedOutNavLinks.js";
import AdminNavLinks from "../components/navbar/AdminNavLinks.js";
import CustomerNavLinks from "../components/navbar/CustomerNavLinks.js";
import LanguageSwitcher from "../components/navbar/LanguageSwitcher.js";
import Divider from '@mui/material/Divider';

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary shadow px-3">
      <div class="container-fluid">
        <Link className={`navbar-brand pe-3 ${localStorage.getItem("accountType") !== null && "border-end"} `} to="/">
          <img src={ColourLogo} className="navbar-logo" alt="VisuSpeak Logo" height="45"/>
        </Link>
        {localStorage.getItem("organizationName")}
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
        {/* <LanguageSwitcher /> */}
        {localStorage.getItem("accountType") === null && <LoggedOutNavLinks />}
        {localStorage.getItem("accountType") === "admin" && <AdminNavLinks />}
        {localStorage.getItem("accountType") === "guest" && <CustomerNavLinks />}
      </div>
    </nav>
  );
};

export default Navbar;
