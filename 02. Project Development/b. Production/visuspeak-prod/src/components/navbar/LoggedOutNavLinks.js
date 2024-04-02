import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const NavButton = () => {
  const { t } = useTranslation();
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const mobileView = windowWidth < 600;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
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
        <ul class="navbar-nav nav nav-pills nav-pills-link-active-color ms-auto justify-content-end flex-grow-1 pe-3">
          <li class="nav-item dropdown">
            <Link
              class="nav-link dropdown-toggle btn-raised user-nav-link"
              to="/"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {t("Admin")}
            </Link>
            <ul class="dropdown-menu p-2 shadow-lg dropdown-menu-lg-end">
              <li>
                <Link class="dropdown-item" to="/login">
                  {t("Login")}
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/signup">
                  {t("Sign-up")}
                </Link>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <Link
              className={`nav-link btn-raised ${
                location.pathname === "/resources" ? "active" : ""
              }`}
              aria-current="page"
              to="/resources"
            >
              {t("Resources")}
            </Link>
          </li>
          <li class="nav-item">
            <Link
              className={`nav-link btn-raised ${
                location.pathname === "/about" ? "active" : ""
              }`}
              to="/about"
            >
              {t("About Us")}
            </Link>
          </li>
          {mobileView && (
            <li class="nav-item">
              <LanguageSwitcher />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavButton;
