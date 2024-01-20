const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the database connection

// Endpoint to store messages
router.post('/messages', (req, res) => {
  const { userID, text, type, status } = req.body; // Destructure the required fields from the request body

  // Using prepared statements is a good practice to avoid SQL injection
  const sql = 'INSERT INTO messages (userID, text, timestamp, type, status) VALUES (?, ?, NOW(), ?, ?)';
  
  db.query(sql, [userID, text, type, status], (err, results) => {
    if (err) {
      console.error('Error inserting message:', err);
      return res.status(500).json({ message: 'Error while inserting message', error: err });
    }
    // Send back the ID of the inserted message, along with other relevant data
    res.status(201).json({ 
      id: results.insertId, 
      userID, 
      text, 
      timestamp: new Date(), // This is the server timestamp, adjust if needed
      type, 
      status 
    });
  });
});

module.exports = router;
