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
        name: "start",
        type: "list",
        message: "Welcome, please add DEPARTMENTS and ROLES to begin. Once you have added your desired departments and roles, continue to the Employee Tab.",
        choices: ["Add Department", "Add Role","Employees Tab","EXIT",
        ]
        })
        .then(function(answer){
            if (answer.start === "Add Department"){
                addDepartment();
            } else if (answer.start === "Add Role"){
                addRole();
            } else if (answer.start === "Employees Tab"){
                startpartTwo();
            } else{
                connection.end();
            }
        })
}


function startpartTwo(){
    inquirer
        .prompt({
        name: "action_start",
        type: "list",
        message: "What action would you like to take?",
        choices: ["Add Employee",
        "View All Employees",
        "View All Employees by Department",
        "View All Employees by Manager BONUS",
        "Remove Employee BONUS",
        "Update Employee Role",
        "Update Employee Manager BONUS",
        "EXIT",
        ]
        })
        .then(function(answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.action_start === "View All Employees") {
                // console.table - to look better for a list of ees 
                viewAllEes();
            }
            else if(answer.action_start === "View All Employees by Department") {
                viewEesByDept();
            }
            else if(answer.action_start === "View All Employees by Manager BONUS") {
                viewEesbyManager();
            }
            else if(answer.action_start === "Add Employee") {
                // make sure to inquire about role and dept too
                addEes();
            }
            else if(answer.action_start === "Remove Employee BONUS") {
                removeEes();
            }
            else if(answer.action_start === "Update Employee Role") {
                updateEeRole();
            }
            else if(answer.action_start === "Update Employee Manager BONUS") {
                updateEeManager();
            }
             else{
              connection.end();
            }
          });
}