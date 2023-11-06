const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the database connection

// User registration (signup)
router.post('/signup', (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
  
    const sql = 'INSERT INTO user (FirstName, LastName, Username, Email, Password) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [firstName, lastName, username, email, password], (err, result) => {
      if (err) {
        console.error('Error registering user: ' + err.message);
        return res.status(500).json({ error: 'Error registering user' });
      }
      console.log('User registered successfully');
      return res.status(200).json({ message: 'User registered successfully' });
    });
  });

// User login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password cannot be empty' });
  }

  const sql = 'SELECT * FROM user WHERE Username = ?';
  db.query(sql, [username], (err, data) => {
    if (err) {
      console.error('Error during login: ' + err.message);
      return res.status(500).json({ error: 'Error during login' });
    }

    console.log('Data from the database:', data[0]);

    if (data.length === 0) {
      console.log('Login failed: User not found');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = data[0];
    if (password === user.Password) {
      console.log('User logged in successfully');
      return res.status(200).json({ message: 'User logged in successfully' });
    } else {
      console.log('Invalid password');
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

module.exports = router;
