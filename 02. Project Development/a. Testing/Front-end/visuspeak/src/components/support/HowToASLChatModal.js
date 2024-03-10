import React from "react";

const HowToASLChatModal = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  return (
    <div>
      <button
        type="button"
        class="btn btn-lg button-style fs-6"
        data-bs-toggle="modal"
        data-bs-target="#aslStartChatModal"
      >
        Learn More
      </button>

      <div
        class="modal fade"
        id="aslStartChatModal"
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
                How-to Start a Chat as an ASL User
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
                  Go to the "Home" page by clicking the VisuSpeak Logo in the top left corner of the page. 
                </li>
                <li>
                    Click the Start Conversation button. 
                </li>
                <li>
                    You will be prompted to fill in your first and last name. 
                </li>
                <li>
                    Enter the organization name the admin is employed at. 
                </li>
                <li>
                    Next, click the name of the admin you wish to start a chat with.  
                </li>
                <li>
                    You will enter the chat interface and can begin chatting with the admin. You can send 
                    messages to the admin user using the various input methods (text, audio, signing). 
                </li>
                <li>
                    When you are done chatting, you can simply exit the chat page.  
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToASLChatModal;