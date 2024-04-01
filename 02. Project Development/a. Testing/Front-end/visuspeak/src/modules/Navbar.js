import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js"
import ColourLogo from "../assets/logos/VisuSpeakPrimaryLogo.png";
import LoggedOutNavLinks from "../components/navbar/LoggedOutNavLinks.js";
import AdminNavLinks from "../components/navbar/AdminNavLinks.js";
import CustomerNavLinks from "../components/navbar/CustomerNavLinks.js";
import LanguageSwitcher from "../components/navbar/LanguageSwitcher.js";

const Navbar = () => {
  const { accountType, organizationName } = useContext(AuthContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const mobileView = windowWidth < 600;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary shadow px-3">
      <div class="container-fluid">
        <Link className={`navbar-brand pe-3 ${(localStorage.getItem("accountType") !== null && !mobileView) && "border-end"} `} to={`${accountType === "guest" ? "/chat" : "/"}`}>
          <img src={ColourLogo} className="navbar-logo" alt="VisuSpeak Logo" height="45"/>
        </Link>
        {!mobileView && (organizationName !== null || organizationName !== "") && organizationName} 
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
        {!mobileView && <LanguageSwitcher />}
        {(accountType === null || accountType === "") && <LoggedOutNavLinks />}
        {accountType === "admin" && <AdminNavLinks />}
        {accountType === "guest" && <CustomerNavLinks />}
      </div>
    </nav>
  );
};

export default Navbar;
