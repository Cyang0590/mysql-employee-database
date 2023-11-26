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
function start (){

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
        if(data.menu === 'View All Departments'){
            viewEmployees()
        }
    });
}

function viewEmployees() {
 db.query("SELECT * FROM departments", (err, res)=>{
    if (err) throw err
    console.table(res)
    start()
 })
}