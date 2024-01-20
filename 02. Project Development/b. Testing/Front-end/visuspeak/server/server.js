const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const db = require('./db'); // Import the database connection

app.use(express.json());

app.get('/', (req, res) => {
  return res.json('From VisuSpeak Server');
});

app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM user';
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);
const chatRouter = require('./routes/chat');
app.use('/chat', chatRouter);

const PORT = process.env.PORT || 8081

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
