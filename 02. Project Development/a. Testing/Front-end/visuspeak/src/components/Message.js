import React from "react";

function Message({ username, text, timestamp }) {
  console.log("Received date:", timestamp);

  return (
    <>
      <div className={`chat`}>
        <div className="chat-messages">
          <div className="message mine">
            <div className="message-content">
              <span className="username">{username}</span>
              <p>{text}</p>
            </div>
          </div>
          <span className="time mine">{new Date(timestamp).toLocaleString()}</span>

          {/* <div className="message theirs">
            <i className="rounded-circle fa-solid fa-circle-user fa-2xl avatar pt-4"></i>
            <div className="message-content">
              <span className="username">Username</span>
              <p>
                This is a placeholder text from admin. This is a placeholder
                This is a placeholder text from admin. text from admin. This is
                a placeholder text from admin. This is a placeholder text from
                admin. This is a placeholder text from admin.
              </p>
            </div>
          </div>
          <span className="time theirs">5:30 PM</span> */}
        </div>
      </div>
    </>
  );
}

export default Message;
