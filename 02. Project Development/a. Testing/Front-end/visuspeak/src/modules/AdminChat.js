import React, { useState, useEffect } from "react";

import Search from "../components/chat/Search.js";
import Chats from "../components/chat/Chats.js";
import Chat from "../components/chat/Chat.js";

const AdminChat = (props) => {
  return (
    <div className="background-container">
      <div className="admin-chat-container shadow rounded-4 p-3">
        <div className="row text-begin align-items-center">
          <div className="col-sm-4">
            <h3> {props.heading}</h3>
          </div>
          <div className="col-sm-8"></div>
        </div>

        <div className="row">
          <div className="col-sm-4 ">
            <Search />
            <Chats />
          </div>
          <div className="col-sm-8">
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChat;
