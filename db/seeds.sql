INSERT INTO department (department_name)
VALUES ("Sales"),
       ("Collection"),
       ("Operation"),
       ("IT");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 90000, 1),
       ("Sales Lead", 80000, 1),
       ("Sales Representative", 45000, 1),
       ("Collection Manager", 85000, 2),
       ("Collection Lead", 75000, 2),
       ("Collection Representative", 40000, 2),
       ("Operations Manager", 80000, 3),
       ("Operations Lead", 70000, 3),
       ("Operations Representative", 35000, 3),
       ("IT Manager", 120000, 4),
       ("IT Lead", 100000, 4),
       ("TI Representative", 85000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Simpson", 1, NULL),
       ("Mary", "Sanders", 2, 1),
       ("Bob", "Flanders", 3, 1),
       ("Steven", "Jones", 4, NULL),
       ("Rick", "Sanchez", 5, 4),
       ("Pam", "Smith", 6, 4),
       ("Rebecca", "Anderson", 7, NULL),
       ("Lou", "Stimpson", 8, 7),
       ("William", "Grey", 9, 7),
     
