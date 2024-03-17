import * as React from "react";
import HowToAdminChatModal from "./HowToAdminChatModal.js";
import HowToEditAccountSettingsModal from "./HowToEditAccountSettingsModal.js"
import { useTranslation } from "react-i18next";

const AdminUserSupport = (props) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="support-cards-container">
        <h3>{t("AdminUserSupport")}</h3>
        <div class="row mt-2 support-grid">
            <div class="col p-2 card resources-grid-item" aria-hidden="true">
                <div class="card-body">
                <h4 class="card-title border-bottom">{t("HowToStartAChat")}</h4>
                <p class="card-text py-3 large-text-style">
                  {t("HowToStartAChatDescription")}
                </p>
                <HowToAdminChatModal />
                </div>
            </div>

          <div class="col p-2 card resources-grid-item" aria-hidden="true">
            <div class="card-body">
            <h4 class="card-title border-bottom">{t("HowToEditAccountSettings")}</h4>
              <p class="card-text py-3 large-text-style">
                {t("HowToEditAccountSettingsDescription")} 
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
