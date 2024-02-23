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
        class="btn fs-3 "
        data-bs-toggle="modal"
        data-bs-target="#helpModal"
      >
        <i
          class="fa-solid fa-circle-question howto-icon fa-lg mt-4 "
          style={{ color: "#006262;" }}
          aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        ></i>
      </button>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
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
        <div class="modal-dialog text-start">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                <i
                  class="fa-solid fa-message me-2"
                  style={{ color: "#000000;" }}
                ></i>
                How-to Chat
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <ol>
                <li>
                  Activate the camera for American Sign Language (ASL)
                  interaction.
                </li>
                <li>
                  Sign one of the available words that can be recognized by the
                  AI model into the camera window (Click here for list of
                  supported words).
                </li>
                <li>The AI Model will detect and predict the signed word.</li>
                <li>
                  The predicted word will be translated from ASL to English and
                  displayed in the text input field.
                </li>
                <li>
                  If the predicted word matches the desired word, you can send
                  it in the chat by clicking the send button.
                </li>
                <li>
                  Adjust recognition speed using the slider/button [depending on
                  what we choose]:
                  <ul>
                    <li>Select "5s" for a fast timer.</li>
                    <li>Choose "10s" for a medium timer (default).</li>
                    <li>Opt for "15s" for a slow timer.</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToModal;
