import React, { useState, useEffect } from "react";

const ASLVideo = () => {
  const [isSigning, setIsSigning] = useState(false); // State to track if user is signing
  const [loading, setLoading] = useState(false); // State for loading indication
  const [showSlider, setShowSlider] = useState(false); // State to show/hide speed slider
  const [fetchInterval, setFetchInterval] = useState(10000); // Interval for fetching messages

  // Function to introduce delay
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Function to toggle signing mode
  const toggleSigning = async () => {
    if (isSigning) {
      setIsSigning(false);
    } else {
      setLoading(true);
      await delay(2000);
      setLoading(false);
      setIsSigning(!isSigning);
    }
  };

  // Function to toggle visibility of slider
  const toggleSlider = () => {
    setShowSlider(!showSlider);
  };

  // Function to handle speed change in slider
  const handleSpeedChange = (event) => {
    setFetchInterval(event.target.value);
  };
  return (
    <div>
      {/* <div class="row camera-placeholder border border-4 rounded-4 justify-content-center align-self-center">
        <div class="col-2 d-flex align-items-center flex-column action-buttons rounded-start">
          <button
            type="button"
            className={`{btn camera-button-style btn-lg border border-3 rounded-3 mt-auto mb-2 ${
              isSigning ? "active" : ""
            }`}
            onClick={toggleSigning}
          >
            {isSigning ? (
              <i
                class="fa-solid fa-video-slash fa-xl"
                style={{ color: "#ffffff" }}
              ></i>
            ) : (
              <i
                class="fa-solid fa-video fa-xl"
                style={{ color: "#006262" }}
              ></i>
            )}
          </button>
          <i class="fa-solid fa-minus fa-xl" style={{ color: "#006262" }}></i>
          <button
            className={`{btn camera-button-style btn-lg border border-3 rounded-3 mb-auto mt-2 ${
              showSlider ? "active" : ""
            }`}
            onClick={toggleSlider}
          >
            {showSlider ? (
              <i
                class="fa-solid fa-sliders fa-xl"
                style={{ color: "#ffffff" }}
              ></i>
            ) : (
              <i
                class="fa-solid fa-sliders fa-xl"
                style={{ color: "#006262" }}
              ></i>
            )}
          </button>

          {showSlider && (
            <div className="row overlay justify-content-end slider-style rounded-3">
              <div class="col-1">
                <div className="slider-labels text-end">
                  <span className="slider-label" style={{ top: "0%" }}></span>
                  <span className="slider-label" style={{ top: "80%" }}></span>
                </div>
              </div>
              <div class="col-1">
                <input
                  type="range"
                  min="5000"
                  max="15000"
                  step="5000"
                  value={fetchInterval}
                  onChange={handleSpeedChange}
                  className="speed-slider vertical"
                  orient="vertical"
                />
              </div>
            </div>
          )}
        </div>
        <div class="col video-canvas">
          {isSigning ? (
            <>
              <iframe
                src="https://archishab.github.io/VisuSpeak-MediaPipe-Model/"
                allow="camera *; microphone *"
                width="100%"
                height="460"
                class="video-style align-self-end border border-5 rounded-4 z2"
                // onLoad={handleLoad}
              ></iframe>
            </>
          ) : (
            <>
              {loading ? (
                <div class="spinner-border text-success" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                <p class="lead">Click on the camera icon to start signing</p>
              )}
            </>
          )}
        </div>
      </div> */}
      <div class="camera-placeholder border border-4 rounded-4 justify-content-center">
        <div className="row action-buttons">
            <div className="col">
          <button
            type="button"
            className={`{btn camera-button-style btn-lg border border-3 rounded-3 mt-auto mb-2 ${
              isSigning ? "active" : ""
            }`}
            onClick={toggleSigning}
          >
            {isSigning ? (
              <i
                class="fa-solid fa-video-slash fa-xl"
                style={{ color: "#ffffff" }}
              ></i>
            ) : (
              <i
                class="fa-solid fa-video fa-xl"
                style={{ color: "#006262" }}
              ></i>
            )}
          </button>
          </div>
          <div className="col slider-style ">
                {/* <input
                  type="range"
                  min="5000"
                  max="15000"
                  step="5000"
                  value={fetchInterval}
                  onChange={handleSpeedChange}
                  className=""
                  orient="vertical"
                /> */}
                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
  <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked />
  <label class=" btn speed-button-style" for="btnradio1">Radio 1</label>

  <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" />
  <label class=" btn speed-button-style" for="btnradio2">Radio 2</label>

  <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" />
  <label class=" btn speed-button-style" for="btnradio3">Radio 3</label>
</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ASLVideo;
