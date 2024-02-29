// Importing necessary modules and components
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Hook from React Router for accessing location object

import SettingsUserInfo from "../components/account_setting/SettingsUserInfo.js";
import SettingsEditAccountInfo from "../components/account_setting/SettingsEditAccountInfo.js";

const AccountSettings = (props) => {
  let location = useLocation();

  // Effect hook to log the current pathname whenever the location changes
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  return (
    <div className="background-container">
      <div className="container account-settings-form shadow-lg rounded-4">
        <SettingsUserInfo/>
        <div className="row about-us-sections">
          <div className="lead">Update Your Profile</div>
          <SettingsEditAccountInfo />
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;

