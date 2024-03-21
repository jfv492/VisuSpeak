import React from "react";
import FooterLogo from "../assets/logos/VisuSpeakWhiteLogo.png";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <>
    <footer className="footer sticky-bottom">
      <div className="footer-container">
        <div className="logo mx-3">
          <img src={FooterLogo} height="50" />
          <div className="rights">{t('Copyright')}</div>
        </div>

        <nav className="menu">
          <Link to="/" className="menu-item">
          {t('Home')}
          </Link>
          <Link to="/resources" className="menu-item">
          {t('Resources')}
          </Link>
          <Link to="/support" className="menu-item">
          {t('Support')}
          </Link>
          <Link to="/about" className="menu-item">
          {t('About Us')}
          </Link>
        </nav>

        <div className="social-media mx-3">
          <Link to="https://github.com/jfv492/VisuSpeak">
          <i
            class="fa-brands fa-github fa-2xl me-3"
            style={{ color: "#ffffff" }}
          ></i>
          </Link>
          <Link to="https://youtube.com/playlist?list=PLiqvO_Z9iNyY5reatlxQMcvnlBwdRqN6g&si=iDKp75n8M7KSx_KU">
          <i
            class="fa-brands fa-youtube fa-2xl"
            style={{ color: "#ffffff" }}
          ></i>
          </Link>
        </div>
      </div>
    </footer>


</>
  );
};

export default Footer;