import React from "react";

function Message({ username, text, timestamp }) {
  return (
    <>
      <div className={`chat`}>
        <div class="chat-messages">
          <div class="message theirs">
            <i class="rounded-circle fa-solid fa-circle-user fa-2xl avatar pt-4"></i>
            <div class="message-content">
              <span class="username">{username}</span>
              <p>{text}</p>
            </div>
          </div>
          <span class="time theirs">
            {new Date(timestamp).toLocaleString()}
          </span>

          {/* <div class="message mine">
            <div class="message-content">
              <span class="username">Username</span>
              <p>
                I'm meeting a friend here for dinner. How about you? 😊I'm
                meeting a friend here for dinner. How about you? 😊I'm meeting a
                friend here for dinner. How about you? 😊I'm meeting a friend
                here for dinner. How about you? 😊
              </p>
            </div>
            
          </div>
          <span class="time mine">5:30 PM</span> */}
        </div>
      </div>
    </>
  );
}

export default Message;
