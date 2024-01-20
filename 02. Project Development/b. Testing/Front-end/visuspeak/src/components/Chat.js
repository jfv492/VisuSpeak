import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
        <div class="container text-center">
          <div class="row">
            <div class="col"></div>
            <div class="col">
              <div class="d-grid gap-2 my-2">
                <Link
                  to="/newchat"
                  class="btn large-button-style btn-lg my-5"
                  type="button"
                >
                  Start New Chat
                </Link>
                <button
                  class="btn large-button-style btn-lg mb-5"
                  type="button"
                >
                  View Transcript History
                </button>
              </div>
            </div>
            <div class="col">
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
