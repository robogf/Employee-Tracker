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
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles",
                "Add Role", "View All Departments", "Add Department", "Quit"]
        }
    ])
        .then(function (answer) {
            switch (answer.userOptions) {
                case "View All Employees":
                    viewEmployee();
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

function viewEmployee() {
    db.query(   `SELECT employees.id, employees.first_name, employees.last_name, role.role_title, departments.department_name AS department,
    CONCAT (manager.first_name, ' ', manager.last_name) AS manager
    FROM employees 
    JOIN roles AS role ON employees.employee_id = role.id 
    JOIN departments ON role.departments_id = departments.id 
    LEFT JOIN employees AS manager ON manager.id = employees.manager_id;
    `
    
    , function (err, results) {
        console.table(results);
        manageCompany();
    });
}

function addEmployee() {
    inquirer.prompt([{
        name: "newFirst",
        message: "Enter your new employee's first name"
    },
    {
        name: "newLast",
        message: "Enter your new employee's last name"
    },
    
    ])
    .then(function(answer){
        const params = [answer.newFirst, answer.newLast]
        const rolSql = 'SELECT roles.id, role_title FROM roles;'
        db.query(rolSql, (err,data) => {
            if (err) throw err;

            const roles = data.map(({ id, role_title }) => 
            ({ name: role_title, value: id }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: "What is the new employee's role?",
                    choices: roles
                }
            ]) .then(function (newRoleChoice){
                const newRol= newRoleChoice.role
                params.push(newRol);

                const newMngrSql = 'SELECT manager.id, manager.first_name, manager.last_name FROM employees JOIN employees as manager on manager.id = employees.manager_id';
                db.query(newMngrSql, (err,data ) => {
                    
                    const manager = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

                    inquirer.prompt ([
                        {
                            type:'list',
                            name:'manager',
                            message: 'Who is your employees manager',
                            choices: manager
                        }
                    ])
                    .then(function(empManager){
                        const managerChoice = empManager.manager;
                        params.push(managerChoice);

                        const empSql = 'INSERT INTO employees (first_name,last_name,employee_id,manager_id) VALUES (?,?,?,?);'

                        db.query(empSql,params,(err,result) => {
                            if (err) throw err;
                            viewEmployee();
                        })

                    })
                })
            })
        })
    })
}

function viewRoles() {
    db.query('SELECT * FROM roles', function (err, results) {
        console.table(results);
        manageCompany();
    });
}

function viewDepartments() {
    db.query('SELECT * FROM departments', function (err, results) {
        console.table(results);
        manageCompany();
    });
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'Which role would you like to add?'
        },
        {
            type: 'input',
            name: 'newSalary',
            message: "What is the salary of this role?"
        }


    ])
        .then(function(answer){
            const params = [answer.newRole, answer.newSalary]

            const rolSql = 'SELECT department_name, id FROM departments;'

            db.query(rolSql, (err, data) => {
                if (err) throw err;

                const dpt = data.map(({ department_name, department_id }) => 
                ({ name: department_name, value: department_id }));


                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'dept',
                        message: "What department is this role in?",
                        choices: dpt
                    }
                ])
                    .then(dptChoice => {
                        const dpt = dptChoice.dpt;
                        params.push(dpt);

                        const newRoleSql = 'INSERT INTO roles (role_title,salary,departments_id) VALUES (?,?,?)'

                        db.query(newRoleSql,params,(err,result) => {
                            if (err) throw err;
                            viewRoles();
                        })

                        
                    })
            })
        })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "addDpt",
            message: "Which department would you like to add?"
        }
    ])
        .then(function(answer) {
            const dptSql = 'INSERT INTO departments (department_name) VALUES (?);'
            db.query(dptSql, answer.addDpt, (err, result) => {
                if (err) throw err;
                viewDepartments();
            });
        });
}







function quitP() {
    console.log("Thank you for taking an interest in our company ");

}
manageCompany(); // semi colon for good practice ^_^!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!