const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = require('./db/connection');
let query = require('./db/query_lib')



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
         query.viewDepts();
         chooseRequest();
         break;
         
         case 'View all roles':
         query.viewRoles();
         chooseRequest();
         break;
   
         case 'View all employees':
         query.viewEmployees();
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

   // Add a department
   function createDept(){
    inquirer
    .prompt([
      {
        type: 'input',
        message: `Enter the name of the new department`,
        name: 'department',
     }
    ]).then(userInput =>{
      const {department } = userInput;
  
      //Creating  a new Department
      query.addDept(department);
      console.log(`${department} created`);
      chooseRequest();
    })
  }

    // Add a role
    async function createRole(){

        let deptsIdA = []
        let deptsNameA = [];
      
        const [departments, fields] = await db.promise().query('Choose the id and name of the department'); 
        const deparmentsArray = departments.map((element, index)=>{
          let deptId = element.id;
          let deptName = element.name;
          deptsIdA.push(deptId)
          deptsNameA.push(deptName)
        });
      
        const [roles, roleFields] = await db.promise().query('Choose the name for the roles;'); 
        let roleName = roles.map((element, index)=>element.title);
        
        inquirer
        .prompt([
          {
          type: 'input',
          message: `Enter the name of the role`,
          name: 'role',
          },
          {
          type: 'number',
          message: `What's the salary for the new role`,
          name: 'salary',
          },
          {
          type: 'rawlist',
          message: `In which department is the new role?`,
          name: 'deptRole',
          choices: deptsNameA
          }
         
        ]).then(userInput =>{
          const {role, salary, deptRole} = userInput;
      
          //Validate the information
          if(deptsNameA.includes(deptRole)){
      
              if(roleName.includes(role)  ){
                console.log(`The role already exists`)
                chooseRequest();
              }else{
            let deptsList = deptsNameA.indexOf(deptRole);
            let deptsIdFind = deptsIdA[deptsList];
            
            
            query.addRole(role, salary, deptsIdFind);
            }
          }
          chooseRequest();
        })
      }
   
   chooseRequest();