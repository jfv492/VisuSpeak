const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the database connection

// User registration (signup)
router.post('/signup', (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  // Query to check if the email or username already exists
  const checkUserSql = 'SELECT * FROM user WHERE Username = ? OR Email = ?';
  db.query(checkUserSql, [username, email], (err, result) => {
    if (err) {
      console.error('Error checking user: ' + err.message);
      console.log('Sending 500 response due to server error on checking user.');
      return res.status(500).json({ error: 'Error checking user' });
    }
    
    if (result.length > 0) {
      // User with the same username or email already exists
      console.log('Username or email already exists. Sending 409 response.');
      return res.status(409).json({ error: 'Username or email already exists' });
    } else {
      // No user with the username or email exists, proceed with registration
      const sql = 'INSERT INTO user (FirstName, LastName, Username, Email, Password) VALUES (?, ?, ?, ?, ?)';
      db.query(sql, [firstName, lastName, username, email, password], (insertErr, insertResult) => {
        if (insertErr) {
          console.error('Error registering user: ' + insertErr.message);
          console.log('Sending 500 response due to server error on user registration.');
          return res.status(500).json({ error: 'Error registering user' });
        }
        console.log('User registered successfully. Sending 200 response.');
        return res.status(200).json({ message: 'User registered successfully' });
      });
    }
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
