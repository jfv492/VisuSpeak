import React from "react";
import { useTranslation } from "react-i18next";

const HowToSignIntoCameraModal = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  return (
    <div>
      <button
        type="button"
        class="btn"
        data-bs-toggle="modal"
        data-bs-target="#signIntoCameraModal"
      >
        <div class="card text-center btn-raised p-3" aria-hidden="true">
          <div className="card-heading">
            <i class="fa-solid fa-video fs-1"></i>
            <h4 class="card-title mt-3">{t("HowToUseTheCameraToSign")}</h4>
          </div>
          <div class="card-body">
            <p class="card-text large-text-style">
              {t("HowToUseTheCameraToSignDescription")}
            </p>
          </div>
        </div>
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
                {t("ASLUserModalHeading2")}
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
                <li>{t("ASLUserCameraDescription1")}</li>
                <li>
                  {t("ASLUserCameraDescription2")} <br />
                  <i>{t("ASLUserCameraDescription2Sub1")} </i>
                </li>
                <li>{t("ASLUserCameraDescription3")}</li>
                <li>{t("ASLUserCameraDescription4")}</li>
                <li>{t("ASLUserCameraDescription5")}</li>
                <li>{t("ASLUserCameraDescription6")}</li>
                <li>{t("ASLUserCameraDescription7")}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToSignIntoCameraModal;
