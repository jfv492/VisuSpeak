import React from "react";

const AboutFeaturesGrid = () => {
  return (
    <div class="row about-us-sections social rounded-4">
      <h3 class="pb-2 border-bottom">Learn More</h3>
      <div class="col-sm-7">
        <p class="lead">
          For more information on VisuSpeak and the development journey on this
          product, please visit our GitHub Repository. If you would rather watch
          the progression updates, then please visit our YouTube channel.
        </p>
      </div>

      <div class="col-sm-5 align-self-center text-center">
        <div class="justify-content-evenly hyperlink-social-row">
          <div class="">
            <a
              class="hyperlink-social"
              href="https://github.com/jfv492/VisuSpeak"
            >
              <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                <i
                  class="fa-brands fa-github"
                  style={{ color: "#ffffff;" }}
                ></i>
              </div>
              <h4 class="fw-semibold mb-0 text-body-emphasis">GitHub</h4>
            </a>
          </div>

          <div class="">
            <a
              class="hyperlink-social"
              href="https://youtube.com/playlist?list=PLiqvO_Z9iNyY5reatlxQMcvnlBwdRqN6g&si=iDKp75n8M7KSx_KU"
            >
              <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                <i
                  class="fa-brands fa-youtube"
                  style={{ color: "#ffffff;" }}
                ></i>
              </div>
              <h4 class="fw-semibold mb-0 text-body-emphasis">YouTube</h4>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutFeaturesGrid;
