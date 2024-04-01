import React from "react";
import { useTranslation } from "react-i18next";

const HowToEditAccountSettingsModal = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  return (
    <div>
      <button
        type="button"
        class="btn"
        data-bs-toggle="modal"
        data-bs-target="#editAccountSettingsModal"
      >
        <div class="card text-center btn-raised p-3" aria-hidden="true">
          <div className="card-heading">
            <i class="fa-solid fa-gear fs-1"></i>
            <h4 class="card-title mt-3">{t("HowToEditAccountSettings")}</h4>
          </div>
          <div class="card-body">
            <p class="card-text large-text-style">
              {t("HowToEditAccountSettingsDescription")}
            </p>
          </div>
        </div>
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
                {t("AdminSupportModalHeading2")}
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
                <li>{t("AdminAccountSupportModalDescription1")}</li>
                <li>{t("AdminAccountSupportModalDescription2")}</li>

                <ol>
                  <li>{t("AdminAccountSupportModalDescription2Sub1")}</li>
                  <li>{t("AdminAccountSupportModalDescription2Sub2")}</li>
                  <li>{t("AdminAccountSupportModalDescription2Sub3")}</li>
                </ol>

                <li>{t("AdminAccountSupportModalDescription3")}</li>

                <ol>
                  <li>{t("AdminAccountSupportModalDescription3Sub1")}</li>
                  <li>{t("AdminAccountSupportModalDescription3Sub2")}</li>
                  <li>{t("AdminAccountSupportModalDescription3Sub3")}</li>
                  <li>{t("AdminAccountSupportModalDescription3Sub4")}</li>
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
