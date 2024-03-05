import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

const HowToModal = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div>
      <button
        type="button"
        class="btn"
        data-bs-toggle="modal"
        data-bs-target="#helpModal"
      >
        <i
          class="fa-solid fa-circle-question howto-icon fs-2"
          style={{ color: "#006262;" }}
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        ></i>
      </button>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>How-to use the chat</Typography>
      </Popover>
      <div
        class="modal fade"
        id="helpModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog text-start modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                <i
                  class="fa-solid fa-message me-2"
                  style={{ color: "#000000;" }}
                ></i>
                Help Section: ASL Interaction Feature
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <h2>Help Section: ASL Interaction Feature</h2>
              <h3>Activating ASL Mode</h3>
              <p>
                To interact using American Sign Language (ASL), first activate
                the camera feature in the app. This allows you to sign words
                directly into the camera for the AI model to recognize and
                translate.
              </p>
              <h3>Steps for ASL Interaction</h3>
              <ol>
                <li>
                  <strong>Activate the Camera:</strong> Ensure your device's
                  camera is enabled and positioned to capture your signing
                  clearly.
                </li>
                <li>
                  <strong>Sign a Word:</strong> Refer to our{" "}
                  <a href="#">list of supported words</a> and sign one of these
                  words into the camera. Make sure your signs are clear and
                  within the camera's view.
                </li>
                <li>
                  <strong>AI Recognition:</strong> Once you sign a word, our AI
                  model will attempt to detect and predict the signed word.
                </li>
                <li>
                  <strong>Translation Display:</strong> The predicted word will
                  be automatically translated from ASL to English and appear in
                  the text input field of the chat.
                </li>
                <li>
                  <strong>Sending Messages:</strong> If the AI correctly
                  predicts the word you signed, simply click the{" "}
                  <strong>Send</strong> button to include it in your chat
                  conversation.
                </li>
              </ol>
              <h3>Adjusting Recognition Speed</h3>
              <p>
                To accommodate various signing speeds, you can adjust the AI's
                recognition timing:
              </p>
              <ul>
                <li>
                  <strong>Fast Timer (5s):</strong> Select this for quicker
                  recognition. Ideal for experienced signers.
                </li>
                <li>
                  <strong>Medium Timer (10s):</strong> This is the default
                  setting, offering a balanced speed.
                </li>
                <li>
                  <strong>Slow Timer (15s):</strong> Choose this for a more
                  relaxed recognition pace, allowing more time for signing.
                </li>
              </ul>
              <div class="tips">
                <h3>Tips for Accurate Recognition</h3>
                <ul>
                  <li>
                    Ensure good lighting and a clear background to improve the
                    AI's ability to recognize your signs.
                  </li>
                  <li>
                    Practice the supported signs to become familiar with how the
                    AI model recognizes different gestures.
                  </li>
                </ul>
              </div>
              <p>
                For further assistance or to report any issues, please contact
                our support team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToModal;
