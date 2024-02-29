// Importing necessary modules and components
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Hook from React Router for accessing location object

import SettingsUserInfo from "./SettingsUserInfo.js";
import SettingsEditAccountInfo from "./SettingsEditAccountInfo.js";

const AccountSettings = (props) => {
  let location = useLocation();

  // Effect hook to log the current pathname whenever the location changes
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  return (
    <div>
      <div className="container my-5">
        <SettingsUserInfo/>
        <div className="row about-us-sections">
          <h4 className="">Edit Account Information</h4>
          <SettingsEditAccountInfo />
        </div>
      </div>
      <img
            src=""
            alt="..."
            width="100%"
            style={{ justifyContent: "end" }}
          />
    </div>
  );
};

export default AccountSettings;

