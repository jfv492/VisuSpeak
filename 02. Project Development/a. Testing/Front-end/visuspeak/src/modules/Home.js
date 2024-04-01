import React from 'react';
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom
import CustomerSignin from '../components/customer/CustomerSignin';
import Dashboard from '../components/admin/Dashboard';
import "../App.css";
import icon1 from '../assets/icons/Oneonone.png';
import icon2 from '../assets/icons/Quick.png';
import icon4 from '../assets/icons/Reliable.png';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="visuhero-section">
      {localStorage.getItem("accountType") !== "admin" ? (
        <>
          <div className="visuspeak-hero">
            <h1>{t("WelcomeNew")}</h1>
            <p className="asl-user-query">{t("SubWelcomeOne")}</p>
            <p className="connect-admin mb-4">{t("SubWelcomeTwo")}</p>
            <CustomerSignin />
          </div>
          <div className="features-container">
            <h2 className="features-title align-self-start">{t("Features")}</h2>
            <div className="benefits-container">
              <div className="benefit-card">
                <img src={icon1} className="benefit-icon" alt="One-on-One" />
                <div className="benefit-text">
                  <h3>{t("LandingPageIconOne")}</h3>
                </div>
              </div>
              <div className="benefit-card">
                <img src={icon2} className="benefit-icon" alt="Quick" />
                <div className="benefit-text">
                  <h3>{t("LandingPageIconTwo")}</h3>
                </div>
              </div>
              <div className="benefit-card">
                <img src={icon4} className="benefit-icon" alt="Reliable" />
                <div className="benefit-text">
                  <h3>{t("LandingPageIconFour")}</h3>
                </div>
              </div>
            </div>
            <Link to="/about" className="learn-more-link align-self-end">{t("Learn More")}</Link>
          </div>
        </>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}
