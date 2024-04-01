import * as React from "react";
import HowToAdminChatModal from "./HowToAdminChatModal.js";
import HowToEditAccountSettingsModal from "./HowToEditAccountSettingsModal.js";
import { useTranslation } from "react-i18next";

const AdminUserSupport = (props) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="support-cards-container text-center">
        <h3 className="about-us-headers pb-3">
          {t("AdminUserSupport")}
        </h3>
        <div class="row mt-2 gap-4 support-cards-container">
          <div className="col-sm-5">
            <HowToAdminChatModal />
          </div>
          <div className="col-sm-5">
            <HowToEditAccountSettingsModal />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUserSupport;
