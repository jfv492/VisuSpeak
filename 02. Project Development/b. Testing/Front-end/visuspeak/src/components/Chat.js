import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login(props) {
    let navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("username")) {
          navigate("/");
        }
      }, []);
  return (
    <div className="hero px-4 py-5 text-center shadow-lg">
      <div className="container text-right">
        <div className="container text-center">
          <div className="row">
            <div className="container my-5">
              <div>
                <h1 className="display-3 mt-5 fw-bold ">
                  Welcome, {localStorage.getItem("username")}!
                </h1>
              </div>
            </div>
            <div className="col">
            </div>
            <div className="col">
            <div className="d-grid gap-2">
              <Link
                to="/new-chat"
                className="btn btn-lg large-button-style my-5"
                tabIndex="1"
                role="button"
              >
                Start New Chat
              </Link>
            
              <Link
                to="/transcript-history"
                className="btn large-button-style btn-lg mb-5"
                tabIndex="2"
                role="button"
              >
                View Transcript History
              </Link>
            </div>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </div>
    </div>
  );
}