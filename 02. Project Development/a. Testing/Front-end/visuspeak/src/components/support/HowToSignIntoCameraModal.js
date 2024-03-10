import React from "react";

const HowToSignIntoCameraModal = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  return (
    <div>
      <button
        type="button"
        class="btn btn-lg button-style fs-6"
        data-bs-toggle="modal"
        data-bs-target="#signIntoCameraModal"
      >
        Learn More
      </button>

      <div
        class="modal fade"
        id="signIntoCameraModal"
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
                How-to Use the Camera for Signing
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
                    Once you enter a chat with an admin, there will be a section on the right for hand gesture input.  
                </li>
                <li>
                    Click the camera icon within this section to open your camera. <br/>
                    <i>Please note, you might need to allow VisuSpeak to access your camera.</i>
                </li>
                <li>
                    Once the camera opens, you may begin signing into the camera. There will be outlines on your hand to 
                    indicate the system is actively predicting your gestures. Within this screen, you will see what words 
                    the system is predicting in real time.   
                </li>
                <li>
                    There is a timer that is present on the screen, when this timer reaches 0, the predicted input will appear 
                    in the text input field so you may edit, delete, or send it. You have an option to change the time it counts 
                    down from, or you can simply press the accept button instead of waiting for the timer to complete. 
                </li>
                <li>
                    Once you are satisified with the message, you may click send. 
                </li>
                <li>
                    At any point, if you no longer wish to use the ASL prediction feature, you may close the camera and continue to 
                    send message via text or audio input.  
                </li>
                <li>
                    If you wish to repoen the camera, simply click the camera icon again.   
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToSignIntoCameraModal;