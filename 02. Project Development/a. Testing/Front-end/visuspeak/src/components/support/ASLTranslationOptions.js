import * as React from "react";

const ASLTranslationOptions = () => {
  return (
    <>
      <div className="support-cards-container">
        <h3>Current ASL Translation Capabilities</h3>
        <div class="accordion accordion-flush" id="accordionPanelsStayOpenExample">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                Letters
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body">
                All letters in the English Alphabet (A-Z).
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                Words
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body">
                <div className="row">
                  <div className="col">
                    <ul>
                      <li>Ask</li>
                      <li>Good</li>
                      <li>Hello</li>
                      <li>I</li>
                      <li>More</li>
                    </ul>
                  </div>

                  <div className="col">
                    <ul>
                      <li>No</li>
                      <li>Please</li>
                      <li>Sorry</li>
                      <li>They</li>
                      <li>We</li>
                    </ul>
                  </div>

                  <div className="col">
                    <ul>
                      <li>What</li>
                      <li>Where</li>
                      <li>Who</li>
                      <li>Why</li>
                      <li>Yes</li>
                    </ul>
                  </div>

                  <div className="col">
                    <ul>
                      <li>You</li>
                      <li>Your</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
                aria-expanded="false"
                aria-controls="flush-collapseThree"
              >
                Phrases
              </button>
            </h2>
            <div
              id="flush-collapseThree"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body">
                <ul>
                  <li>I Love You</li>
                  <li>Good Bye</li>
                  <li>Thank You</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ASLTranslationOptions;
