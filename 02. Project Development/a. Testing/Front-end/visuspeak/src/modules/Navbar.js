import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ColourLogo from "../assets/logos/VisuSpeakPrimaryLogo.png";
import NavButton from "../components/NavButton.js";

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <Link className="navbar-brand mx-3" to="/">
          <img src={ColourLogo} alt="VisuSpeak Logo" height="50" />
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
        <NavButton />
      </div>
    </nav>
  );
};

export default Navbar;
