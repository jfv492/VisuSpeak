import mysql from "mysql";

import inquirer from "inquirer";

const mysql_user = {
  host: "localhost",
  user: "root",
  password: "VisuSpeak2023root",
};

const connection = mysql.createConnection(mysql_user, {
  multipleStatements: true,
});

function query(query) {
  connection.query(query, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
    }
    inquire();
  });
}

function inquire() {
  inquirer
    .prompt([
      {
        name: "statement",
        message: "mysql>",
      },
    ])
    .then((answer) => {
      if (answer.statement === "quit") {
        console.log("Disconnected and exit");
        connection.end();
      } else {
        query(answer.statement);
      }
    });
}

function connect() {
  connection.connect((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Connected to SQL");
      inquire();
    }
  });
}

connect();
