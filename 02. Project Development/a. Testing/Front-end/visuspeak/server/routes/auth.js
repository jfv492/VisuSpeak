const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const db = require('../db'); // Import the database connection
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "secretkey";

// ROUTE 1: User registration (signup): POST "/api/auth/signup". No login required
router.post('/signup', async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  // Query to check if the email or username already exists
  const checkUserSql = 'SELECT * FROM user WHERE Username = ? OR Email = ?';
  db.query(checkUserSql, [username, email], async (err, result) => {
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
      const salt = await bcrypt.genSalt(10);
      const securedPassword = await bcrypt.hash(password, salt);
      const sql = 'INSERT INTO user (FirstName, LastName, Username, Email, Password) VALUES (?, ?, ?, ?, ?)';
      db.query(sql, [firstName, lastName, username, email, securedPassword], (insertErr, insertResult) => {
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

// ROUTE 2: User login: POST "/api/auth/login". No login required
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password cannot be empty' });
  }

  const sql = 'SELECT * FROM user WHERE Username = ?';
  db.query(sql, [username], async (err, data) => {
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
    const passwordCompare = await bcrypt.compare(password, user.Password);
    if (passwordCompare) {
      console.log('User logged in successfully');
      const data = {
        user: {
          id: user.userID,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      return res.status(200).json({ message: 'User logged in successfully', username: username , authtoken: authtoken, userID: user.userID});
    } else {
      console.log('Invalid password');
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

// ROUTE 3: Get loggedin user details: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;

    // Execute a raw SQL query to fetch user details
    const sql = "SELECT UserID, FirstName, LastName, Username, Email FROM user WHERE userID = ?";
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Internal Server Error");
      }

      if (results.length === 0) {
        return res.status(404).send({ error: "User not found" });
      }

      // Assuming your columns are named FirstName, LastName, Username, Email
      const user = results[0];
      res.send(user);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
