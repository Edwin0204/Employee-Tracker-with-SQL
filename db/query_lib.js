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
      console.log("Ups! Something went wrong when trying to connect to database");
    } else{
      console.log(`${newRole} role successfully created`);
    }
  });

}


  module.exports = {
    addDept,
    addRole,
    }