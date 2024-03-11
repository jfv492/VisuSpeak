import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const HowToModal = () => {
  const { t } = useTranslation();
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
        class="btn"
        data-bs-toggle="modal"
        data-bs-target="#helpModal"
      >
        <i
          class="fa-solid fa-circle-question howto-icon fs-2"
          style={{ color: "#006262;" }}
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        ></i>
      </button>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>activatingASLMode</Typography>
      </Popover>
      <div
        class="modal fade"
        id="helpModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog text-start modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                <i
                  class="fa-solid fa-message me-2"
                  style={{ color: "#000000;" }}
                ></i>
                {t("helpSectionTitle")}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <h4>{t("activatingASLMode")}</h4>
              <p>
              {t("toInteractUsingASLFirstActivate")}
              </p>
              <hr/>
              <h4>{t("stepsForASLInteraction")}</h4>
              <ol>
                <li>
                  <strong>{t("activateCamera")}</strong> {t("ensureYourDevicesCamera")}
                </li>
                <li>
                  <strong>{t("signWord")}</strong> {t("referToOur")}{" "}
                  <a href="#">{t("listOfSupportedWords")}</a> {t("andSignOneOfTheseWords")}
                </li>
                <li>
                  <strong>{t("aiRecognition")}</strong> {t("onceYouSignAWord")}
                </li>
                <li>
                  <strong>{t("translationDisplay")}</strong> {t("thePredictedWord")}
                </li>
                <li>
                  <strong>{t("sendingMessages")}</strong> {t("clickSendButton")}{" "}
                  <strong>{t("sendButton")}</strong> {t("toIncludeInChat")}
                </li>
              </ol>
              <hr/>
              <h4>{t("adjustingRecognitionSpeed")}</h4>
              <p>
              {t("adjustingRecognitionSpeedDesc")}
              </p>
              <ul>
                <li>
                  <strong>{t("fastTimer")}</strong> {t("selectThisForQuicker")}
                </li>
                <li>
                  <strong>{t("mediumTimer")}</strong> {t("thisIsTheDefault")}
                </li>
                <li>
                  <strong>{t("slowTimer")}</strong> {t("chooseThisForMore")}
                </li>
              </ul>
              <div class="tips">
                <h4>{t("tipsForAccurateRecognition")}</h4>
                <ul>
                  <li>
                  {t("ensureGoodLighting")}
                  </li>
                  <li>
                  {t("practiceSupportedSigns")}
                  </li>
                </ul>
              </div>
              <p>
              {t("forAssistance")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToModal;
