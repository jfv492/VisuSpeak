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
    <div className="container text-center border border-4 rounded-4 video-style">
      <div className="row action-buttons align-items-center">
        <div className="col">
          <button
            type="button"
            className={`{btn camera-button-style btn-lg border border-3 rounded-3 ${
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
        <div className="col">
          <input
            type="range"
            min="5000"
            max="15000"
            step="5000"
            value={fetchInterval}
            onChange={handleSpeedChange}
            className="form-range"
            orient="vertical"
          />
        </div>
      </div>
      <div class="row camera-placeholder video-canvas">
        {isSigning ? (
          <>
            <iframe
              src="https://archishab.github.io/VisuSpeak-MediaPipe-Model/"
              allow="camera *; microphone *"
              width="500"
              height="450"
              class="align-self-start pt-3 rounded-bottom-4"
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
    </div>
  );
};

export default ASLVideo;
