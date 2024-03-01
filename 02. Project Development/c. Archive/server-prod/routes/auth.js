// Importing necessary modules and middleware
const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const db = require("../db"); // Database connection module
const bcrypt = require("bcryptjs"); // Module for hashing passwords
const jwt = require("jsonwebtoken"); // Module for handling JSON Web Tokens
require("dotenv").config();

// Secret key for JWT, should be kept secure in production
const JWT_SECRET = "secretkey";

// ROUTE 1: User registration endpoint at POST "/api/auth/signup". No login is required for this route.
router.post("/signup", async (req, res) => {
  // Extracting user details from request body
  const { firstName, lastName, username, email, password } = req.body;

  // SQL query to check if the user (by username or email) already exists in the database
  const checkUserSql = "SELECT * FROM user WHERE Username = ? OR Email = ?";
  db.query(checkUserSql, [username, email], async (err, result) => {
    // Error handling for database query
    if (err) {
      console.error("Error checking user: " + err.message);
      console.log("Sending 500 response due to server error on checking user.");
      return res.status(500).json({ error: "Error checking user" });
    }

    // Check if user already exists
    if (result.length > 0) {
      // User with the same username or email already exists
      console.log("Username or email already exists. Sending 409 response.");
      return res
        .status(409)
        .json({ error: "Username or email already exists" });
    } else {
      // No user with the username or email exists, proceed with registration

      // Hashing the password using bcrypt
      const salt = await bcrypt.genSalt(10);
      const securedPassword = await bcrypt.hash(password, salt);

      // SQL query to insert new user into the database
      const sql =
        "INSERT INTO user (FirstName, LastName, Username, Email, Password) VALUES (?, ?, ?, ?, ?)";
      db.query(
        sql,
        [firstName, lastName, username, email, securedPassword],
        (insertErr, insertResult) => {
          // Error handling for user registration query
          if (insertErr) {
            console.error("Error registering user: " + insertErr.message);
            console.log(
              "Sending 500 response due to server error on user registration."
            );
            return res.status(500).json({ error: "Error registering user" });
          }

          // Successful registration
          console.log("User registered successfully. Sending 200 response.");
          return res
            .status(200)
            .json({ message: "User registered successfully" });
        }
      );
    }
  });
});

// ROUTE 2: User login endpoint at POST "/api/auth/login". No login is required for this route.
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Check if both username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password cannot be empty" });
  }

  // SQL query to find user by username
  const sql = "SELECT * FROM user WHERE Username = ?";
  db.query(sql, [username], async (err, data) => {
    // Error handling for database query during login
    if (err) {
      console.error("Error during login: " + err.message);
      return res.status(500).json({ error: "Error during login" });
    }

    console.log("Data from the database:", data[0]);

    // Check if user exists
    if (data.length === 0) {
      console.log("Login failed: User not found");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // User found, compare provided password with hashed password in database
    const user = data[0];
    const passwordCompare = await bcrypt.compare(password, user.Password);
    if (passwordCompare) {
      console.log("User logged in successfully");

      // Password matches, create and send JWT
      const data = {
        user: {
          id: user.userID,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      return res.status(200).json({
        message: "User logged in successfully",
        username: username,
        authtoken: authtoken,
        userID: user.userID,
      });
    } else {
      // Password does not match
      console.log("Invalid password");
      return res.status(401).json({ error: "Invalid credentials" });
    }
  });
});

// ROUTE 3: Get logged-in user's details at POST "/api/auth/getuser". Requires login/authentication.
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    // Extracting userId from request, set by fetchuser middleware
    const userId = req.user.id;

    // SQL query to fetch user details by userId
    const sql =
      "SELECT UserID, FirstName, LastName, Username, Email FROM user WHERE userID = ?";
    db.query(sql, [userId], (err, results) => {
      // Error handling for database query
      if (err) {
        console.error(err.message);
        return res.status(500).send("Internal Server Error");
      }

      // Check if user is found
      if (results.length === 0) {
        return res.status(404).send({ error: "User not found" });
      }

      // Send user details as response
      const user = results[0];
      res.send(user);
    });
  } catch (error) {
    // General error handling
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
