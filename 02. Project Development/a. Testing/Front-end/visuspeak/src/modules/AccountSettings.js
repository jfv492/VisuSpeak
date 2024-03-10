// Importing necessary modules and components
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Hook from React Router for accessing location object

import UserInfo from "../components/account_setting/UserInfo.js";
import EditPassword from "../components/account_setting/EditPassword.js";

const AccountSettings = (props) => {
  let location = useLocation();

  // Effect hook to log the current pathname whenever the location changes
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  return (
    <div className="background-container">
      <div className="container account-settings-form shadow-lg rounded-4">
        <UserInfo />
        <div className="about-us-sections">
          <EditPassword />
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
