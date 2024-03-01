import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const HomeNavigation = () => {
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      <h1 className="display-3 mt-5 fw-bold ">Welcome to VisuSpeak</h1>
      <div className="col-sm-6 mx-auto">
        <h1 className="display-5 text-body-emphasis">Your ASL Companion</h1>
        <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-5 mb-lg-3">
          <Link
            to="/login"
            className="btn btn-lg home-button-style"
            tabIndex="1"
            role="button"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="btn btn-lg home-button-style"
            tabIndex="2"
            role="button"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeNavigation;
