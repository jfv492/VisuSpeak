import React from "react";

const AboutFeaturesGrid = () => {
  return (
    <div className="row about-us-sections social rounded-4">
      <h3 className="pb-2 border-bottom">Learn More</h3>
      <div className="col-sm-7">
        <p className="lead">
          For more information on VisuSpeak and the development journey on this
          product, please visit our GitHub Repository. If you would rather watch
          the progression updates, then please visit our YouTube channel.
        </p>
      </div>

      <div className="col-sm-5 align-self-center text-center">
        <div className="justify-content-evenly hyperlink-social-row">
          <div className="">
            <a
              className="hyperlink-social"
              href="https://github.com/jfv492/VisuSpeak"
            >
              <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                <i
                  className="fa-brands fa-github"
                  style={{ color: "#ffffff;" }}
                ></i>
              </div>
              <h4 className="fw-semibold mb-0 text-body-emphasis">GitHub</h4>
            </a>
          </div>

          <div className="">
            <a
              className="hyperlink-social"
              href="https://youtube.com/playlist?list=PLiqvO_Z9iNyY5reatlxQMcvnlBwdRqN6g&si=iDKp75n8M7KSx_KU"
            >
              <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                <i
                  className="fa-brands fa-youtube"
                  style={{ color: "#ffffff;" }}
                ></i>
              </div>
              <h4 className="fw-semibold mb-0 text-body-emphasis">YouTube</h4>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutFeaturesGrid;
