import React from "react";

const HowToAdminChatModal = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  return (
    <div>
      <button
        type="button"
        class="btn btn-lg button-style fs-6"
        data-bs-toggle="modal"
        data-bs-target="#adminStartChatModal"
      >
        Learn More
      </button>

      <div
        class="modal fade"
        id="adminStartChatModal"
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
                How-to Start a Chat as an Admin User
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
                  Go to the "Chat" page using the navigation bar at the top of the page. 
                </li>
                <li>
                    All previous conversations will appear in a list on the left. There are several ways you
                    can find the user you wish to chat with:
                </li>

                <ul>
                    <li>
                        If you see the user right away, you may simply click their name to enter the chat. 
                    </li>
                    <li>
                        Filter the chats from newest to oldest, oldest to newest, or toggling archived/non-archived to find
                        the user.
                    </li>
                    <li>
                        Type the first and last name of the user in the search bar. 
                    </li>
                </ul>

                <li>
                    Once you see them listed on the left, click their name to begin the chat. <br/>
                    <i>Please note, the user will not appear in the list if they are not currently online.</i>
                </li>
                <li>
                  After clicking their name, you will then enter the chat interface, and may begin chatting with this user. 
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToAdminChatModal;