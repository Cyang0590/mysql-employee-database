INSERT INTO departments (department_name)
VALUES ("Administrative"),
       ("Human Resource"),
       ("Enginnering"),
       ("Legal"),
       ("Production");
       
INSERT INTO roles (title, salary, department_id)
VALUES ("Production Manager", 85000, 5),
       ("Administrative Assistant", 33000, 1),
       ("Engineer Manager", 105000, 3),
       ("Chief legal officer", 110000, 4),
       ("HR Specialist", 65000, 2),
       ("Senior Engineer", 95000, 3);
       
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jacob", "Mason", 1, NULL),
       ("Monica", "Smith", 2, Null),
       ("Michael", "Brown", 3, Null),
       ("Jordan", "Garcia", 4, Null),
       ("Ethan", "Lee", 5, Null),
       ("Ken", "Williams", 6, Null);
       