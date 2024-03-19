import * as React from "react";
import HowToASLChatModal from "./HowToASLChatModal.js";
import HowToSignIntoCameraModal from "./HowToSignIntoCameraModal.js"
import { useTranslation } from "react-i18next";

const ASLUserSupport = (props) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="support-cards-container-odd">
        <h3>{t("ASLUserSupport")}</h3>
        <div class="row mt-2 support-grid">
          <div class="col p-2 card resources-grid-item" aria-hidden="true">
            <div class="card-body">
              <h4 class="card-title border-bottom">{t("HowToStartAChat")}</h4>
              <p class="card-text py-3 large-text-style">
                {t("HowToStartAChatUserDescription")}
              </p>
              <HowToASLChatModal />
            </div>
          </div>

          <div class="col p-2 card resources-grid-item" aria-hidden="true">
            <div class="card-body">
              <h4 class="card-title border-bottom">{t("HowToUseTheCameraToSign")}</h4>
              <p class="card-text py-3 large-text-style">
                {t("HowToUseTheCameraToSignDescription")}
              </p>
              <HowToSignIntoCameraModal />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ASLUserSupport;
