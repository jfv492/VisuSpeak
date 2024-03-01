// Import the jsonwebtoken package for handling JWTs
const jwt = require("jsonwebtoken");

// Secret key used for JWT verification - should be kept secure and not hard-coded in production
const JWT_SECRET = "secretkey";

// Middleware function to authenticate a user based on the JWT
const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");

  // If no token is found, return a 401 Unauthorized response
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }

  try {
    // Verify the token with the secret key and retrieve the encoded data
    const data = jwt.verify(token, JWT_SECRET);

    // Attach the user data from the token to the request object
    req.user = data.user;

    // Call the next middleware in the stack
    next();
  } catch (error) {
    // In case of token verification failure, return a 401 Unauthorized response
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
