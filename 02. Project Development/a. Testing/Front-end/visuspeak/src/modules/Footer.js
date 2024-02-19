import React from "react";
import FooterLogo from "../assets/logos/VisuSpeakWhiteLogo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="logo">
          <img src={FooterLogo} height="50" />
          <div className="rights">© 2023-2024 Team VisuSpeak</div>
        </div>

        <nav className="menu">
          <a href="/" className="menu-item">
            Home
          </a>
          <a href="/accommodation" className="menu-item">
            Resources
          </a>
          <a href="/gallery" className="menu-item">
            Support
          </a>
          <a href="/local-attraction" className="menu-item">
            About
          </a>
        </nav>

        <div className="social-media">
          <i
            class="fa-brands fa-github fa-2xl me-3"
            style={{ color: "#ffffff;" }}
          ></i>
          <i
            class="fa-brands fa-youtube fa-2xl"
            style={{ color: "#ffffff;" }}
          ></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
