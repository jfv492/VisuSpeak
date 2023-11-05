const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const db = require('../db'); // Import the database connection (assuming it's in the same directory)

// Define your validations as an array
const userValidationRules = () => {
  return [
    // First Name must not be empty
    body('firstName', 'First Name is required').trim().not().isEmpty(),
    // Last Name must not be empty
    body('lastName', 'Last Name is required').trim().not().isEmpty(),
    // Username must be at least 3 chars long
    body('username', 'Username must be at least 3 characters long').isLength({ min: 3 }),
    // Email must be valid
    body('email', 'Invalid email').isEmail().normalizeEmail(),
    // Password must be at least 8 chars long
    body('password', 'Password must be at least 8 characters long').isLength({ min: 8 }),
    // ConfirmPassword must be at least 8 chars long
    body('confirmPassword', 'Confirm Password must be at least 8 characters long').isLength({ min: 8 }),
    // Passwords must match
    body('confirmPassword', 'Passwords do not match').custom((value, { req }) => value === req.body.password),
    // AgreeTerms must be true
    body('agreeTerms', 'You must agree to the terms and conditions').isBoolean().withMessage('You must agree to the terms and conditions').isIn([true]),
  ];
};

// Define a middleware to check the validation result
const validateSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

// User registration (signup)
router.post('/signup', userValidationRules(), validateSignup, (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
  
    // Perform server-side validation, data sanitization, and password hashing as needed
  
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

    // Implement user authentication logic here, including checking credentials
    // You may use libraries like bcrypt to compare hashed passwords

    const sql = 'SELECT * FROM user WHERE Username = ?';
    db.query(sql, [username], (err, data) => {
      if (err) {
        console.error('Error during login: ' + err.message);
        return res.status(500).json({ error: 'Error during login' });
      }

      console.log('Data from the database:', data);

      if (data.length === 0) {
        console.log('Login failed: User not found');
        return res.status(401).json({ error: 'User not found' });
      }

      console.log('User logged in successfully');
      return res.status(200).json({ message: 'User logged in successfully' });

      // Implement password comparison logic here
      // Example: if (bcrypt.compareSync(password, data[0].password)) {
      //   return res.status(200).json({ message: 'Login successful' });
      // } else {
      //   return res.status(401).json({ error: 'Invalid password' });
      // }
    });
});


module.exports = router;
