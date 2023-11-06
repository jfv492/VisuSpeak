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
  const { email, password } = req.body;

  // Implement user authentication logic here, including checking credentials
  // You may use libraries like bcrypt to compare hashed passwords

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, data) => {
    if (err) {
      console.error('Error during login: ' + err.message);
      return res.status(500).json({ error: 'Error during login' });
    }

    if (data.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Implement password comparison logic here
    // Example: if (bcrypt.compareSync(password, data[0].password)) {
    //   return res.status(200).json({ message: 'Login successful' });
    // } else {
    //   return res.status(401).json({ error: 'Invalid password' });
    // }
  });
});

module.exports = router;
