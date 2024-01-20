const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the database connection

// Endpoint to store messages
router.post('/messages', (req, res) => {
  const { userID, username, text, type, status } = req.body; // Destructure the required fields from the request body

  // Using prepared statements is a good practice to avoid SQL injection
  const sql = 'INSERT INTO messages (userID, username, text, timestamp, type, status) VALUES (?, ?, ?, NOW(), ?, ?)';
  
  db.query(sql, [userID, username, text, type, status], (err, results) => {
    if (err) {
      console.error('Error inserting message:', err);
      return res.status(500).json({ message: 'Error while inserting message', error: err });
    }
    // Send back the ID of the inserted message, along with other relevant data
    res.status(201).json({ 
      id: results.insertId, 
      userID, 
      username,
      text, 
      timestamp: new Date(), // This is the server timestamp, adjust if needed
      type, 
      status 
    });
  });
});

router.get('/getmessages/:userId', (req, res) => {
  const { userId } = req.params;

  // You can use a SQL query to retrieve messages based on user and chat
  const sql = 'SELECT * FROM messages WHERE userID = ?';

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching messages:', err);
      return res.status(500).json({ message: 'Error while fetching messages', error: err });
    }

    // Send back the retrieved messages as JSON
    res.status(200).json(results);
  });
});

module.exports = router;
