import React, { useEffect } from "react";
import StockImage from "../images/FillerPhoto.jpg";
import { Link, useLocation } from "react-router-dom";
import Background from "./Background.js";

export default function About() {
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <>  
      <div className="d-grid gap-4 d-sm-flex justify-content-flex-start my-5">
            <h1 className="display-3 mt-5 fw-bold "> About Us </h1>
      </div>

      <div className="container">
        <div class="row about-grid">

          <div class="col-sm-6 large-text-style">
            Many people with special needs, particularly those with vocal and hearing impairments, rely on American Sign Language 
            (ASL) as their primary mode of communication. However, there is frequently a significant communication gap between ASL 
            users and those who speak or understand English primarily. This gap can lead to misunderstandings, limited opportunities, 
            and exclusion for ASL users in various areas, such as education, employment, healthcare, and social interactions.
          </div>
          
          <div class="col-sm-1"></div>

          <div class="col-sm-5">
            <img src={StockImage} className="rounded mx-auto d-block" alt="..." width="100%" style={{justifyContent: "end" }}/>
          </div>

          <div class="col-sm-5">
            <img src={StockImage} className="rounded mx-auto d-block" alt="..." width="100%"/>
          </div>

          <div class="col-sm-1"></div>

          <div className="col-sm-6 p-2 large-text-style" >
            This project aims to create an innovative ASL-English bidirectional translation application to bridge the 
            communication gap between ASL users and English speakers. This application will enable seamless real-time 
            translation from ASL to English, allowing people with special accessibility needs to communicate effectively 
            with others and gain access to essential services and information.
          </div>

        </div>
      </div>
 
      <div>
        <Background />
      </div>
    </>
  );
}
