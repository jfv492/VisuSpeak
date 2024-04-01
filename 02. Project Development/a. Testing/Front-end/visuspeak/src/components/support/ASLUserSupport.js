import * as React from "react";
import HowToASLChatModal from "./HowToASLChatModal.js";
import HowToSignIntoCameraModal from "./HowToSignIntoCameraModal.js";
import { useTranslation } from "react-i18next";

const ASLUserSupport = (props) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="support-cards-container text-center">
        <h3 className="about-us-headers pb-3">{t("ASLUserSupport")}</h3>
        <div class="row mt-2 gap-4 support-cards-container">
          <div className="col-sm-5">
            <HowToASLChatModal />
          </div>
          <div className="col-sm-5">
          <HowToSignIntoCameraModal />
          </div>
        </div>
      </div>
    </>
  );
};

export default ASLUserSupport;
