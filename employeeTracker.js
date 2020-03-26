var mysql = require("mysql");
var inquirer = require("inquirer");
const logo = require("asciiart-logo");

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
  
const logoText = logo({ name: "Employee Tracker" }).render();
console.log(logoText);

showDept();
showRoles();
setTimeout(start,1000);

});


function showDept(){
    connection.query("SELECT * FROM department_table", function (err, result, fields) {
        if (err) throw err;
        console.table(result);
        });
}

function showRoles(){
    connection.query("SELECT * FROM role_table", function (err, result, fields) {
        if (err) throw err;
        console.table(result);
        })
}

function start(){
    inquirer
        .prompt({
        name: "start",
        type: "list",
        message: "Welcome, please add DEPARTMENTS and ROLES to begin. Once you have added your desired departments and roles, continue to the Employee Tab.",
        choices: ["Add Department", "Add Role","Employees Tab","EXIT",]
        })
        .then(function(answer){
            if (answer.start === "Add Department"){
                addDepartment();
            } else if (answer.start === "Add Role"){
                addRole();
            } else if (answer.start === "Employees Tab"){
                showDept();
                showRoles();
                setTimeout(employeeTab,1000);
            } else{
                connection.end();
            }
        })
}

function addDepartment(){
    inquirer
        .prompt({
            name:"dept_name",
            type: "input",
            message:"What is the DEPARTMENT name?"
        })
        .then(function(answer){
            var deptName = answer.dept_name;
            console.log("Adding a new department...\n");
            var query = connection.query(
                "INSERT INTO department_table SET ?",
                {
                    name: deptName,
                },
                function(err, res){
                    if (err) throw err;
                    console.log(res.affectedRows + " department(s) added!\n")
                }
            )
            console.log(query.sql);
        })
        .then(function(){
            start();
        });
}


function addRole(){
    inquirer
        .prompt([{
            name:"role_title",
            type: "input",
            message:"What is the title of the ROLE you would like to add?"
        },
        {
            name:"role_salary",
            type: "input",
            message: "What salary amount is designated to this role?"
        },
        {
            name:"department_id",
            type: "input",
            message: "What department ID would you like to designate to this role?"
        }])
        .then(function(answer){
            console.log("Adding a new role...\n");
            var query = connection.query(
                "INSERT INTO role_table SET ?",
                {
                    title: answer.role_title,
                    salary: answer.role_salary,
                    department_id: answer.department_id,
                },
                function(err, res){
                    if (err) throw err;
                    console.log(res.affectedRows + " role(s) added!\n")
                }
            )
            console.log(query.sql);
        })
        .then(function(){
            start();
        });
}



function employeeTab(){
    inquirer
        .prompt({
        name: "employeeTab_start",
        type: "list",
        message: "What action would you like to take?",
        choices: ["Add Employee",
                "View All Employees",
                "View All Employees by Department",
                "View All Employees by Manager BONUS",
                "Remove Employee BONUS",
                "Update Employee Role",
                "Update Employee Manager BONUS",
                "EXIT",]
        })
        .then(function(answer) {
            if (answer.employeeTab_start === "Add Employee") {
                // console.table - to look better for a list of ees 
                addEes();
            }
            else if(answer.employeeTab_start === "View All Employees") {
                viewAllEes();
            }
            else if(answer.employeeTab_start === "View All Employees by Department") {
                viewEesByDept();
            }
            else if(answer.employeeTab_start === "View All Employees by Manager") {
                viewEesbyManager();
            }
            else if(answer.employeeTab_start === "Remove Employee") {
                removeEes();
            }
            else if(answer.employeeTab_start === "Update Employee Role") {
                updateEeRole();
            }
            else if(answer.employeeTab_start === "Update Employee Manager BONUS") {
                updateEeManager();
            }
             else{
              connection.end();
            }
          });
}

