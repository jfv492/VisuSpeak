// api-server.js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let latestWord = '';

app.post('/sendword', (req, res) => {
  latestWord = req.body.word;
  res.status(200).send({ message: 'Word received' });
});

app.get('/getword', (req, res) => {
  res.status(200).send({ word: latestWord });
});

app.listen(3002, () => console.log('API Server running on http://localhost:3002'));
