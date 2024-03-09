import React from "react";
import HomeNavigation from "../components/landing_page/LandingPage.js";
import HomeMenu from "../components/landing_page/LoggedInHome.js";
import Please from "../assets/images/Please.jpg";
import CustomerSignin from "../components/customer/CustomerSignin.js";
import Dashboard from "../components/admin/Dashboard.js";
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  return (
    <div class="hero-section">
      <div class="row align-items-center mx-3">
        {localStorage.getItem("accountType") !== "admin" ? (
          <div class="col-sm-12 text-begin landing-page rounded-4 shadow-lg">
            <div className="d-flex justify-content-between align-items-start">
              <h1 class="text-white">{t('Welcome', { appName: "VisuSpeak" })}</h1>
              <i
                class="fa-solid fa-question help-icon"
                style={{ color: "#ffffff" }}
              ></i>
            </div>
            <p class="lead text-white">Your ASL Companion</p>

            <CustomerSignin />
          </div>
        ) : (
          <Dashboard />
        )}
      </div>
      <div id="content"></div>
    </div>
  );
}
