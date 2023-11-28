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
  console.log(`Connected to the movies_db database.`)
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
      message: 'enter the department name',
      name: 'name',
    },
  ])
    .then(answers => {

      db.query(`INSERT INTO departments(department_name) values(${answers.name})`, (err, res) => {
        if (err) throw err
        console.table(res)
        start()
      })
    })
}

function addRole() {
  inquirer.prompt([
    {
      message: 'enter your role',
      name: 'name',
    },
  ])
    .then(answers => {

      db.query(`INSERT INTO roles(title) values(${answers.name})`, (err, res) => {
        if (err) throw err
        console.table(res)
        start()
      })
    })
}

function addEmployee() {
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