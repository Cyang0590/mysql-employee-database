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
  // db.query("SELECT * FROM departments", (err, res) => {
  //   if (err) throw err
  //   console.table(res)
  //   start()
  // })
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM departments", (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.table(res);
        resolve([res]);
        start()
      }
    });
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
  db.query('SELECT department_name name, id value FROM departments', (err, data) => {

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
        name: 'departmentId',
        choices: data,

      },

    ])
      .then(answers => {

        db.query(`INSERT INTO roles (title, salary, department_id) values("${answers.role}", ${answers.salary}, ${answers.departmentId})`, (err, res) => {
          if (err) throw err
          viewRoles()
        });

      });

  })
}


function addEmployee() {

  db.query('SELECT id value , title name  FROM roles', (err, roleData) => {

    db.query('SELECT Concat( first_name , " " , last_name) name, id value FROM employees', (err, managerData) => {




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
          choices: roleData,
        },
        {
          type: 'list',
          message: 'Please select the employee manager',
          name: 'managerId',
          choices: managerData,
        },

      ])
        .then(answers => {
          db.query("INSERT INTO employees (first_name , last_name , role_id, manager_id) values( ? , ? , ? , ?)", [answers.firstName, answers.lastName, answers.roleId, answers.managerId], (err, res) => {
            if (err) throw err
            viewEmployees()
          })
        })
    })

  })
}

function updateEmployeeRole() {
  console.log('hello')
  db.query('SELECT id value, title name FROM roles', (err, roleData) => {

    db.query('SELECT Concat( first_name , " " , last_name) name, id value FROM employees', (err, employeeData) => {

      inquirer.prompt([
        {
          type: 'list',
          message: 'Which employee role do you want to update?',
          choices: employeeData,
          name: 'name'
        },
        {
          type: 'list',
          message: 'What is the new role you  want to assign?',
          choices: roleData,
          name: 'roleName'
        }
      ])
        .then(answers => {
console.log(answers)
          db.query("UPDATE employees set role_id = ? where id = ?", [answers.roleName, answers.name], (err, res) => {
            if (err) throw err
            viewEmployees()
          })
        })
    })
  })
}