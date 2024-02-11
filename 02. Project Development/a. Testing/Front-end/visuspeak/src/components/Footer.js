import FooterLogo from "../images/White.png";
import React from "react";

export default function Footer() {
  return (
    <div className="text-center">
      <footer className="d-flex flex-wrap justify-content-between align-items-center border-top">
        <div className="col d-flex align-items-center">
            <img src={FooterLogo} alt="VisuSpeak Logo" className="mx-5"  height="50" />
          <p className="mb-3 mb-md-0">© 2023-2024 Team VisuSpeak</p>
        </div>
      </footer>
    </div>
  )
}
