import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // For routing
import EditChatName from "../components/EditChatName.js";
import MessageList from "../components/MessageList.js";
import ChatBox from "../components/ChatBox.js";

const ASLChat = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentStep, setCurrentStep] = useState(1);
  const mobileView = windowWidth < 600;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div class="container text-begin py-3">
      <div class="row">
        <div class="col-sm-5">
          <EditChatName />
          <ChatBox />
        </div>
        <div class="col-sm-7">
          
        </div>
      </div>
    </div>
  );
};

export default ASLChat;
