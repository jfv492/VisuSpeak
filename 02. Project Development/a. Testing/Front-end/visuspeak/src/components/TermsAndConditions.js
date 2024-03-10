import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const TermsAndConditions = ({ onAccept }) => {
  const { t } = useTranslation();
  return (
    <div>
      <Link
        className="hyperlink ms-1"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        {t("TermsAndConditions")}
      </Link>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                {t("TermsAndConditionsHeading")}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p>{t("TermsIntro")}</p>
              <h4>{t("UseOfApplication")}</h4>
              <p>{t("UseOfApplicationDesc1")}</p>
              <p>{t("UseOfApplicationDesc2")}</p>
              <h4>{t("IntellectualPropertyRights")}</h4>
              <p>{t("IntellectualPropertyRightsDesc1")}</p>
              <p>{t("IntellectualPropertyRightsDesc2")}</p>
              <h4>{t("DisclaimerOfWarranties")}</h4>
              <p>{t("DisclaimerOfWarrantiesDesc1")}</p>
              <p>{t("DisclaimerOfWarrantiesDesc2")}</p>
              <p>{t("DisclaimerOfWarrantiesDesc3")}</p>
              <h4>{t("LimitationOfLiability")}</h4>
              <p>{t("LimitationOfLiabilityDesc")}</p>
              <h4>{t("GoverningLaw")}</h4>
              <p>{t("GoverningLawDesc1")}</p>
              <p>{t("GoverningLawDesc2")}</p>
              <h4>{t("ChangesToTerms")}</h4>
              <p>{t("ChangesToTermsDesc")}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn" data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                class="btn modal-button-style btn-raised rounded-pill"
                data-bs-dismiss="modal" 
                onClick={onAccept} 
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
