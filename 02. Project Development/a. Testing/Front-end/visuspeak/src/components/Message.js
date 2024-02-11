import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests

function Message({ username, text, timestamp }) {
  return (
    <>
      <div className={`message`}>
      <div class="my-3 px-5 bg-body rounded shadow bg-body-tertiary rounded">
        <div class="d-flex text-body-secondary pt-3">
          <div
            class="bd-placeholder-img flex-shrink-0 me-2 rounded pt-3"
            
          >
            <i class="rounded-circle fa-solid fa-circle-user fa-2xl me-2"></i>
          </div>
          <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
            <div class="d-flex justify-content-between">
              <strong class="text-gray-dark user">{username}</strong>
              <p className="timestamp">{timestamp}</p>
            </div>
            <span class="d-block text">{text}</span>
          </div>
        </div>
      </div>
      </div>

      
    </>
  );
}

export default Message;
