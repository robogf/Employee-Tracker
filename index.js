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

function addEmployee(){
    roles = []
    manager = []
    inquirer.prompt([{
        name: "newFirst",
        message: "Enter your new employee's first name"
    },
    {
        name: "newLast",
        message: "Enter your new employee's last name"
    },
    {   
        type: "list",
        name: "newRole",
        message: "Select your new employee's role",
        choices: roles
        
    },
    {
        type: "list",
        name: "newManager",
        message: "Select your new employee's manager",
        choices: manager
    }
])
}

function viewRoles() {
    db.query('SELECT * FROM roles', function (err,results){
        console.table(results);
        manageCompany();
    });
}

function viewDepartments(){
    db.query('SELECT * FROM departments', function (err,results){
        console.table(results);
        manageCompany();
    });
}

function addDepartment(){
    inquirer.prompt ([
        {
            type: "input",
            name: "addDpt",
            message: "Which department would you like to add?"
        }
    ])
    .then(answer => {
        const dptSql = 'INSERT INTO departments (department_name) VALUES (?);'
        db.query(dptSql, answer.addDpt, (err,result) => {
            if (err) throw err;
            viewDepartments();
        });
    });
}







function quitP(){
    console.log("Thank you for taking an interest in our company ");
   
}
manageCompany()