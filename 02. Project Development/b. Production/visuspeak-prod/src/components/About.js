import React, { useEffect } from "react";
import StockImage from "../images/FillerPhoto.jpg";
import ConversationImage from "../images/Conversation.jpg";
import YouTube from "../images/YouTubeLogo.png";
import GitHub from "../images/GitHubLogo.png";
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
            <img src={ConversationImage} className="rounded mx-auto d-block" alt="..." width="100%"/>
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

      <div className="d-grid gap-4 d-sm-flex justify-content-flex-start my-5">
            <h1 className="display-3 mt-5 fw-bold "> Features </h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-sm p-2 large-text-style" >
            VisuSpeak is an application which contains a number of features that aim to make communication between ASL speakers and 
            English speakers more seamless, meaningful, and natural. With customizable chatting interactions, options to save and view 
            different conversations, and a resource section to allow you to expand upon your American Sign Language knowledge, 
            conversing using older more traditional methods like pen and paper are a thing of the past. See below how VisuSpeak can increase
            accessibility within your customer facing interactions in a fun, new, and engaging way!
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row mt-2 resources-grid">
          <div className="col p-2 card my-5 resources-grid-item">
            <div class="card-body">
              <h4 class="card-title fw-bold">Sign Language to Text and Audio</h4>
              <p class="card-text py-3 large-text-style">
                VisuSpeak will convert American Sign Language (ASL) gestures (from visual signing captured in a video clip) into text and audio 
                to facilitate communication with English speakers.
              </p>
            </div>
          </div>

          <div className="col p-2 card my-5 resources-grid-item">
            <div class="card-body">
              <h4 class="card-title fw-bold">ASL Accuracy Testing</h4>
              <p class="card-text py-5 large-text-style">
                To enhance beginner ASL users' proficiency, tha application will allow users to test the accuracy of their ASL by comparing it to 
                our existing dataset of signs. 
              </p>
            </div>
          </div>

          <div className="col p-2 card my-5 resources-grid-item">
            <div class="card-body">
              <h4 class="card-title fw-bold">Accessibility Level Identification</h4>
              <p class="card-text py-3 large-text-style">
                Users of the application can specify their accessibility needs, such as visual, vocal, and hearing impairments for a tailored 
                communication experience. 
              </p>
            </div>
          </div>
        
          <div className="col p-2 card mb-5 resources-grid-item">
            <div class="card-body">
              <h4 class="card-title fw-bold">Transcription History</h4>
              
              <p class="card-text py-5 large-text-style">
                The application will maintain a history of conversations and transcripts, ensuring users can access past interactions. 
              </p>
            </div>
          </div>

          <div className="col p-2 card mb-5 resources-grid-item">
            <div class="card-body">
              <h4 class="card-title fw-bold">Accessibility Officer Access</h4>
              <p class="card-text py-5 large-text-style">
                Accessibility officers will have access to user transcripts, aiding in support and assistance. 
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="d-grid gap-4 d-sm-flex justify-content-flex-start my-5">
            <h1 className="display-3 fw-bold "> Additional Information </h1>
      </div>

      <div className="container">
        <div className="row resources-grid">
          <div className="col p-2 mb-5">
              <p class="card-text py-3 large-text-style">
                For more information on VisuSpeak and the development journey on this product, please visit our GitHub Repository. If you would rather 
                watch the progression updates, then please visit our YouTube channel. 
              </p>
          </div>

          <div className="col p-2 mb-5 text-center">
            <a class="hyperlink hyperlink:hover" href="https://github.com/jfv492/VisuSpeak">
              <img src={GitHub} className="rounded mx-auto d-block" alt="..." width="25%"/>
              GitHub
            </a>
          </div>

          <div className="col p-2 mb-5 text-center">
            <a class="hyperlink hyperlink:hover" href="https://youtube.com/playlist?list=PLiqvO_Z9iNyY5reatlxQMcvnlBwdRqN6g&si=dZpY4PrzeeQtIN7p">
            <img src={YouTube} className="rounded mx-auto d-block" alt="..." width="25%"/>
              YouTube
            </a>
          </div>
        </div>
      </div>
      
 
      <div>
        <Background />
      </div>
    </>
  );
}
