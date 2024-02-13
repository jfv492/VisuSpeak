// Importing necessary modules and components
import React, { useState, useEffect } from "react";
import axios from "axios"; // For making HTTP requests
import InputArea from "./InputArea.js"; // Component for input area
import MessageList from "./MessageList.js"; // Component to display list of messages
import HandGestureBG from "../images/ASl Signs.png"; // Background image
import serverUrl from "../Server-env.js"; // URL of the server
import Tortoise from "../images/turtleIcon.png"; // Icon for slower speed
import Rabbit from "../images/rabbitIcon.png"; // Icon for faster speed
import { Link, useNavigate } from "react-router-dom"; // For routing

const TestChat = (props) => {
  // State hooks for various functionalities
  const [gestureLabel, setGestureLabel] = useState(""); // Label for gesture recognition
  let userId = localStorage.getItem("userID"); // User ID from local storage
  const endChat = `${serverUrl}/chat/endsession`; // URL to end chat session
  const sendMessageUrl = `${serverUrl}/chat/messages`; // URL to send messages
  const getMessagesUrl = `${serverUrl}/chat/getmessages/${userId}`; // URL to get messages
  const [messages, setMessages] = useState([]); // State for storing messages
  const [isSigning, setIsSigning] = useState(false); // State to track if user is signing
  const [showSlider, setShowSlider] = useState(false); // State to show/hide speed slider
  const [fetchInterval, setFetchInterval] = useState(10000); // Interval for fetching messages
  let navigate = useNavigate(); // Hook for navigation
  const [loading, setLoading] = useState(false); // State for loading indication
  const [countdown, setCountdown] = useState(fetchInterval / 1000); // Countdown timer

  // Function to introduce delay
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Function to end chat session
  const endChatSession = async () => {
    try {
      const response = await axios.post(endChat, {
        sessionId: localStorage.getItem("sessionId"),
      });

      if (response.status === 200) {
        console.log("Chat session ended successfully");
        navigate("/chat");
      }
    } catch (error) {
      console.error("Error ending chat session:", error);
    }
  };

  // Function to handle speed change in slider
  const handleSpeedChange = (event) => {
    setFetchInterval(event.target.value);
  };

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

  // useEffect to fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(getMessagesUrl);

        if (response.status === 200) {
          const retrievedMessages = response.data;
          setMessages(retrievedMessages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [userId]);

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

  // Function to handle countdown
  const handleCountdown = () => {
    setCountdown((prevCountdown) => {
      if (prevCountdown <= 1) {
        return fetchInterval / 1000; // Reset countdown when it reaches 0
      } else {
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

  return (
    <>
      <div class="container text-begin py-3">
        <div class="row">
          <div class="col-sm-7">
            <div class="d-flex align-items-center link-body-emphasis messages-heading">
              <button
                class="btn back-button-style"
                type="button"
                aria-expanded="false"
                onClick={endChatSession}
              >
                <i class="fa-solid fa-angle-left"></i>
              </button>
              <p class="h2 ms-3 mt-2">New Chat</p>
              <i
                class="fa-solid fa-pen fa-xl ms-2 me-5"
                style={{ color: "#000000;" }}
              ></i>
            </div>
          </div>
          <div class="col-sm-5 chat-user rounded-pill">
            <div class="">
              <Link
                to="#"
                className="d-flex align-items-center link-body-emphasis text-decoration-none"
              >
                <i
                  class="rounded-circle fa-solid fa-circle-user fa-2xl me-2"
                  style={{ color: "#000000" }}
                ></i>
                <div class="status-indicator-chat-user glowing"></div>
                <strong className="me-2 chat-user-name">admin</strong>
                <i
                  class="fa-solid fa-chevron-right"
                  style={{ color: "#000000" }}
                ></i>
              </Link>
            </div>
          </div>
        </div>
        <hr class="border-2" />
        <div class="row">
          <div class="col-sm-7 align-items-center">
            <div class="row camera-placeholder border border-4 rounded-4 justify-content-center align-self-center">
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
                <i
                  class="fa-solid fa-minus fa-xl"
                  style={{ color: "#006262" }}
                ></i>
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
                        <span className="slider-label" style={{ top: "0%" }}>
                          {/* <i class="fa-solid fa-chevron-up"></i> */}
                          <img src={Tortoise} width="25" />
                        </span>
                        <span className="slider-label" style={{ top: "80%" }}>
                          {/* <i class="fa-solid fa-chevron-down"></i> */}
                          <img src={Rabbit} width="25" />
                        </span>
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
                      <p class="lead">
                        Click on the camera icon to start signing
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
            <hr class="border-2" />
            <div class="row align-items-start">
              <div class="d-flex align-items-center link-body-emphasis text-center justify-content-between">
                <div>
                  <p class="fs-3 lead">
                    <i class="fa-solid fa-stopwatch fa-xl"></i> {countdown} s
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-5 ">
            <div class="chat-box rounded-4">
              <div class="messages-heading row align-items-end">
                <div class="col text-center fw-lighter align-items-end">
                  <div class="divider">
                    <div class="divider-text">Messages</div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm chatbox-scrollable">
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
        </div>
      </div>

      <div>
        <div className="shadow-before-background"></div>
        <img
          src={HandGestureBG}
          alt="Hand Gesture Background"
          className="hand-gesture-background"
        />
      </div>
    </>
  );
};

export default TestChat;
