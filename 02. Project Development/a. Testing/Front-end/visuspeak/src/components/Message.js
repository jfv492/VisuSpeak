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

<<<<<<< HEAD
          {/* <div class="message theirs">
            <i class="rounded-circle fa-solid fa-circle-user fa-2xl avatar pt-4"></i>
            <div class="message-content">
              <span class="username">Username</span>
=======
          {/* <div className="message theirs">
            <i className="rounded-circle fa-solid fa-circle-user fa-2xl avatar pt-4"></i>
            <div className="message-content">
              <span className="username">Username</span>
>>>>>>> b521e9b6f0462c8b86ade6d2a929dc229ec13309
              <p>
                This is a placeholder text from admin. This is a placeholder
                This is a placeholder text from admin. text from admin. This is
                a placeholder text from admin. This is a placeholder text from
                admin. This is a placeholder text from admin.
              </p>
            </div>
<<<<<<< HEAD
          </div> */}
          <span class="time theirs">5:30 PM</span>
=======
          </div>
          <span className="time theirs">5:30 PM</span> */}
>>>>>>> b521e9b6f0462c8b86ade6d2a929dc229ec13309
        </div>
      </div>
    </>
  );
}

export default Message;
