// Importing the necessary modules
const express = require("express");
const cors = require("cors");

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

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
