import React, { useEffect, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import User from "./User";
import NotificationsList from "../notifications/NotificationList";
import { AuthContext } from "../../context/AuthContext.js";
import LanguageSwitcher from "./LanguageSwitcher.js";

const AdminNavLinks = () => {
  const { currentUser } = useContext(AuthContext);
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
        <ul class="navbar-nav nav nav-pills nav-pills-link-active-color ms-auto justify-content-end flex-grow-1 gap-2">
          {mobileView && (
            <li class="nav-item">
              <User />
            </li>
          )}
          <li class="nav-item">
            <Link
              className={`nav-link btn-raised fs-3 ${
                location.pathname === "/chat" ? "active" : ""
              }`}
              aria-current="page"
              
              to="/chat"
            >
              <i class="fa-solid fa-comment"></i>{mobileView && <span className="ms-2">Chat</span>}
            </Link>
          </li>
          <li class="nav-item dropdown-center">
          {!mobileView && <NotificationsList userId={currentUser?.uid} />}
          </li>
          {!mobileView && (
            <li class="nav-item">
              <User />
            </li>
          )}
          {mobileView && (
            <li class="nav-item">
              <LanguageSwitcher />
            </li>
          )}
        </ul>
      </div>
    </div>
    </>
  );
};

export default AdminNavLinks;
