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
    <div class="container transcript-page my-5">
      <h1>Transcript History</h1>
      <div class="row row-cols-sm-2 row-cols-1 ">
        <div class="col-sm-4">
          <div class="input-group my-3">
            <span class="input-group-text" id="basic-addon1">
              <i class="fa-solid fa-magnifying-glass fa-xl" style={{ color: "#7d255b" }}></i>
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Find a chat"
              aria-describedby="basic-addon1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div class="list-group list-group-flush border-bottom rounded-5">
            <div class="row align-items-end justify-content-between"></div>
            <p class="lead">Previous Chat</p>
            <div class="transcript-list rounded-start">
              {sessions
                .filter((session) => session.id.toString().includes(searchTerm))
                .map((session) => (
                  <a
                    href="#"
                    class={`list-group-item list-group-item-action py-3 lh-sm ${
                      session.id === selectedSessionId ? "active" : ""
                    }`}
                    aria-current="true"
                    key={session.id}
                    onClick={() => handleSessionClick(session.id)}
                  >
                    <div class="d-flex w-100 align-items-center justify-content-between">
                      <strong class="mb-1">Chat {session.id}</strong>
                      <small>
                        {new Date(session.start_timestamp).toLocaleString()}
                      </small>
                    </div>
                    <div class="col-10 mb-1 small">
                      Some placeholder content in a paragraph below the heading
                      and date.
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>
        <div class="col-sm-8">
          {selectedSessionId ? (
            <>
              <div class="row align-items-end justify-content-between ">
                <div class="col ">
                  <div class="d-flex align-items-center link-body-emphasis messages-heading pt-4">
                    <p class="h2 mt-2">New Chat</p>
                    <i
                      class="fa-solid fa-pen fa-xl ms-2 me-5"
                      style={{ color: "#000000;" }}
                    ></i>
                  </div>
                </div>
                <button
                  class="btn cancel-button-style"
                  type="button"
                  aria-expanded="false"
                  onClick={handleCancelClick}
                >
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
              <hr class="border-2" />
              <div class="message-preview">
                <MessageList messages={messages} />
              </div>
            </>
          ) : (
            <div class="centered-text lead p-3">
              Click on a chat to preview messages
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranscriptHistory;
