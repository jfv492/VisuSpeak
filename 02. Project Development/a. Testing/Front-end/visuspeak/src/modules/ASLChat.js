import React, { useState, useCallback, useEffect, useContext } from "react";
import { ChatContext } from "../context/ChatContext.js";
import Search from "../components/chat/Search.js";
import Chats from "../components/chat/Chats.js";
import axios from "axios"; // For making HTTP requests
import ChatHeader from "../components/chat/ChatHeader.js";
import MessageList from "../components/chat/MessageList.js";
import InputArea from "../components/chat/Input.js";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import HowToModal from "../components/asl_chat/HowToModal.js";
import modelChatUrl from "../Chat-env.js";

const ASLChat = () => {
  const { data } = useContext(ChatContext);
  let displayName = data.user?.displayName;
  let photo = data.user?.photoURL;
  const [leftWidth, setLeftWidth] = useState(35); // Percentage
  const [isDragging, setIsDragging] = useState(false);

  const startDragging = useCallback(() => {
    setIsDragging(true);
  }, []);

  const stopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onDrag = useCallback(
    (e) => {
      if (isDragging) {
        const container = e.currentTarget.parentElement;
        const containerRect = container.getBoundingClientRect();
        const containerWidth = container.offsetWidth;
        let newLeftWidth = e.clientX - containerRect.left;

        // Enforce minimum width constraints
        const minWidth = 450; // Minimum width in pixels
        const maxLeftWidth = containerWidth - minWidth; // Max width of left panel

        if (newLeftWidth < minWidth) {
          newLeftWidth = minWidth; // Enforce minimum width on the left panel
        } else if (newLeftWidth > maxLeftWidth) {
          newLeftWidth = maxLeftWidth; // Enforce minimum width on the right panel
        }

        // Convert to percentage
        const widthPercent = (newLeftWidth / containerWidth) * 100;
        setLeftWidth(widthPercent);
      }
    },
    [isDragging]
  );

  // State for each popover
  const [anchorElCameraButton, setAnchorElCameraButton] = React.useState(null);
  const [anchorEl5sSpeedButton, setAnchorEl5sSpeedButton] =
    React.useState(null);
  const [anchorEl10sButton, setAnchorEl10sButton] = React.useState(null);
  const [anchorEl15sButton, setAnchorEl15sButton] = React.useState(null);

  // Handlers for Camera Button Popover
  const handlePopoverOpenCameraButton = (event) => {
    setAnchorElCameraButton(event.currentTarget);
  };
  const handlePopoverCloseCameraButton = () => {
    setAnchorElCameraButton(null);
  };

  // Handlers for Speed Button Popover
  const handlePopoverOpenSpeedButton = (event) => {
    setAnchorEl5sSpeedButton(event.currentTarget);
  };
  const handlePopoverCloseSpeedButton = () => {
    setAnchorEl5sSpeedButton(null);
  };

  const handlePopoverOpen10sButton = (event) => {
    setAnchorEl10sButton(event.currentTarget);
  };
  const handlePopoverClose10sButton = () => {
    setAnchorEl10sButton(null);
  };

  const handlePopoverOpen15sButton = (event) => {
    setAnchorEl15sButton(event.currentTarget);
  };
  const handlePopoverClose15sButton = () => {
    setAnchorEl15sButton(null);
  };

  // Open states for popovers
  const openCameraButtonPopover = Boolean(anchorElCameraButton);
  const openSpeedButtonPopover = Boolean(anchorEl5sSpeedButton);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const mobileView = windowWidth < 600;

  const [isSigning, setIsSigning] = useState(false); // State to track if user is signing
  const [loading, setLoading] = useState(false); // State for loading indication
  const [fetchInterval, setFetchInterval] = useState(10000); // Interval for fetching messages
  const [gestureLabel, setGestureLabel] = useState(""); // Label for gesture recognition

  const [messages, setMessages] = useState([]); // State for storing messages

  const [countdown, setCountdown] = useState(fetchInterval / 1000); // Countdown timer
  const [iconClass, setIconClass] = useState("");

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
  // const handleSpeedChange = (event) => {
  //   const newInterval = event.target.value;
  //   setFetchInterval(newInterval);
  //   setCountdown(newInterval / 1000); // Reset countdown timer
  // };

  // Function to handle speed change using buttons
  const handleSpeedChange = (newInterval) => {
    setFetchInterval(newInterval);
    setCountdown(newInterval / 1000); // Reset countdown timer
  };

  const handleCountdown = () => {
    setCountdown((prevCountdown) => {
      let newClass = "";
      if (prevCountdown <= 4) {
        newClass = "shaking"; // This is the class name for shaking effect
      }
      setIconClass(newClass);

      return prevCountdown <= 1 ? fetchInterval / 1000 : prevCountdown - 1;
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
        fetch(`${modelChatUrl}/sendword`, {
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
    <>
      <div
        class={`asl-chat-container ${!mobileView ? "resizable-container" : ""}`}
      >
        <div
          class="resizable-left-panel p-3"
          style={{ width: `${leftWidth}%` }}
        >
          {!displayName ? (
            <div className="asl-chats">
              <Search />
              <div className=" rounded-3 my-3">
                <Chats />
              </div>
            </div>
          ) : (
            <>
              <ChatHeader user={displayName} photo={photo} />

              <MessageList />
              <div class="chat-input-container">
                <InputArea
                  isFetchingEnabled={isSigning}
                  fetchInterval={fetchInterval}
                />
              </div>
            </>
          )}
        </div>

        {!mobileView && (
          <div className="resizable-divider " onMouseDown={startDragging}>
            <i class="fa-solid fa-ellipsis-vertical fa-xl resize-icon border shadow"></i>
          </div>
        )}

        <div
          className="resizable-right-panel p-3"
          style={{ width: `${100 - leftWidth}%` }}
        >
          {displayName ? (
            <>
              <div class="row">
                <div class="d-flex justify-content-between align-items-center">
                  <div
                    key={countdown}
                    className="countdown-animation d-flex align-items-center fs-2"
                  >
                    <i
                      className={`fa-solid fa-stopwatch ${iconClass}`}
                      style={{
                        color:
                          countdown <= 4
                            ? countdown <= 2
                              ? "red"
                              : "orange"
                            : "initial",
                      }}
                    ></i>
                    <span className="ms-1">{countdown} s</span>
                  </div>
                  <HowToModal />
                </div>
              </div>

              <div class="row video-placeholder centered-text">
                {isSigning ? (
                  <iframe
                    src="https://archishab.github.io/VisuSpeak-MediaPipe-Model/"
                    allow="camera *; microphone *"
                    style={{
                      border: "none",
                      "-ms-overflow-style": "none" /* IE and Edge */,
                      "scrollbar-width": "none" /* Firefox */,
                      overflowX: "hidden",
                    }}
                    scrolling="no"
                    class="align-self-center"
                  ></iframe>
                ) : (
                  <>
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
                  </>
                )}
              </div>
              <div className="row mx-2">
                <div class="d-flex justify-content-between align-items-center action-buttons px-3 rounded-3 shadow" style={{ minHeight: "90px" }}>
                  <button
                    type="button"
                    className={`{btn camera-button-style btn-lg border border-3 rounded-3 ${
                      isSigning ? "active" : ""
                    }`}
                    onClick={toggleSigning}
                    aria-owns={
                      openCameraButtonPopover
                        ? "mouse-over-popover1"
                        : undefined
                    }
                    onMouseEnter={handlePopoverOpenCameraButton}
                    onMouseLeave={handlePopoverCloseCameraButton}
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
                    <Popover
                      id="mouse-over-popover1"
                      sx={{
                        pointerEvents: "none",
                      }}
                      open={openCameraButtonPopover}
                      anchorEl={anchorElCameraButton}
                      onClose={handlePopoverCloseCameraButton}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      disableRestoreFocus
                    >
                      <Typography sx={{ p: 1 }}>{`${
                        isSigning ? "Close" : "Open"
                      } Camera`}</Typography>
                    </Popover>
                  </button>
                  <div className="col-sm-9 interval-style">
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
                      onClick={() => handleSpeedChange(5000)}
                      aria-owns={
                        openSpeedButtonPopover
                          ? "mouse-over-popover2"
                          : undefined
                      }
                      onMouseEnter={handlePopoverOpenSpeedButton}
                      onMouseLeave={handlePopoverCloseSpeedButton}
                    >
                      <Typography className="fw-bold">5s</Typography>
                      <Popover
                        id="mouse-over-popover2"
                        sx={{
                          pointerEvents: "none",
                        }}
                        open={openSpeedButtonPopover}
                        anchorEl={anchorEl5sSpeedButton}
                        onClose={handlePopoverCloseSpeedButton}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        disableRestoreFocus
                      >
                        <Typography sx={{ p: 1 }}>Fast Speed</Typography>
                      </Popover>
                    </button>

                    <button
                      type="button"
                      className="btn camera-button-style m-1"
                      onClick={() => handleSpeedChange(10000)}
                      aria-owns={
                        anchorEl10sButton ? "mouse-over-popover10s" : undefined
                      }
                      aria-haspopup="true"
                      onMouseEnter={handlePopoverOpen10sButton}
                      onMouseLeave={handlePopoverClose10sButton}
                    >
                      10s
                    </button>
                    <Popover
                      id="mouse-over-popover10s"
                      sx={{ pointerEvents: "none" }}
                      open={Boolean(anchorEl10sButton)}
                      anchorEl={anchorEl10sButton}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      onClose={handlePopoverClose10sButton}
                      disableRestoreFocus
                    >
                      <Typography sx={{ p: 1 }}>Medium Speed</Typography>
                    </Popover>
                    <button
                      type="button"
                      className="btn camera-button-style m-1"
                      onClick={() => handleSpeedChange(15000)}
                      aria-owns={
                        anchorEl15sButton ? "mouse-over-popover15s" : undefined
                      }
                      aria-haspopup="true"
                      onMouseEnter={handlePopoverOpen15sButton}
                      onMouseLeave={handlePopoverClose15sButton}
                    >
                      15s
                    </button>
                    <Popover
                      id="mouse-over-popover15s"
                      sx={{ pointerEvents: "none" }}
                      open={Boolean(anchorEl15sButton)}
                      anchorEl={anchorEl15sButton}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      onClose={handlePopoverClose15sButton}
                      disableRestoreFocus
                    >
                      <Typography sx={{ p: 1 }}>Slow Speed</Typography>
                    </Popover>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div class="chat-placeholder rounded-3">
              <div class="centered-text lead p-3">
                Click on a chat to preview messages
              </div>
            </div>
          )}
        </div>
        {isDragging && (
          <div
            className="resizable-dragging-overlay"
            onMouseMove={onDrag}
            onMouseUp={stopDragging}
          />
        )}
      </div>
    </>
  );
};

export default ASLChat;
