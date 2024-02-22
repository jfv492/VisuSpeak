import React from "react";

const ChatHeader = () => {
  return (
    <div class="messages-heading row align-items-end mb-1">
      <div class="col text-center fw-lighter align-items-end">
        <div className="chat-header rounded-4 bg-gradient shadow">
          <div className="user-info d-flex">
            <div class="">
              <i
                class="rounded-circle fa-solid fa-circle-user fa-2xl me-2"
                style={{ color: "#000" }}
              ></i>
              <div class="status-indicator glowing"></div>
            </div>
            <h3 className="user-name">Admin</h3>
          </div>
          <div className="chat-actions"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
