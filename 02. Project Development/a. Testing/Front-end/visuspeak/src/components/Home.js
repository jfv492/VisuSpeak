import React, { useEffect } from "react";
import StockImage from "../images/FillerPhoto.jpg";
import { Link, useLocation } from "react-router-dom";
import Background from "./Background.js";

export default function Home() {
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <>
      <div className={`hero px-4 py-5 text-center shadow-lg  ${
                    location.pathname === "/about" ? "d-none" : ""
                  }`} >
        <h1 className="display-3 mt-5 fw-bold ">
          Welcome to VisuSpeak
        </h1>
        <div className="col-lg-6 mx-auto">
          <h1 className="display-5 text-body-emphasis">Your ASL Companion</h1>
          <div className="d-grid gap-4 d-sm-flex justify-content-sm-center my-5">
            <Link
              to="/login"
              className="btn btn-lg button-style" 
              tabIndex="1"
              role="button"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="btn btn-lg button-style"
              tabIndex="2"
              role="button"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div className={`b-example-divider  ${
                    location.pathname === "/about" ? "d-none" : ""
                  }`}>
      </div>
      <div>
          <Background />
      </div>
    
    </>
  );
}
