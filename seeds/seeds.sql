INSERT INTO department (id, name)
VALUES (1, "Sales"),
       (2, "Engineering"),
       (3, "Financing"),
       (4, "Legal");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Salesperson", 80000, 1),
       (2, "Lead Engineer", 150000, 2),
       (3, "Software Engineer", 120000, 2),
       (4, "Account Manager", 160000, 3),
       (5, "Accountant", 1250000, 3),
       (6, "Legal Team Lead", 250000, 4),
       (7, "Lawyer", 190000, 4);

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES (1, "Mike", "Chan", 1),
       (2, "Ashley", "Rodriguez", 2),
       (3, "Kevin", "Tupik", 3),
       (4, "Kunal", "Singh", 4),
       (5, "Malia", "Brown", 5),
       (6, "Sarah", "Lourd", 6),
       (7, "Tom", "Allen", 7);
       
