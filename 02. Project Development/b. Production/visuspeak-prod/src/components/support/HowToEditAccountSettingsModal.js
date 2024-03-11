import React from "react";

const HowToEditAccountSettingsModal = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  return (
    <div>
      <button
        type="button"
        class="btn btn-lg button-style fs-6"
        data-bs-toggle="modal"
        data-bs-target="#editAccountSettingsModal"
      >
        Learn More
      </button>

      <div
        class="modal fade"
        id="editAccountSettingsModal"
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
                How-to Edit Account Settings
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
                    Click your username in the top right corner, then click "Account Settings". 
                </li>
                <li>
                    To change your profile picture:
                </li>

                <ol>
                    <li>
                        Click the camera icon in the bottom right corner of the profile picture placeholder. 
                    </li>
                    <li>
                        This will open up your file explorer. Locate the desired photo you wish to upload, click it, then click open.
                    </li>
                    <li>
                        This will upload your new profile picture, and it should load into the placeholder.  
                    </li>
                </ol>

                <li>
                    To change your password:
                </li>

                <ol>
                    <li>
                        Scroll to the "Edit Password" section, and click the edit button located beside this title. 
                    </li>
                    <li>
                        This will enable the text fields, and allow you to type in a new password. 
                    </li>
                    <li>
                        Type the new password in the password field as well as the confirm password field; ensure these are the same.  
                    </li>
                    <li>
                        Once you are done, click Save. Alternatively, you may hit Cancel instead if you choose not to change your password.   
                    </li>
                </ol>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToEditAccountSettingsModal;