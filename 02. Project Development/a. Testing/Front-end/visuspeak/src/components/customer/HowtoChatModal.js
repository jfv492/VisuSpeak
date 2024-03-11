import React from "react";
import { useTranslation } from "react-i18next";

const HowtoChatModal = () => {
  const { t } = useTranslation();
  return (
    <div>
      <button
        type="button"
        class="btn"
        data-bs-toggle="modal"
        data-bs-target="#aslChatModal"
      >
        <i class="fa-solid fa-circle-question fs-1"></i>
      </button>

      <div
        class="modal fade"
        id="aslChatModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
              {t('howToUse')}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div>
                <h4>{t("searchingForAdmin")}</h4>
                <ol>
                  <li>{t("accessSearchFeature")}</li>
                  <li>{t("enterAdminName")}</li>
                  <li>{t("selectFromSuggestions")}</li>
                </ol>
              </div>
              <hr/>
              <div>
                <h4>{t("startingChatWithUsers")}</h4>
                <ol>
                  <li>{t("searchForUsers")}</li>
                  <li>{t("selectUsersForChat")}</li>
                  <li>{t("initiateChat")}</li>
                </ol>
              </div>
              <hr/>
              <div>
                <h4>{t("sortingChats")}</h4>
                <ol>
                  <li>{t("goToChatOverview")}</li>
                  <li>{t("selectSortOption")}</li>
                  <li>{t("chooseSortingMethod")}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowtoChatModal;
