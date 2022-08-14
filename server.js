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


    //createEmployee
    async function createEmployee() {

    let roleIdA = [];
    let roleTitleA = [];
 
    const [roles, rolesField] = await db.promise().query('Choose the Id and title for roles'); 
    let rolesA = roles.map((element, index)=>{
     let id = element.id;
     let title = element.title;
 
     roleIdA.push(id)
     roleTitleA.push(title)
    });
 
   const [managersName, roleIdfields] = await db.promise().query(`
   SELECT CONCAT(manager.first_name, " ", manager.last_name) AS Manager 
   FROM employees employee
   LEFT JOIN employees Manager ON employee.manager_id = manager.id
   WHERE employee.id = 2 OR employee.id = 4 OR employee.id = 6 OR employee.id = 8;`); 
   let arrayManagers = managersName.map((element, index)=>element.Manager);
 
   let managerIdA = [];
   let managerNameA = [];
 
   const [idManager, idManagerfields] = await db.promise().query(`SELECT id, CONCAT(employees.first_name, ' ', employees.last_name)AS managerName FROM employees;`)
   let managerName = idManager.map((element, index)=>{
     let id = element.id;
     let name = element.managerName;
     managerIdA.push(id);
     managerNameA.push(name);
   });
 
   inquirer
   .prompt([
     {
       type: 'input',
       message: `Employee's first name?`,
       name: 'firstName',
     },
     {
       type: 'input',
       message: `Employee's last name?`,
       name: 'lastName',
     },
     {
      type: 'rawlist',
      message: `Employee's role?`,
      name: 'employeeRole',
      choices: roleTitleA
     },
     {
      type: 'rawlist',
      message: `Employee's manager?`,
      name: 'manager',
      choices: arrayManagers
     },
     
   ]).then(userInput =>{
     const {firstName, lastName, employeeRole, manager } = userInput;
 
     if( roleTitleA.includes(employeeRole) && arrayManagers.includes(manager) ){
         
       const roleI = roleTitleA.indexOf(employeeRole);
       const roleF = roleIdA[roleI];
 
       const managerI = managerNameA.indexOf(manager);

       const findManagerId = managerIdA[managerI]

       query.addEmployee(firstName,lastName, roleF, findManagerId );
   
     }else{
       console.log(`Error`)
     }
     chooseRequest();
   });
}
 

//Update Employee
async function updateEmployee(){

  let employeeIdA = [];
  let employeeNameA = [];

  const [employees, fiels] = await db.promise().query(`SELECT id, CONCAT(first_name, ' ', last_name) AS employee FROM employees;`);
  let employeesName = employees.map((element, index)=>{
      let name =  element.ename;
      let id = element.id
      employeeIdA.push(id)
      employeeNameA.push(name)  
    });
    
  let rolesIdA = []
  let rolesTitleA = []

  const [rolesTitleId, fieldsId] = await db.promise().query(`SELECT  roles.id, roles.title FROM roles`);
  let roleId = rolesTitleId.map((element, index)=>{
      let id = element.id; 
      let title = element.title

      rolesTitleA.push(title)
      rolesIdA.push(id)
  });

  inquirer
  .prompt([
    {
      type: 'rawlist',
      message: `Which employee do you want to update?` ,
      name: 'ename',
      choices: employeeNameA
    },
    {
      type: 'rawlist',
      message: 'Which role do you want to assign?',
      name: 'updateRole',
      choices: rolesTitleA
    }
  ])
  .then(userChoices=>{
    const {employee, updateRole } = userChoices;

    if(rolesTitleA.includes(updateRole) && employeeNameA.includes(employee)){
      console.log('Employee found')

      let employeeIndexF = employeeNameA.indexOf(employee);

      let findEmployeeIdA = employeeIdA[employeeIndexF];

      let indexRole = rolesTitleA.indexOf(updateRole);
    
      let findRoleId = rolesIdA[indexRole]
      
      query.addUpdatedEmployee(findRoleId, findEmployeeIdA);
    }else{
      console.log(`Role not found`)
    }
    chooseRequest();
  })
}


function finish(){
  
  return console.log("Thankyou for using the Employee Tracker") ;
}
 
   
   chooseRequest();