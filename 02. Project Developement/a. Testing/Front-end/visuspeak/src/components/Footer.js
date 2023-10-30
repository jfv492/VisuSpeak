import FooterLogo from "../images/White.png";
import "../VisuSpeak.css";
import React from "react";

export default function Footer() {
  return (
    <div className="text-center">
      <footer className="d-flex flex-wrap justify-content-between align-items-center border-top">
        <div className="col d-flex align-items-center ms-4">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          >
            <img src={FooterLogo} alt="VisuSpeak Logo" height="100" />
          </a>
          <p className="mb-3 mb-md-0">© 2023 Team VisuSpeak</p>
        </div>
      </footer>
    </div>
  );
}
