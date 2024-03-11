// Importing necessary modules and components
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Hook from React Router for accessing location object
import ASLUserSupport from "../components/support/ASLUserSupport.js";
import ASLTranslationOptions from "../components/support/ASLTranslationOptions.js";
import AdminUserSupport from "../components/support/AdminUserSupport.js";

const Support = () => {
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  return (
    <div>
      <div class="container my-5">
        <h1> Support </h1>
        <div className="row about-us-sections align-items-center">
          <div className="row container my-5 px-4">
            Welcome to VisuSpeak's support page. Whether you are an ASL User here for clarification on how to use the chat, 
            or an Admin User wanting to know more about how to use the applications features, you can find support suited for 
            every users needs. Please see below how you can use some of VisuSpeak's common features. 
          </div>
        </div>
        <hr />

        <div className="row about-us-sections align-items-center">
          <AdminUserSupport /> 
        </div>
        <hr />

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
