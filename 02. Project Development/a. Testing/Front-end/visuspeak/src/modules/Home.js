import React from 'react';
import { useTranslation } from "react-i18next";
import CustomerSignin from '../components/customer/CustomerSignin.js';
import Dashboard from '../components/admin/Dashboard.js';
import "../App.css";
import icon1 from '../assets/icons/Oneonone.png';
import icon2 from '../assets/icons/Quick.png';
import icon3 from '../assets/icons/Efficient.png';
import icon4 from '../assets/icons/Reliable.png';


export default function Home() {
  const { t } = useTranslation();
  return (
    <div>
      {localStorage.getItem("accountType") !== "admin" ? (
        <>
          <div className="visuspeak-hero">
            <h1>{t("WelcomeNew")}</h1>
            <p className="asl-user-query">{t("SubWelcomeOne")}</p>
            <p className ="connect-admin">{t("SubWelcomeTwo")}</p>
            <CustomerSignin />
          </div>
          <div className="content-container my-4">
            <div className="service-info-section">
              <div className="card service-card rounded-4">
                <img src={icon1} className="card-img-top" alt="One-on-One" />
                <div className="card-body">
                  <p className="card-text">{t("LandingPageIconOne")}</p>
                </div>
              </div>
              <div className="card service-card rounded-4">
                <img src={icon2} className="card-img-top" alt="Quick" />
                <div className="card-body">
                  <p className="card-text">{t("LandingPageIconTwo")}</p>
                </div>
              </div>
              <div className="card service-card rounded-4">
                <img src={icon3} className="card-img-top" alt="Efficient" />
                <div className="card-body">
                  <p className="card-text">{t("LandingPageIconThree")}</p>
                </div>
              </div>
              <div className="card service-card rounded-4">
                <img src={icon4} className="card-img-top" alt="Reliable" />
                <div className="card-body">
                  <p className="card-text">{t("LandingPageIconFour")}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}
