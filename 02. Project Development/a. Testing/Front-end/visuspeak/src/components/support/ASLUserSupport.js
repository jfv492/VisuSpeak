import * as React from "react";

const ASLUserSupport = () => {
  return (
    <>
      <div className="support-cards-container-odd">
        <h3>ASL User Support</h3>
        <div class="row mt-2 support-grid">
          <div class="col p-2 card resources-grid-item" aria-hidden="true">
            <div class="card-body">
              <h4 class="card-title border-bottom">How to Start a Chat</h4>
              <p class="card-text py-3 large-text-style">
                Learn how to start a conversation with an Admin so they can assist 
                you with your customer service needs.
              </p>
              <a class="btn btn-lg button-style fs-6">Learn More</a>
            </div>
          </div>

          <div class="col p-2 card resources-grid-item" aria-hidden="true">
            <div class="card-body">
              <h4 class="card-title border-bottom">How to Use the Camera to Sign</h4>
              <p class="card-text py-3 large-text-style">
                Learn how to open the camera, allow permissions, and sign into the camera for sending ASL spoken messages.
              </p>
              <a class="btn btn-lg button-style fs-6">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ASLUserSupport;
