// Importing necessary modules and components
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Hook from React Router for accessing location object
import ASLUserSupport from "../components/support/ASLUserSupport.js";
import ASLTranslationOptions from "../components/support/ASLTranslationOptions.js";
import AdminUserSupport from "../components/support/AdminUserSupport.js";
import { useTranslation } from "react-i18next";

const Support = () => {
  const { t } = useTranslation();
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  return (
    <div>
      <div class="container my-5">
        <h1> {t("SupportPage")} </h1>
        <div className="row about-us-sections align-items-center lead">
            {t("SupportPageDescription")} 
        </div>
        <hr />
        <div className="row about-us-sections align-items-center">
          <AdminUserSupport /> 
        </div>
        

        <div className="row about-us-sections align-items-center">
          <ASLUserSupport /> 
        </div>
        <hr />
        
        <div className="row about-us-sections align-items-center">
          <ASLTranslationOptions /> 
        </div>
      </div>
    </div>
  );
};

export default Support;
