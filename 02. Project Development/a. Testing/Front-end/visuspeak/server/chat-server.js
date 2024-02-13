// Importing necessary modules
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// A variable to store the latest word received in the chat
let latestWord = "";

// ROUTE 1: Endpoint to receive and store a word at POST "/api/sendword"
app.post("/sendword", (req, res) => {
  latestWord = req.body.word;
  res.status(200).send({ message: "Word received" });
});

// ROUTE 1: Endpoint to send the latest word to the client at GET "/api/getword"
app.get("/getword", (req, res) => {
  res.status(200).send({ word: latestWord });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`API Server running on ${PORT}`));
