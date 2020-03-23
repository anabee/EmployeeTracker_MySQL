DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department_table(
	id INTEGER(10) AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
	PRIMARY KEY (id)
);

CREATE TABLE role_table(
	id INTEGER(10) AUTO_INCREMENT NOT NULL,
	title VARCHAR(30), 
    slary DECIMAL(10,2), 
	department_id INTEGER(10), 
	PRIMARY KEY (id),
    CONSTRAINT fk_department_table FOREIGN KEY (department_id) REFERENCES department_table(id) ON DELETE CASCADE
);

CREATE TABLE employee_table(
	id INTEGER(10) AUTO_INCREMENT NOT NULL,
	first_name VARCHAR(30), 
    last_name VARCHAR(30), 
	role_id INTEGER(10), 
    CONSTRAINT fk_role_table FOREIGN KEY (role_id) REFERENCES role_table(id) ON DELETE CASCADE,
	manager_id INTEGER(10),
    CONSTRAINT fk_employee_table FOREIGN KEY (manager_id) REFERENCES employee_table(id) ON DELETE SET NULL,
	PRIMARY KEY (id)
);
