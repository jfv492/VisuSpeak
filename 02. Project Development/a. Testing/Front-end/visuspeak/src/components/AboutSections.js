import React from "react";
import Hands from "../assets/images/Hands.jpg";
import ConversationImage from "../assets/images/Conversation.jpg";

const AboutSections = (props) => {
  return (
    <div>
      <div class="row about-us-sections align-items-center ">
      <div class="col-sm-4">
          <img
            src={Hands}
            className="rounded-4 mx-auto d-block"
            alt="..."
            width="100%"
            style={{ justifyContent: "end" }}
          />
        </div>
        <div class="col-sm-8 lead">
          <h3 class="about-us-headers border-bottom pb-2">Project Idea</h3>
          This project aims to create an innovative ASL-English bidirectional
          translation application to bridge the communication gap between ASL
          users and English speakers. This application will enable seamless
          real-time translation from ASL to English, allowing people with
          special accessibility needs to communicate effectively with others and
          gain access to essential services and information.
        </div>
      </div>
      <hr />
      <div class="row about-us-sections align-items-center row-reverse rounded-4">
      <div class="col-sm-4">
          <img
            src={ConversationImage}
            className="rounded-4 mx-auto d-block"
            alt="..."
            width="100%"
            style={{ justifyContent: "end" }}
          />
        </div>
        <div class="col-sm-8 lead">
          <h3 class="about-us-headers border-bottom pb-2">Project Background</h3>
          Many people with special needs, particularly those with vocal and
          hearing impairments, rely on American Sign Language (ASL) as their
          primary mode of communication. However, there is frequently a
          significant communication gap between ASL users and those who speak or
          understand English primarily. This gap can lead to misunderstandings,
          limited opportunities, and exclusion for ASL users in various areas,
          such as education, employment, healthcare, and social interactions.
        </div>
      </div>
      <hr />
      <div class="row about-us-sections align-items-center">
      <div class="col-sm-4">
          <img
            src={Hands}
            className="rounded-4 mx-auto d-block"
            alt="..."
            width="100%"
            style={{ justifyContent: "end" }}
          />
        </div>
        <div class="col-sm-8 lead">
          <h3 class="about-us-headers border-bottom pb-2">About VisuSpeak</h3>
          VisuSpeak is an application which contains a number of features that
          aim to make communication between ASL speakers and English speakers
          more seamless, meaningful, and natural. With customizable chatting
          interactions, options to save and view different conversations, and a
          resource section to allow you to expand upon your American Sign
          Language knowledge, conversing using older more traditional methods
          like pen and paper are a thing of the past. See below how VisuSpeak
          can increase accessibility within your customer facing interactions in
          a fun, new, and engaging way!
        </div>
      </div>
    </div>
  );
};

export default AboutSections;
