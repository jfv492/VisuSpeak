import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Background from "./Background.js";
import serverUrl from "../Server-env.js";

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
    <>
      <div className="hero text-center d-flex align-items-center shadow-lg p-3 mb-5 bg-body-tertiary rounded">
        <div class="container text-center">
          <div class="row justify-content-center">
            <div class="col-sm-4 chat-buttons d-flex flex-column">
              <Link
                to="/aslchat"
                class="btn large-button-style btn-lg mb-3"
                type="button"
                onClick={startNewChatSession}
              >
                <i
                  class="fa-solid fa-message fa-xl me-4"
                  style={{ color: "#ffffff" }}
                ></i>
                Start New Chat
              </Link>
              <Link
                to="/history"
                class="btn large-button-style btn-lg mt-3"
                type="button"
              >
                <i
                  class="fa-solid fa-clock-rotate-left fa-2xl me-4"
                  style={{ color: "#ffffff" }}
                ></i>
                View Transcript History
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Background />
      </div>
    </>
  );
}
