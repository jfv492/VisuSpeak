import * as React from "react";
import HowToAdminChatModal from "./HowToAdminChatModal.js";
import HowToEditAccountSettingsModal from "./HowToEditAccountSettingsModal.js"

const AdminUserSupport = (props) => {
  return (
    <>
      <div className="support-cards-container">
        <h3>Admin User Support</h3>
        <div class="row mt-2 support-grid">
            <div class="col p-2 card resources-grid-item" aria-hidden="true">
                <div class="card-body">
                <h4 class="card-title border-bottom">How to Start a Chat</h4>
                <p class="card-text py-3 large-text-style">
                    Learn how to start a conversation with an ASL User so you can assist 
                    them with their customer service needs.
                </p>
                <HowToAdminChatModal />
                </div>
            </div>

          <div class="col p-2 card resources-grid-item" aria-hidden="true">
            <div class="card-body">
            <h4 class="card-title border-bottom">How to Edit Account Settings</h4>
              <p class="card-text py-3 large-text-style">
                Learn how to edit your account setttings like passwords and profile picture from the Admin Dashboard. 
              </p>
              <HowToEditAccountSettingsModal />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUserSupport;
