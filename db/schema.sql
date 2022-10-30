DROP DATABASE IF EXISTS companyDB;
CREATE DATABASE companyDB;

use companyDB;

CREATE TABLE departments (
    id INT AUTO_INCREMENT  PRIMARY KEY,
    department_name VARCHAR(30)
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_title VARCHAR(30),
    salary DECIMAL,
    departments_id INT,
    FOREIGN KEY(departments_id) REFERENCES departments(id)
);

CREATE employees (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    employee_id INT,
    FOREIGN key (employee_id) REFERENCES roles(id)
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);