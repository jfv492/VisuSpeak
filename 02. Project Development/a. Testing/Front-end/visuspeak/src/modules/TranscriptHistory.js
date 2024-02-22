import React, { useState, useEffect } from "react";
import axios from "axios";
import MessageList from "../components/MessageList.js";
import serverUrl from "../Server-env.js";
import HandGestureBG from "../assets/images/ASLBackgroundSigns.png"; // Background image

const TranscriptHistory = () => {
  let userId = localStorage.getItem("userID");

  const [sessions, setSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getChatSessionsUrl = `${serverUrl}/chat/chatsessions/${userId}`;
  const getMessagesUrl = `${serverUrl}/chat/getmessages/${userId}`;

  useEffect(() => {
    const fetchChatSessions = async () => {
      try {
        const response = await axios.get(getChatSessionsUrl);
        if (response.status === 200) {
          setSessions(response.data);
        }
      } catch (error) {
        console.error("Error fetching chat sessions:", error);
      }
    };
    fetchChatSessions();
  }, [userId]);

  const fetchMessages = async (sessionId) => {
    try {
      const response = await axios.get(getMessagesUrl, {
        params: { sessionId },
      });
      if (response.status === 200) {
        setMessages(response.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSessionClick = (sessionId) => {
    setSelectedSessionId(sessionId);
    fetchMessages(sessionId);
  };

  const handleCancelClick = () => {
    setSelectedSessionId(null);
  };

  return (
    <div className="container transcript-page my-5">
      <h1>Transcript History</h1>
      <div className="row row-cols-sm-2 row-cols-1 ">
        <div className="col-sm-4">
          <div className="input-group my-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa-solid fa-magnifying-glass fa-xl" style={{ color: "#7d255b" }}></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Find a chat"
              aria-describedby="basic-addon1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="list-group list-group-flush border-bottom rounded-5">
            <div className="row align-items-end justify-content-between"></div>
            <p className="lead">Previous Chat</p>
            <div className="transcript-list rounded-start">
              {sessions
                .filter((session) => session.id.toString().includes(searchTerm))
                .map((session) => (
                  <a
                    href="#"
                    className={`list-group-item list-group-item-action py-3 lh-sm ${
                      session.id === selectedSessionId ? "active" : ""
                    }`}
                    aria-current="true"
                    key={session.id}
                    onClick={() => handleSessionClick(session.id)}
                  >
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <strong className="mb-1">Chat {session.id}</strong>
                      <small>
                        {new Date(session.start_timestamp).toLocaleString()}
                      </small>
                    </div>
                    <div className="col-10 mb-1 small">
                      Some placeholder content in a paragraph below the heading
                      and date.
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>
        <div className="col-sm-8">
          {selectedSessionId ? (
            <>
              <div className="row align-items-end justify-content-between ">
                <div className="col ">
                  <div className="d-flex align-items-center link-body-emphasis messages-heading pt-4">
                    <p className="h2 mt-2">New Chat</p>
                    <i
                      className="fa-solid fa-pen fa-xl ms-2 me-5"
                      style={{ color: "#000000;" }}
                    ></i>
                  </div>
                </div>
                <button
                  className="btn cancel-button-style"
                  type="button"
                  aria-expanded="false"
                  onClick={handleCancelClick}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <hr className="border-2" />
              <div className="message-preview">
                <MessageList messages={messages} />
              </div>
            </>
          ) : (
            <div className="centered-text lead p-3">
              Click on a chat to preview messages
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranscriptHistory;
