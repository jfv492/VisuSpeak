import React from "react";
import HomeNavigation from "../components/landing_page/LandingPage.js";
import HomeMenu from "../components/landing_page/LoggedInHome.js";

export default function Home() {
  return (
    <div className="background-container">
      {localStorage.getItem("username") == null ? (
      <div className="hero text-center shadow-lg p-3 mb-5 bg-body-tertiary rounded">
        
          <HomeNavigation />
        
      </div>) : (
          <HomeMenu />
        )}
    </div>
  );
}
