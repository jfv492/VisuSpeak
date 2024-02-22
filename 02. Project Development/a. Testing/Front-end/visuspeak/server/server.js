// Importing the necessary modules
const express = require("express");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");

const app = express();

// Enabling CORS (Cross-Origin Resource Sharing) for handling requests from different origins
app.use(cors());

const db = require("./db");

app.use(express.json());

// GET endpoint at the root of the server
app.get("/", (req, res) => {
  return res.json("From VisuSpeak Server");
});

// Importing and using the authentication routes
const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

// Importing and using the chat routes
const chatRouter = require("./routes/chat");
app.use("/chat", chatRouter);

// Create an HTTP server from the Express app
const server = http.createServer(app);

// Create a WebSocket server and attach it to the HTTP server
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 8081;

wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket');

  ws.on('message', (message) => {
      console.log('Received message:', message);

      // Parse the message
      let messageData;
      try {
          messageData = JSON.parse(message);
      } catch (error) {
          console.error('Invalid JSON:', error);
          return; // Stop processing if the message is not valid JSON
      }

      // Insert the message into the database
      storeMessageInDatabase(messageData);
      

      // Broadcast the message to all connected clients
      wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(message);
          }
      });
  });

  ws.on('close', () => {
      console.log('Client disconnected');
  });
});

function storeMessageInDatabase(messageData) {
  const { userID, username, text, timestamp, type, status, sessionID } = messageData;
  const sql = "INSERT INTO messages (userID, username, text, timestamp, type, status, sessionID) VALUES (?, ?, ?, ?, ?, ?, ?)";
  
  db.query(sql, [userID, username, text, timestamp, type, status, sessionID], (err, results) => {
      if (err) {
          console.error("Error inserting message:", err);
          return;
      }
      console.log("Message stored in database:", messageData);
  });
}


// Use server to listen instead of the Express app
server.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
