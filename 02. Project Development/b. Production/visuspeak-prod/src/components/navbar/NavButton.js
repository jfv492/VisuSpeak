import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import User from "./User.js";

const NavButton = () => {
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
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
            <User />
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav nav nav-pills nav-pills-link-active-color ms-auto justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" && localStorage.getItem("username") != null ? "active" : ""
                } ${
                  localStorage.getItem("username") === null ? "disabled" : ""
                }`}
                to="/"
                role="button"
                aria-expanded="false"
              >
                Chat
              </Link>
            </li>
            <li class="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/resources" ? "active" : ""
                }`}
                aria-current="page"
                to="/resources"
              >
                Resources
              </Link>
            </li>
            <li class="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About Us
              </Link>
            </li>
            {!mobileView && <User />}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavButton;
