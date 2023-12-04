const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();


const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the employee_db database.`)
);

start()
function start() {

  inquirer
    .prompt({
      type: 'list',
      message: 'Chose an option',
      name: 'menu',
      choices: ['View All Departments',
        'View All Roles',
        'View All Employees',
        'Add A Department',
        'Add A Role',
        'Add An Employee',
        'Update An Employee Role'],
    }).then((data) => {
      console.log(data.menu);
      if (data.menu === 'View All Departments') {
        viewDepartments()
      }
      if (data.menu === 'View All Roles') {
        viewRoles()
      }
      if (data.menu === 'View All Employees') {
        viewEmployees()
      }
      if (data.menu === 'Add A Department') {
        addDepartment()
      }
      if (data.menu === 'Add A Role') {
        addRole()
      }
      if (data.menu === 'Add An Employee') {
        addEmployee()
      }
      if (data.menu === 'Update An Employee Role') {
        updateEmployeeRole()
      }
    });
}

function viewDepartments() {
  db.query("SELECT * FROM departments", (err, res) => {
    if (err) throw err
    console.table(res)
    start()
  })
}

function viewRoles() {
  db.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err
    console.table(res)
    start()
  })
}

function viewEmployees() {
  db.query("SELECT * FROM employees", (err, res) => {
    if (err) throw err
    console.table(res)
    start()
  })
}

function addDepartment() {
  inquirer.prompt([
    {
      message: 'Enter the new department name',
      name: 'name',
    },
  ])
    .then(answers => {

      db.query(`INSERT INTO departments(department_name) VALUES ('${answers.name}')`, (err, res) => {
        if (err) throw err
        console.table(res)
        start()
      })
    })
}

function addRole() {
  inquirer.prompt([
    {
      message: 'Enter your new role',
      name: 'role',
    },
    {
      message: 'Enter your salary',
      name: 'salary',
    },
    {
      type: 'list',
      message: 'Please select the depatment for this role',
      name: 'dapartmentId',
      choices: departments.department_name,
      
    },

  ])
    .then(answers => {

      db.query(`INSERT INTO roles SET ?`, (err, res) => {
        if (err) throw err
        console.table(res)
        start()
      })
    
    })
}

function addEmployee() {
  inquirer.prompt([
    {
      message: 'Please enter the first name of the employee',
      name: 'firstName',
    },
    {
      message: 'Please enter the last name of the employee',
      name: 'lastName',
    },
    {
      type: 'list',
      message: 'Please select the employee role',
      name: 'roleId',
      choices: ['department'],
    },
    {
      type: 'list',
      message: 'Please select the employee manager',
      name: 'managerId',
      choices: '',
    },

  ])
  db.query("SELECT * FROM employees", (err, res) => {
    if (err) throw err
    console.table(res)
    start()
  })
}

function updateEmployeeRole() {
  db.query("SELECT * FROM employees", (err, res) => {
    if (err) throw err
    console.table(res)
    start()
  })
}