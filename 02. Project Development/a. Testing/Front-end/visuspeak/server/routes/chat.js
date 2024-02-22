// Importing necessary modules and setting up the router
const express = require("express");
const router = express.Router();
const db = require("../db"); // Database connection module

// ROUTE 1: Endpoint for storing chat messages at POST "/api/chat/messages"
router.post("/messages", (req, res) => {
  // Destructuring required fields from the request body
  const { userID, username, text, type, status, sessionID } = req.body;

  // SQL statement to insert a new message into the 'messages' table
  const sql =
    "INSERT INTO messages_single (userID, username, text, timestamp, type, status, sessionID) VALUES (?, ?, ?, NOW(), ?, ?, ?)";

  // Executing the SQL query
  db.query(
    sql,
    [userID, username, text, type, status, sessionID],
    (err, results) => {
      if (err) {
        // Handling SQL query error
        console.error("Error inserting message:", err);
        return res
          .status(500)
          .json({ message: "Error while inserting message", error: err });
      }
      // Responding with the ID of the inserted message and other details
      res.status(201).json({
        id: results.insertId,
        userID,
        username,
        text,
        timestamp: new Date(), // This is the server timestamp, adjust if needed
        type,
        status,
        sessionID,
      });
    }
  );
});

// ROUTE 2: Endpoint for retrieving chat messages for a specific user and session at GET "/api/chat/getmessages/:userId"
router.get("/getmessages/:userId", (req, res) => {
  // Extracting userId from URL parameters and sessionId from query parameters
  const { userId } = req.params;
  const { sessionId } = req.query;

  // SQL query to fetch messages for a specific user and session
  const sql =
    "SELECT * FROM messages_single WHERE userID = ? AND sessionID = ? ORDER BY timestamp ASC";

  // Executing the SQL query
  db.query(sql, [userId, sessionId], (err, results) => {
    if (err) {
      // Handling SQL query error
      console.error("Error fetching messages:", err);
      return res
        .status(500)
        .json({ message: "Error while fetching messages", error: err });
    }

    // Sending retrieved messages as a response
    res.status(200).json(results);
  });
});

// ROUTE 3: Endpoint for starting a new chat session at POST "/api/chat/startsession"
router.post("/startsession", (req, res) => {
  // Extracting userID from the request body
  const { userID } = req.body;

  // SQL statement to create a new record in the 'chat_session_single' table
  const sql = "INSERT INTO chat_session_single (userID) VALUES (?)";

  // Executing the SQL query
  db.query(sql, [userID], (err, results) => {
    if (err) {
      // Handling SQL query error
      console.error("Error starting new chat session:", err);
      return res
        .status(500)
        .json({ message: "Error while starting new chat session", error: err });
    }

    // Responding with the ID of the newly created chat session
    res.status(200).json({ sessionId: results.insertId });
  });
});

// ROUTE 4: Endpoint for ending a chat session at POST "/api/chat/endsession"
router.post("/endsession", (req, res) => {
  // Extracting sessionId from the request body
  const { sessionId } = req.body;

  // SQL statement to update the 'chat_session_single' table to mark a session as ended
  const sql =
    'UPDATE chat_session_single SET end_timestamp = NOW(), status = "ended" WHERE id = ?';

  // Executing the SQL query
  db.query(sql, [sessionId], (err, results) => {
    if (err) {
      // Handling SQL query error
      console.error("Error ending chat session:", err);
      return res
        .status(500)
        .json({ message: "Error while ending chat session", error: err });
    }

    // Responding with a confirmation message
    res.status(200).json({ message: "Chat session ended successfully." });
  });
});

// ROUTE 5: Endpoint for retrieving all chat sessions for a specific user GET "/api/chat/chatsessions/:userId"
router.get("/chatsessions/:userId", (req, res) => {
  // Extracting userId from URL parameters
  const { userId } = req.params;

  // SQL query to fetch all chat sessions for a specific user
  const sql = "SELECT * FROM chat_session_single WHERE userID = ?";

  // Executing the SQL query
  db.query(sql, [userId], (err, results) => {
    if (err) {
      // Handling SQL query error
      console.error("Error fetching chat sessions:", err);
      return res
        .status(500)
        .json({ message: "Error while fetching chat sessions", error: err });
    }
    // Sending retrieved chat sessions as a response
    res.status(200).json(results);
  });
});

module.exports = router;
