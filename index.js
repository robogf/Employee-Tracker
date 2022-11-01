const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require('console.table');


var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',

    password: 'password',
    database: 'companyDB'
},
console.log('we made it into database!')
)

db.connect(function (err) {
    if (err) throw err; 
})

function manageCompany() {
    inquirer.prompt([
        {
            type: "list",
            name: "userOptions",
            message: "What would you like to do?",
            choices: ["View All Employees","Add Employee","Update Employee Role","View All Roles",
        "Add Role","View All Departments","Add Department","Quit"]
        }
    ])
    .then(function(answer) {
        switch (answer.userOptions) {
            case "View All Employees":
            viewEmployees();
            break;

            case "Add Employee":
            addEmployee();
            break;

            case "Update Employee Role":
            updateEmployee();
            break;

            case "View All Roles":
            viewRoles();
            break;

            case "Add Role":
            addRole();
            break;

            case "View All Departments":
            viewDepartments();
            break;

            case "Add Department":
            addDepartment();
            break;

            case "Quit":
            quitP();
            break;


        }
    })
}

function viewEmployees() {
    db.query('SELECT * FROM employees;', function (err,results){
    console.table(results);
    manageCompany();
    });
}










function quitP(){
    console.log("Thank you for taking an interest in our company ");
   
}
manageCompany()