# Installation Instructions

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (latest stable version)
- npm (comes with Node.js)
- MySQL Server (latest stable version)
- A MySQL client (like MySQL Workbench, phpMyAdmin, or command-line client)

## Setting up the Database

### Using Firebase

This project uses Firebase as its database. You will need to:
1. Create a Firebase project through the Firebase console.
2. Configure Firestore or the Realtime Database depending on your project needs.
3. Obtain your Firebase project keys.

### Configuring Environment Variables

You'll need to create a `.env` file in the root of the project folder to store sensitive information such as Firebase keys. Please add the following template to your `.env` file and replace `<your-firebase-keys>` with your actual Firebase project keys:

```
REACT_APP_apiKey=<your-firebase-apiKey>
REACT_APP_authDomain=<your-firebase-authDomain>
REACT_APP_databaseURL=<your-firebase-databaseURL>
REACT_APP_projectId=<your-firebase-projectId>
REACT_APP_storageBucket=<your-firebase-storageBucket>
REACT_APP_messagingSenderId=<your-firebase-messagingSenderId>
REACT_APP_appId=<your-firebase-appId>
REACT_APP_modelChatUrl=https://visuspeak-chat-server-2c8ad7bff3cf.herokuapp.com
```


## Running the React Project

1. **Clone the Repository**: Clone the project repository to your local machine.

2. **Install Dependencies**:
   - Navigate to the project directory in your terminal: `cd 02. Project Development/a. Testing/Front-end/visuspeak/`
   - Run `npm install` to install the required dependencies.

3. **Start the Application**:
   - Run `npm run all` to start the development server.
   - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Additional Notes

- Ensure the database connection details in your project in `server/db.js` match the credentials you use for your MySQL server. For Firebase configurations, ensure your `.env` file is set up correctly as mentioned above.
- The React project might require additional setup or environment variables depending on its configuration.

## Support

For support, please contact the repository owner or submit an issue on the GitHub repository page.
