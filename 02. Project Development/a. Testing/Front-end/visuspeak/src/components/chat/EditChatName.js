import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // For making HTTP requests
import serverUrl from "../../Server-env.js"; // URL of the server

const EditChatName = () => {
  let navigate = useNavigate(); // Hook for navigation
  const endChat = `${serverUrl}/chat/endsession`;

  // Function to end chat session
  const endChatSession = async () => {
    try {
      const response = await axios.post(endChat, {
        sessionId: localStorage.getItem("sessionId"),
      });

      if (response.status === 200) {
        console.log("Chat session ended successfully");
        navigate("/chat");
      }
    } catch (error) {
      console.error("Error ending chat session:", error);
    }
  };
  return (
    <div class="d-flex align-items-center link-body-emphasis messages-heading my-3">
      <button
        class="btn back-button-style bg-gradient"
        type="button"
        aria-expanded="false"
        onClick={endChatSession}
      >
        <i class="fa-solid fa-angle-left"></i>
      </button>
      <p class="h2 ms-3 mt-2 border-bottom">New Chat</p>
      <i
        class="fa-solid fa-pen fa-xl ms-2 me-5"
        style={{ color: "#000000;" }}
      ></i>
    </div>
  );
};

export default EditChatName;
