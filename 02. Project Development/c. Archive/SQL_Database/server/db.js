const mysql = require("mysql"); // Importing the MySQL module to interact with MySQL databases

// Creating a connection to the MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "VisuSpeak",
});

// Establishing a connection to the database
db.connect((err) => {
  if (err) {
    // Error handling in case the connection fails
    console.error("Database connection failed: " + err.message);
    return;
  }
  // Logging a confirmation message on successful connection
  console.log("Connected to the MySQL database");
});

module.exports = db;