const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = require('./db/connection');



const chooseRequest = () => {
    console.log('Welcome to the Employee Tracker');
    inquirer.prompt([
        {
           type: 'rawlist',
           message: 'What would you like to do?',
           name: 'options',
           choices: ['View all departments', 
                     'View all roles', 
                     'View all employees', 
                     'Add a department', 
                     'Add a role', 
                     'Add an employee', 
                     'Update an employee role', 
                     'Finish' ]
        }
     ])
     .then((userChoice) => {
        switch(userChoice.options){
   
         case 'View all departments':
          sqlFunctions.viewDepts();
           chooseRequest();
         break;
         
         case 'View all roles':
         sqlFunctions.viewRoles();
         chooseRequest();
         break;
   
         case 'View all employees':
         sqlFunctions.viewEmployees();
         chooseRequest();
         break;
   
         case 'Add a department':
           createDept();
         break;
   
         case 'Add a role':
           createRole();
         break;
   
         case 'Add an employee':
           createEmployee();
         break;
   
         case 'Update an employee role':
           updateEmployee();
         break;
         
         case 'Finish':
         finish();
         break;
        }
     })
   }



   
   chooseRequest();