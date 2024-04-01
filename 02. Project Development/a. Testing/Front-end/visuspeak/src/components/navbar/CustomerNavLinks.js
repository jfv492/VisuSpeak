import React, { useEffect, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import defaultProfilePicture from "../../assets/images/AccountSettingsHeadshot.jpg";
import HowtoChatModal from "../customer/HowtoChatModal.js";
import { useTranslation } from "react-i18next";
import FeedbackForm from "../customer/FeedbackForm.js";

const CustomerNavLinks = () => {
  const { t } = useTranslation();
  const { currentUser, updateAccountType, updateOrganizationName } =
    useContext(AuthContext);
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <>
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel"></h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav nav nav-pills nav-pills-link-active-color ms-auto justify-content-end align-items-center flex-grow-1 gap-2">
            <li class="nav-item">
              <HowtoChatModal />
            </li>
            <li class="nav-item">
            <FeedbackForm />
              
            </li>
            <li class="nav-item">
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  src={currentUser?.photoURL || defaultProfilePicture}
                  alt="User"
                  className="rounded-circle"
                  style={{ width: "45px", height: "45px", objectFit: "cover" }}
                />
                <i
                  className="fa-solid fa-circle-check"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    color: "#77bb41",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    padding: "3px",
                    transform: "translate(30%, 30%)",
                  }}
                />
              </div>
            </li>
            <li class="nav-item lh-1 align-self-center">
              <span className="fw-light fs-6">{t("Hello")} </span>
              <br />
              <strong className="fs-5">
                {localStorage.getItem("username")}
              </strong>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CustomerNavLinks;
