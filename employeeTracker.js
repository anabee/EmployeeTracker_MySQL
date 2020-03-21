var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employee_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

function start(){
    inquirer
        .prompt({
            name: "action_start",
            type: "list",
            message: "What action would you like to take?",
            choices: ["View All Employees",
        "View All Employees by Department",
        "View All Employees by Manager BONUS",
        "Add Employee",
        "Remove Employee BONUS",
        "Update Employee Role",
        "Update Employee Manager BONUS"
        ]
        })
}