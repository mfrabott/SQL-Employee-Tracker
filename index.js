const inquirer = require('inquirer');
// const fs = require('fs');
// const Manager = require('./lib/Manager');
// const Intern = require('./lib/Intern');
// const Engineer = require('./lib/Engineer');
// const team = [];
// const cards = [];

// TODO: Inquirer Inputs
// WHEN I start the application
// THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: `What is the manager's name?`,
        name: 'firstName',
      },
      {
        type: 'input',
        message: `What is the manager's ID Number?`,
        name: 'lastName',
      },
      {
        type: 'list',
        message: `What is the employee's role?`,
        name: 'role',
        // TODO call array of roles
        list: []
      },
      {
        type: 'list',
        message: `Who is the employee's manager?`,
        name: 'manager',
        // TODO call array of employees with none
        list: []
      },
    ])

    .then((response) => {
      const firstName = response.firstName;      
      const lastName = response.lastName;      
      const role = response.role;
      const manager = response.manager;

      showMainMenu();
  });
};


const updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        message: `Which employee's role do you want to update?`,
        name: 'employee',
        // TODO call array of employees
        list: []
      },
      {
        type: 'list',
        message: `Which role do you want to assign the selected employee?`,
        name: 'role',
        // TODO call array of roles
        list: []
      }
    ])

    .then((response) => {
      const employee = response.employee;      
      const role = response.role;      

      showMainMenu();
  });
};

// WHEN I select the engineer option
// THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
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
    const department = response.name      
    // const engineer = new Engineer(name, id, email, role, githubUsername)

    showMainMenu();

  });
};


// WHEN I select the intern option
// THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
const addRole = () => {
  inquirer
  .prompt([
    {
      type: 'input',
      message: `What is the name of the role?`,
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
      // TODO call array of departments
      list: []
    },
  ])

  .then((response) => {
    const role = response.role;      
    const salary = response.salary;      
    const department = response.department;
    //  const intern = new Intern(name, id, email, role, school)
    
    showMainMenu();

  });
};

// WHEN I enter the team manager’s name, employee ID, email address, and office number
// THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team

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
      // newEngineer();
    } else if (response.mainMenu === 'Add Employee') {
      addEmployee();
    } else if (response.mainMenu === `Update Employee Role`) {
      updateEmployeeRole();
    } else if (response.mainMenu === 'View All Roles') {
      // newIntern();
    } else if (response.mainMenu === 'Add Role') {
      addRole();
    } else if (response.mainMenu === `View All Departments`) {
      // newIntern();
    } else if (response.mainMenu === `Add Department`) {
      addDepartment();
    } else if (response.mainMenu === 'Quit') {
      // newIntern();
    }


showMainMenu();