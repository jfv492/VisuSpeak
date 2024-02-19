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
      {localStorage.getItem("username") == null ? (
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
      ) : (
        <div className="d-flex gap-4 d-sm-flex justify-content-center mt-5">
          <p class="lead">
            You are logged in as{" "}
            <b style={{ color: "#006262" }}>
              {localStorage.getItem("username")}
            </b>
            . To use a different account please{" "}
            <Link class="hyperlink" onClick={handleSignOut} to="/">
              logout
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default HomeNavigation;
