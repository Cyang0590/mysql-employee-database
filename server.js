const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const sequelize = require('./config/connection');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });

inquirer
    .prompt([
        {
            type: 'list',
            message: '',
            name: '',
            choices: ['View All Departments', 
                      'View All Roles', 
                      'View All Employees', 
                      'Add A Department', 
                      'Add A Role', 
                      'Add An Employee', 
                      'Update An Employee Role'],
        },
    ])