
-- Display table for Employee Information
SELECT
  employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, role.title AS title, role.salary AS salary
FROM employee
JOIN role ON employee.role_id = role.id;

-- Display table for role information
SELECT
  role.id AS id, role.title AS title, department.name as department, role.salary AS salary
FROM department
JOIN role ON role.department_id = department.id;

-- Display all departments
SELECT * FROM department