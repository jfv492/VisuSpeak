import React, { useState, useEffect } from "react";

const MenuInfo = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentStep, setCurrentStep] = useState(1);
  const mobileView = windowWidth < 600;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="">
      {mobileView ? (
        <div>
          <button
            type="button"
            class="btn"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i class="fa-solid fa-circle-info fa-2xl"></i>
          </button>
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-fullscreen">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                  <i class="fa-solid fa-lightbulb me-2" style={{color: "#000000;"}}></i>
                  Disclaimer
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                The predicted words provided by the AI model are generated based on
            a trained dataset. While we strive for accuracy, we cannot guarantee
            the precise interpretation of signed words. Users should exercise
            discretion when relying on the predicted words and understand that
            the accuracy may vary. We do not assume responsibility for any
            inaccuracies in the predictions.
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div class="m-3">
          <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">
          <i class="fa-solid fa-lightbulb me-2" style={{color: "#000000;"}}></i>
          Disclaimer
          </h1>
          <p class="lead">
            The predicted words provided by the AI model are generated based on
            a trained dataset. While we strive for accuracy, we cannot guarantee
            the precise interpretation of signed words. Users should exercise
            discretion when relying on the predicted words and understand that
            the accuracy may vary. We do not assume responsibility for any
            inaccuracies in the predictions.
          </p>
          {/* <div class="d-grid gap-2 d-md-flex justify-content-md-start">
            <button type="button" class="btn btn-primary btn-lg px-4 me-md-2">
              Primary
            </button>
            <button type="button" class="btn btn-outline-secondary btn-lg px-4">
              Default
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default MenuInfo;
