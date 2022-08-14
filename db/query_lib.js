var inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express')
const db = require('./connection');
const cTable = require('console.table');



//CreateDept
function addDept(createDept) {
    db.query(`
    INSERT INTO department(name) VALUES (?);`, createDept, (err, result)=>{
      if(err){
        console.log("Error conecting to DB");
      }
    });
  }


  //CreateRole
  function addRole(newRole, salary, deptId){
  db.query(`INSERT INTO roles(title, salary, department_id) VALUES (?, ?, ?)`, [newRole, salary, deptId] ,(err, result)=>{
    if(err){
      console.log("Error conecting to DB");
    } else{
      console.log(`${newRole} role created`);
    }
  });

}


//CreateEmployee
function addEmployee (firstName, lastName, roleId, managerId){
  db.query(`
  INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`, [firstName, lastName, roleId, managerId],
  (err, result)=>{
    if(err){
      console.log("Error conecting to DB");
    }else{
      console.log(`Employee added`);
    }
  });
}

//Update Employee role
function addEmployeeUpdate (newIdRole, employeeId){
  db.query(`
  UPDATE employees SET role_id = ? WHERE id = ?;`, [newIdRole, employeeId ],
  (err, result)=>{
    if(err){
      console.log("Error conecting to DB");
    }else{
      console.log(`Employee updated`);
    }
  });
}


//View all Depts
  async function viewDepts() {
  const [rows,fields] = await db.promise().query("SELECT * FROM department;")
  .catch(err=>{console.log('Error conecting to DB')});
  console.table(rows);
  console.log('Press Space or move key Up or Down to select another choice');
}


  module.exports = {
    addDept,
    addRole,
    addEmployee,
    addEmployeeUpdate, 
    viewDepts,
    }