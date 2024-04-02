import React from "react";
import { useTranslation } from "react-i18next";

const HowToAdminChatModal = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  return (
    <div>
      <button
        type="button"
        class="btn"
        data-bs-toggle="modal"
        data-bs-target="#adminStartChatModal"
      >
        <div class="card text-center btn-raised p-3" aria-hidden="true">
          <div className="card-heading">
            <i class="fa-solid fa-message fs-1"></i>
            <h4 class="card-title mt-3">{t("HowToStartAChat")}</h4>
          </div>
          <div class="card-body">
            <p class="card-text large-text-style">
              {t("HowToStartAChatDescription")}
            </p>
          </div>
        </div>
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
                {t("AdminSupportModalHeading")}
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
                <li>{t("AdminChatSupportModalDescription1")}</li>
                <li>{t("AdminChatSupportModalDescription2")}</li>

                <ul>
                  <li>{t("AdminChatSupportModalDescription2Sub1")}</li>
                  <li>{t("AdminChatSupportModalDescription2Sub2")}</li>
                  <li>{t("AdminChatSupportModalDescription2Sub3")}</li>
                </ul>

                <li>
                  {t("AdminChatSupportModalDescription3")} <br />
                  <i>{t("AdminChatSupportModalDescription3Sub1")} </i>
                </li>
                <li>{t("AdminChatSupportModalDescription4")}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToAdminChatModal;
