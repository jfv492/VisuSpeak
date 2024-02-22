import React from "react";

function Message({ username, text, timestamp }) {
  return (
    <>
      <div className={`chat`}>
        <div class="chat-messages">
          <div class="message mine">
            <div class="message-content">
              <span class="username">{username}</span>
              <p>{text}</p>
            </div>
          </div>
          <span class="time mine">{new Date(timestamp).toLocaleString()}</span>

          {/* <div class="message theirs">
            <i class="rounded-circle fa-solid fa-circle-user fa-2xl avatar pt-4"></i>
            <div class="message-content">
              <span class="username">Username</span>
              <p>
                This is a placeholder text from admin. This is a placeholder
                This is a placeholder text from admin. text from admin. This is
                a placeholder text from admin. This is a placeholder text from
                admin. This is a placeholder text from admin.
              </p>
            </div>
          </div> */}
          <span class="time theirs">5:30 PM</span>
        </div>
      </div>
    </>
  );
}

export default Message;
