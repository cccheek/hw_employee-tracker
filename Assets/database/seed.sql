USE employee_tables_db;

INSERT INTO department (name)
VALUES ("Vibes"),
("Bribes"),
("HR");

INSERT INTO role (title, salary, department_id)
VALUES ("Master of Vibes", 100000, 1),
("Reader of Vibes", 80000, 1),
("Negotiator of Bribes", 85000, 2),
("Mallory", 60000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bernie", "Sanders", 3, 2),
("Judy", "Dench", 3, 1);


INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Steve", "McQueen", 1),
("Taylor", "Swift", 1),
("Joey", "Lawrence", 2);

-- INSERT INTO employee (first_name, last_name, role_id)