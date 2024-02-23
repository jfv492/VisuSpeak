import React from "react";
import HomeNavigation from "../components/landing_page/HomeNavigation.js";

export default function Home() {
  return (
    <div className="background-container">
      <div className="hero text-center shadow-lg p-3 mb-5 bg-body-tertiary rounded">
        <h1 className="display-3 mt-5 fw-bold ">Welcome to VisuSpeak</h1>
        <div className="col-sm-6 mx-auto">
          <h1 className="display-5 text-body-emphasis">Your ASL Companion</h1>
          <HomeNavigation />
        </div>
      </div>
    </div>
  );
}
