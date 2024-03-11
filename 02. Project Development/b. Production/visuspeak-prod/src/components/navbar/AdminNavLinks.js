import React, { useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import User from "./User";
import NotificationsList from "../notifications/NotificationList";
import { AuthContext } from "../../context/AuthContext.js";

const AdminNavLinks = () => {
  const { currentUser } = useContext(AuthContext);
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

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
        <ul class="navbar-nav nav nav-pills nav-pills-link-active-color ms-auto justify-content-end flex-grow-1 gap-2">
          <li class="nav-item">
            <Link
              className={`nav-link btn-raised fs-3 ${
                location.pathname === "/chat" ? "active" : ""
              }`}
              aria-current="page"
              to="/chat"
            >
              <i class="fa-solid fa-comment"></i>
            </Link>
          </li>
          <li class="nav-item dropdown-center">
            
              <NotificationsList userId={currentUser?.uid} />
          </li>
          <li class="nav-item">
            <User />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavLinks;
