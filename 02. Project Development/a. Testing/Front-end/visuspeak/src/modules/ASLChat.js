import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // For making HTTP requests
import serverUrl from "../Server-env.js"; // URL of the server
import MessageList from "../components/MessageList.js"; // Component to display list of messages
import InputArea from "../components/InputArea.js"; // Component for input area
import ChatHeader from "../components/ChatHeader.js";
import EditChatName from "../components/EditChatName.js";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const ASLChat = () => {
  const sendMessageUrl = `${serverUrl}/chat/messages`; // URL to send messages

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentStep, setCurrentStep] = useState(1);
  const mobileView = windowWidth < 600;

  const [isSigning, setIsSigning] = useState(false); // State to track if user is signing
  const [loading, setLoading] = useState(false); // State for loading indication
  const [fetchInterval, setFetchInterval] = useState(10000); // Interval for fetching messages
  const [gestureLabel, setGestureLabel] = useState(""); // Label for gesture recognition

  const [messages, setMessages] = useState([]); // State for storing messages

  const [countdown, setCountdown] = useState(fetchInterval / 1000); // Countdown timer
  const [animate, setAnimate] = useState(true);

  // Function to introduce delay
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Function to toggle signing mode
  const toggleSigning = async () => {
    if (isSigning) {
      setIsSigning(false);
      setCountdown(fetchInterval / 1000);
    } else {
      setLoading(true);
      await delay(2000);
      setLoading(false);
      setIsSigning(true);
      // handleCountdown();
    }
  };

  // Function to handle speed change in slider
  const handleSpeedChange = (event) => {
    const newInterval = event.target.value;
    setFetchInterval(newInterval);
    setCountdown(newInterval / 1000); // Reset countdown timer
  };

  // Function to handle sending a new message
  const handleSendMessage = async (newMessage) => {
    try {
      const response = await axios.post(sendMessageUrl, {
        userID: localStorage.getItem("userID"),
        username: localStorage.getItem("username"),
        text: newMessage,
        type: "text",
        status: "sent",
        sessionID: localStorage.getItem("sessionId"),
      });

      if (response.status === 201) {
        console.log("Message stored", response.data);
        setMessages([...messages, response.data]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Function to handle countdown
  const handleCountdown = () => {
    setCountdown((prevCountdown) => {
      if (prevCountdown <= 1) {
        return fetchInterval / 1000; // Reset countdown
      } else {
        // setAnimate(!animate);// Toggle animation state
        return prevCountdown - 1;
      }
    });
  };

  // useEffect to manage countdown
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isSigning) {
        handleCountdown(); // Update countdown every second
      }
    }, 1000);

    return () => clearInterval(intervalId); // Clear interval on cleanup
  }, [isSigning, fetchInterval]);

  // useEffect to handle gesture messages
  useEffect(() => {
    const handleGestureMessage = async (event) => {
      if (event.origin.startsWith("https://archishab.github.io")) {
        if (event.data.type && event.data.type === "GESTURE") {
          setGestureLabel(event.data.label);
        }
      } else {
        setGestureLabel("Error translating!");
        return;
      }
    };

    window.addEventListener("message", handleGestureMessage);

    return () => {
      window.removeEventListener("message", handleGestureMessage);
    };
  }, [gestureLabel]);

  // useEffect to manage signing state and gesture label
  useEffect(() => {
    let interval;

    if (isSigning && gestureLabel !== "Error translating!") {
      interval = setInterval(() => {
        fetch("http://localhost:3002/sendword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ word: gestureLabel }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error("Error:", error));
      }, 100); // adjust the interval as needed
    }

    return () => clearInterval(interval);
  }, [isSigning, gestureLabel]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div class="container chat-page text-begin py-3">
      <div class="row">
        <div className="col-sm-6">
          <EditChatName />
        </div>
        <div className="col-sm-6"></div>
      </div>
      <div class="row">
        <div class="col-sm-5">
          <div class="chat-box rounded-4">
            <ChatHeader />
            <div class="row">
              <div class="col chatbox-scrollable">
                <MessageList messages={messages} />
              </div>
            </div>

            <InputArea
              onSendMessage={handleSendMessage}
              isFetchingEnabled={isSigning}
              fetchInterval={fetchInterval}
            />
          </div>
        </div>
        <div class="col-sm-7 video-box">
          <div class="row">
            <div className="col-sm-1">
              <div className="fs-3 lead">
                <p>
                  <i className="fa-solid fa-stopwatch fa-xl mt-3 ms-3"></i>
                </p>
              </div>
            </div>
            <div className="col-sm-2">
              <div className="d-flex fs-3 lead">
                {/* <p><i className="fa-solid fa-stopwatch"></i></p> */}
                <p key={countdown} className="countdown-animation">
                  {countdown} s
                </p>
              </div>
            </div>
          </div>
          <div
            class="row camera-placeholder rounded-4"
            style={{ overflowX: "hidden" }}
          >
            {isSigning ? (
              <iframe
                src="https://archishab.github.io/VisuSpeak-MediaPipe-Model/"
                allow="camera *; microphone *"
                style={{
                  border: "none",
                  // width: "700",
                  // height: "500",
                  "-ms-overflow-style": "none" /* IE and Edge */,
                  "scrollbar-width": "none" /* Firefox */,
                  overflowX: "hidden",
                }}
                scrolling="no"
                class="align-self-center"
              ></iframe>
            ) : (
              <div className="video-placeholder centered-text">
                {loading ? (
                  <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <p class="lead">
                    Click on the camera icon{" "}
                    <i
                      class="fa-solid fa-video me-2"
                      style={{ color: "#006262" }}
                    ></i>{" "}
                    to start signing
                  </p>
                )}
              </div>
            )}
            <div className="row align-items-center py-2 justify-content-start action-buttons rounded-4 mt-3">
              <div className="col justify-content-start">
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
              <div className="col interval-style">
                {/* <input
                  type="range"
                  min="5000"
                  max="15000"
                  step="5000"
                  value={fetchInterval}
                  onChange={handleSpeedChange}
                  className=""
                  // orient="vertical"
                /> */}
                <button
                  type="button"
                  className="btn camera-button-style m-1"
                  onClick={() => setFetchInterval(5000)}
                >
                  5s
                </button>
                <button
                  type="button"
                  className="btn camera-button-style m-1"
                  onClick={() => setFetchInterval(10000)}
                >
                  10s
                </button>
                <button
                  type="button"
                  className="btn camera-button-style m-1"
                  onClick={() => setFetchInterval(15000)}
                >
                  15s
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ASLChat;
