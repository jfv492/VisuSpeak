import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import serverUrl from "../../Server-env.js";

export default function Login(props) {
  const startChat = `${serverUrl}/chat/startsession`;

  const [currentSessionId, setCurrentSessionId] = useState(null);

  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate("/");
    }
  }, []);

  const startNewChatSession = async () => {
    try {
      const response = await axios.post(startChat, {
        userID: localStorage.getItem("userID"),
      });
      if (response.status === 200) {
        setCurrentSessionId(response.data.sessionId);
        localStorage.setItem("sessionId", response.data.sessionId);
        console.log("Session id: ", localStorage.getItem("sessionId"));
      }
    } catch (error) {
      console.error("Error starting new chat session:", error);
    }
  };

  return (
    <div class="d-flex flex-column justify-content-center row-gap-5">
      <Link
        to="/adminchat"
        class="btn menu-button-style btn-lg"
        type="button"
        onClick={startNewChatSession}
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
