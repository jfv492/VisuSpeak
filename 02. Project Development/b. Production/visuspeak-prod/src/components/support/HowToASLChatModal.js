import React from "react";
import { useTranslation } from "react-i18next";

const HowToASLChatModal = () => {
  const { t } = useTranslation();
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
        {t("SupportLearnMoreButton")} 
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
                {t("ASLUserModalHeading1")}
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
                  {t("ASLUSerChatSupportDescription1")} 
                </li>
                <li>
                  {t("ASLUSerChatSupportDescription2")}  
                </li>
                <li>
                  {t("ASLUSerChatSupportDescription3")} 
                </li>
                <li>
                  {t("ASLUSerChatSupportDescription4")}  
                </li>
                <li>
                  {t("ASLUSerChatSupportDescription5")}  
                </li>
                <li>
                  {t("ASLUSerChatSupportDescription6")}  
                </li>
                <li>
                  {t("ASLUSerChatSupportDescription7")}  
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