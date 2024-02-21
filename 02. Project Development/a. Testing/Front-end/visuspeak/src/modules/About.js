// Importing necessary modules and components
import React, { useEffect } from "react";

import YouTube from "../assets/icons/YouTubeIcon.png"; // YouTube logo for external link
import GitHub from "../assets/icons/GitHubIcon.png"; // GitHub logo for external link
import { useLocation } from "react-router-dom"; // Hook from React Router for accessing location object

import AboutSections from "../components/AboutSections.js";
import AboutFeatures from "../components/AboutFeatures.js";
import AboutFeaturesGrid from "../components/AboutSocial.js";

const About = (props) => {
  let location = useLocation();

  // Effect hook to log the current pathname whenever the location changes
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  return (
    <div>
      <div class="container my-5">
        <h1> {props.heading}</h1>
        <AboutSections />
        <div class="row about-us-sections">
          <h4>Features</h4>
          <AboutFeatures />
        </div>
        <hr />
        <AboutFeaturesGrid />
      </div>
    </div>
  );
};

export default About;