function addEes(){
    inquirer
        .prompt([{
            name:"first_name",
            type: "input",
            message:"First Name:"
        },
        {
            name:"last_name",
            type: "input",
            message: "Last Name:"
        },
        {
            name:"role_id",
            type: "input",
            message: "Role Id:"
        },
        {
            name:"manager_id",
            type: "input",
            message: "Manager Id:"
        }])
        .then(function(answer){
            console.log("Adding a new role...\n");
            var query = connection.query(
                "INSERT INTO employee_table SET ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                    manager_id: answer.manager_id,
                },
                function(err, res){
                    if (err) throw err;
                    console.log(res.affectedRows + " employee(s) added!\n")
                }
            )
            console.log(query.sql);
        })
        .then(function(){
            employeeTab();
        });
}

function viewAllEes(){
    connection.query("SELECT * FROM employee_table", function (err, result, fields) {
    if (err) throw err;
    console.table(result);
    employeeTab();
    })
}

function viewEesByDept(){
    // !!!!Should show depts 
    inquirer
        .prompt({
            name:"department_Choice",
            type: "input",
            message:"Select the department whose employees you would like to view."
        })
        .then(function(answer){
            var query =
                `SELECT employee_table.first_name, employee_table.last_name, employee_table.role_id, employee_table.manager_id FROM employee_table INNER JOIN role_table ON (employee_table.role_id = ${answer.department_Choice})`
                connection.query(query,function(err, res){
                    if (err) {
                        throw err;
                    } 
                    console.table(res);
                    employeeTab();
                })
        })
}

function viewEesbyManager(){
    // console.log("BONUS");
    inquirer
        .prompt({
            name:"manager_Choice",
            type: "input",
            message:"What is the Manager ID for the manager whose employees you would like to view?"
        })
        .then(function(answer){
            var query =
                `SELECT employee_table.first_name, employee_table.last_name, employee_table.role_id FROM employee_table WHERE manager_id = ${answer.manager_Choice}`
                connection.query(query,function(err, res){
                    if (err) {
                        throw err;
                    } 
                    console.table(res);
                    employeeTab();
                })
        })
}

function removeEes(){
    // console.log("BONUS");
    inquirer
        .prompt({
            name:"deleted_employee",
            type: "input",
            message:"What is the ID of the employee you would like to remove?"
        })
        .then(function(answer){
            var query =
                `DELETE FROM employee_table WHERE id = ${answer.deleted_employee}`
                connection.query(query,function(err, res){
                    if (err) {
                        throw err;
                    } 
                    console.log(res.affectedRows + " employee was deleted.\n")
                    employeeTab();
                })
        })
}

function updateEeRole(){
    // should show roles before this
    inquirer
        .prompt([{
        name:"role_Update",
        type: "input",
        message:"What ROLE would you like to update?",
        },
        {
        name:"roleAttribute_Update",
        type: "list",
        message:"What attribute would you like to update?",
        choices: ["Role Title","Role Salary"]
        },
        {
        name:"newRole_Title",
        type: "input",
        message:"What is the new role title?",
        when: (answers)=> answers.roleAttribute_Update === "Role Title",
        },
        {
        name:"newRole_Salary",
        type: "input",
        message:"What is the new role salary?",
        when: (answers)=> answers.roleAttribute_Update === "Role Salary",
        }])
        .then(function(answers){
            console.log("Updating the role...\n");
            if (answers.roleAttribute_Update === "Role Title"){
                var query = connection.query(
                    "UPDATE role_table SET ? WHERE ?",
                    [
                        {
                            title: answers.newRole_Title
                        },
                        {
                            id: answers.role_Update
                        }
                    ],
                    function(err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " role(s) updated!\n");
                      }
                )
            } else if (answers.roleAttribute_Update === "Role Salary"){
                var query = connection.query(
                    "UPDATE role_table SET ? WHERE ?",
                    [
                        {
                            salary: answers.newRole_Salary
                        },
                        {
                            id: answers.role_Update
                        }
                    ],
                    function(err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " role(s) updated!\n");
                      }
                )
                console.log(query.sql);
            }
        })
        .then(function(){
            employeeTab();
        });
}

function updateEeManager(){
    console.log("BONUS");
    // inquirer
    //     .prompt([{
    //         name:"manager_Update",
    //         type: "input",
    //         message:"What MANAGER would you like to update?",
    //     }])
}

