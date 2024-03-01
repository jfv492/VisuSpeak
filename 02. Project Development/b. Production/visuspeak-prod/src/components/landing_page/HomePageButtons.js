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
    <div class="d-flex flex-column justify-content-center row-gap-5">
      <Link
        to="/adminchat"
        class="btn menu-button-style btn-lg"
        type="button"
      >
        <i
          class="fa-solid fa-message fa-xl me-3"
          style={{ color: "#ffffff" }}
        ></i>
        Admin Chat
      </Link>
      <Link
        to="/aslchat"
        class="btn menu-button-style btn-lg mt-auto"
        type="button"
      >
        <i
          class="fa-solid fa-hand fa-2xl me-3"
          style={{ color: "#ffffff" }}
        ></i>
        ASL Chat
      </Link>
    </div>
  );
}
