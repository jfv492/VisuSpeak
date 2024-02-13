# Installation Intructions

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (latest stable version)
- npm (comes with Node.js)
- MySQL Server (latest stable version)
- A MySQL client (like MySQL Workbench, phpMyAdmin, or command-line client)

## Setting up the Database

1. **Start MySQL Server**: Ensure your MySQL server is running.

2. **Create Database**:
   - Open your MySQL client.
   - Execute the following SQL command to create a new database:
     ```sql
     CREATE DATABASE VisuSpeak;
     ```

3. **Create Tables**:
   - Select the `VisuSpeak` database.
   - Execute the following SQL commands to create the necessary tables:

     ```sql
     CREATE TABLE `user` (
       `userID` int(11) NOT NULL AUTO_INCREMENT,
       `FirstName` varchar(255) NOT NULL,
       `LastName` varchar(255) NOT NULL,
       `Username` varchar(255) NOT NULL,
       `Email` varchar(255) NOT NULL,
       `Password` varchar(255) NOT NULL,
       PRIMARY KEY (`userID`)
     );

     CREATE TABLE `chat_sessions` (
       `id` int(11) NOT NULL AUTO_INCREMENT,
       `userID` int(11) NOT NULL,
       `chatName` varchar(255) DEFAULT NULL,
       `start_timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
       `end_timestamp` timestamp NULL DEFAULT NULL,
       `status` enum('active','ended') DEFAULT 'active',
       PRIMARY KEY (`id`),
       KEY `userID` (`userID`),
       CONSTRAINT `chat_sessions_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`)
     );

     CREATE TABLE `messages` (
       `id` int(11) NOT NULL AUTO_INCREMENT,
       `userID` int(11) NOT NULL,
       `username` varchar(255) NOT NULL,
       `text` text DEFAULT NULL,
       `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
       `type` enum('text','image','audio') NOT NULL DEFAULT 'text',
       `status` enum('sent','received','read') NOT NULL DEFAULT 'sent',
       `sessionID` int(11) DEFAULT NULL,
       PRIMARY KEY (`id`),
       KEY `userID` (`userID`),
       KEY `sessionID` (`sessionID`),
       CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE,
       CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`sessionID`) REFERENCES `chat_sessions` (`id`)
     );
     ```

## Running the React Project

1. **Clone the Repository**: Clone the project repository to your local machine.

2. **Install Dependencies**:
   - Navigate to the project directory in your terminal.
   ```
   cd 02.\ Project\ Development/a.\ Testing/Front-end/visuspeak/
   ```
   - Run `npm install` to install the required dependencies.
   - Navigate to the server directory in your terminal.
   ```
   cd server
   ```
   - Run `npm install` to install the required dependencies.

3. **Start the Application**:
   - Run `npm run all` to start the development server.
   - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Additional Notes

- Ensure the database connection details in your project in `server/db.js` match the credentials you use for your MySQL server.
- The React project might require additional setup or environment variables depending on its configuration.

## Support

For support, please contact the repository owner or submit an issue on the GitHub repository page.
