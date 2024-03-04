import React from "react";
import HomeNavigation from "../components/landing_page/LandingPage.js";
import HomeMenu from "../components/landing_page/LoggedInHome.js";
import Please from "../assets/images/Please.jpg";
import CustomerSignin from "../components/customer/CustomerSignin.js";
import Dashboard from "../components/admin/Dashboard.js";

export default function Home() {
  return (
    // <div className="background-container">
    //   {localStorage.getItem("username") == null ? (
    //   <div className="hero text-center shadow-lg p-3 mb-5 bg-body-tertiary rounded">

    //       <HomeNavigation />

    //   </div>) : (
    //       <HomeMenu />
    //     )}
    // </div>

    <div class="hero-section">
      <div class="h-100 mx-5">
        <div class="row align-items-center">
          {localStorage.getItem("accountType") !== "admin" ? (
            <div class=" col-sm-12 text-begin landing-page rounded-4 shadow-lg">
              <h1 class="text-white">Welcome to VisuSpeak</h1>
              <p class="lead text-white">Your ASL Companion</p>
              <div className="d-flex justify-content-between align-items-end">
                <CustomerSignin />
                <i
                  class="fa-solid fa-question fa-2xl btn-raised help-icon shadow"
                  style={{ color: "#ffffff" }}
                ></i>
              </div>
            </div>
          ) : (
            <Dashboard />
          )}
        </div>
      </div>
      <div id="content"></div>
    </div>
  );
}
