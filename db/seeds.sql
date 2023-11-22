INSERT INTO departments (id, department_name)
VALUES (001, "Administrative"),
       (002, "Human Resource"),
       (003, "Enginnering"),
       (004, "Legal"),
       (005, "Production");
       
INSERT INTO roles (id, title, salary, department_id)
VALUES (012, "Production Manager", 85,000, 005),
       (015, "Administrative Assistant", 33,000, 001),
       (010, "Engineer Manager", 105,000, 003);
       (014, "Chief legal officer",110,000, 004),
       (011, "HR Specialist", 65,000, 002),
       (013, "Senior Engineer", 95,000, 003);
       
INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (110, "Jacob", "Mason", 010),
       (111, "Monica", "Smith", 011),
       (112, "Michael", "Brown", 012),
       (113, "Jordan", "Garcia" 013),
       (114, "Ethan", "Lee", 014, 110),
       (115, "Ken", "Williams", 015);
       