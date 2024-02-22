import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ColourLogo from "../assets/logos/VisuSpeakPrimaryLogo.png";
import NavButton from "../components/NavButton.js";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
      <div className="container-fluid">
        <Link className="navbar-brand mx-3" to="/">
          <img src={ColourLogo} alt="VisuSpeak Logo" height="50" />
        </Link>
        <button
          className="navbar-toggler mx-3"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <NavButton />
      </div>
    </nav>
  );
};

export default Navbar;
