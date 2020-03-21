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
	PRIMARY KEY (id)
);

CREATE TABLE employee_table(
	id INTEGER(10) AUTO_INCREMENT NOT NULL,
	first_name VARCHAR(30), 
    last_name VARCHAR(30), 
	role_id INTEGER(10), 
	manager_id INTEGER(10),
	PRIMARY KEY (id)
);
