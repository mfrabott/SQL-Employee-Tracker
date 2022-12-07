const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table')



const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'osubootcamp',
    database: 'workplace_db'
  },
  console.log(`Connected to the workplace_db database.`)
);

//-------------------------------------------------------------------------

// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
function showMainMenu() {
  inquirer
  .prompt([
    {
      type: 'list',
      message: `What would you like to do?`,
      name: 'mainMenu',
      choices: ['View All Employees', 'Add Employee', `Update Employee Role`, 'View All Roles', 'Add Role', `View All Departments`, `Add Department`, `Quit`]
    }
  ])

  .then((response) => {
    if (response.mainMenu === 'View All Employees'){
      viewEmployees();
    } else if (response.mainMenu === 'Add Employee') {
      addEmployee();
    } else if (response.mainMenu === `Update Employee Role`) {
      updateEmployeeRole();
    } else if (response.mainMenu === 'View All Roles') {
      viewRoles();
    } else if (response.mainMenu === 'Add Role') {
      addRole();
    } else if (response.mainMenu === `View All Departments`) {
      viewDepartments();
    } else if (response.mainMenu === `Add Department`) {
      addDepartment();
    } else if (response.mainMenu === 'Quit') {
      process.exit()
    }
  });
};

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
const addEmployee = () => {
  db.query('SELECT id, title FROM role', (err, results) => {
        
    let roleChoices = [];
    let roleIDs = [];
    for (i=0; i<results.length; i++) {
      role=results[i].title;
      roleID=results[i].id;
      roleChoices.push(role);
      roleIDs.push(roleID)
    };
 
    let managerChoices = [];
    let managerIDs = [];
  
    db.query('SELECT first_name, last_name, id FROM employee', (err, results) => {
      
      for (i=0; i<results.length; i++) {
        let firstName = results[i].first_name
        let lastName = results[i].last_name
        let employee = firstName + ' ' + lastName
        let id = results[i].id
        managerChoices.push(employee)
        managerIDs.push(id)
      };
      managerChoices.push('No Manager')
    });

  inquirer
    .prompt([
      {
        type: 'input',
        message: `What is the employee's first name?`,
        name: 'firstName',
      },
      {
        type: 'input',
        message: `What is the employee's last name?`,
        name: 'lastName',
      },
      {
        type: 'list',
        message: `What is the employee's role?`,
        name: 'role',
        choices: roleChoices
      },
      {
        type: 'list',
        message: `Who is the new employee's manager?`,
        name: 'manager',
        choices: managerChoices
      }
    ])

    .then((response) => {
      const firstName = response.firstName;      
      const lastName = response.lastName;      
      const role = response.role;
      const manager = response.manager;
      let role_id = 0;
      let manager_id=0;

      for (i=0; i<roleChoices.length; i++){
        if (roleChoices[i] === role) {
          role_id=roleIDs[i]
        };
      };

      for (i=0; i<managerChoices.length; i++){
        if ('No Manager' === manager) {
          manager_id = null;
        } else if (managerChoices[i] === manager) {
          manager_id = managerIDs[i]
        };
      };

      db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${role_id}, ${manager_id})`, async (err, results) => {
    
      await showMainMenu();
      });
    });
  });
};


// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
const updateEmployeeRole = () => {
  
  let employeeChoices = [];
  let employeeRoles = [];

  db.query('SELECT first_name, last_name, id, role_id FROM employee', (err, results) => {
    
    for (i=0; i<results.length; i++) {
      let firstName = results[i].first_name
      let lastName = results[i].last_name
      let employee = firstName + ' ' + lastName
      let id = results[i].id
      employeeChoices.push(employee)
      employeeRoles.push(id)
    };
  });

  let roleChoices = []
  let roleIDs = []
  db.query('SELECT title, id FROM role', (err, results) => {

    for (i=0; i<results.length; i++) {
      role=results[i].title
      roleID=results[i].id
      roleChoices.push(role)
      roleIDs.push(roleID)
    };

  inquirer
    .prompt([
      {
        type: 'list',
        message: `Which employee's role do you want to update?`,
        name: 'employee',
        choices: employeeChoices
      },
      {
        type: 'list',
        message: `Which role do you want to assign the selected employee?`,
        name: 'role',
        choices: roleChoices
      }
    ])

    .then((response) => {
      const employee = response.employee;      
      const role = response.role;      
      let employeeID = 0;
      let newID = 0;

      for (i=0; i<employeeChoices.length; i++){
        if (employeeChoices[i] === employee) {
          employeeID=employeeRoles[i]
        };
      };

      for (i=0; i<roleChoices.length; i++){
        if (roleChoices[i] === role) {
          newID=roleIDs[i]
        };
      };

      db.query(`UPDATE employee SET role_id=${newID} WHERE id=${employeeID};`, async (err, results) => {
    
        await showMainMenu();
     
      });
    });
  });
};


//WHEN I choose to add a department
//THEN I am prompted to enter the name of the department and that department is added to the database
const addDepartment = () => {
  inquirer
  .prompt([
    {
      type: 'input',
      message: `What is the name of the Department?`,
      name: 'newDepartment',
    }
  ])

  .then((response) => {
    const newDepartment = response.newDepartment;      

    db.query(`INSERT INTO department (name) VALUE ('${newDepartment}')`, async (err, results) => {
  
    await showMainMenu();
    });
  });
};


// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
const addRole = () => {
  db.query('SELECT id, name FROM department', (err, results) => {
  
    let deptChoices = []
    let deptIDs = []
    for (i=0; i<results.length; i++) {
      department=results[i].name;
      deptID=results[i].id;
      deptChoices.push(department);
      deptIDs.push(deptID);
    };
  
    inquirer
    .prompt([
      {
        type: 'input',
        message: `What is the title of the role?`,
        name: 'role',
      },
      {
        type: 'input',
        message: `What is the salary of the role?`,
        name: 'salary',
      },
      {
        type: 'list',
        message: `Which department does the role belong to?`,
        name: 'department',
        choices: deptChoices
      },
    ])

    .then((response) => {
      const role = response.role;      
      const salary = response.salary;      
      const departmentName = response.department;
      let department = 0;
      

      for (i=0; i<deptChoices.length; i++){
        if (deptChoices[i]===departmentName) {
          department=deptIDs[i]
        };
      };

      db.query(`INSERT INTO role (title, salary, department_id) VALUE ('${role}', '${salary}', '${department}')`, async (err, results) => {
    
        await showMainMenu();
      });
    });
  });
}

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
const viewDepartments = () => {
  // Query database
  db.query('SELECT * FROM department', async (err, results) => {
    
    console.log(`
    `)
    await console.table(results);
    await showMainMenu();
  });
};

//  WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
const viewRoles = () => {
  
  db.query('SELECT role.id AS id, role.title AS title, department.name as department, role.salary AS salary FROM department JOIN role ON role.department_id = department.id;', async (err, results) => {
    console.log(`
    `)
    await console.table(results);
    await showMainMenu();
  });
};

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
const viewEmployees = () => {

  db.query(`SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, role.title AS title, department.name as department, role.salary AS salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee m ON employee.manager_id = m.id ORDER BY employee.id;`, async (err, results) => {
    console.log(`
    `)
    await console.table(results);
    await showMainMenu();
  });  

};

showMainMenu();