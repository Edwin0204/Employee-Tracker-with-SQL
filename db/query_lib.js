var inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express')
const db = require('./connection');
const cTable = require('console.table');



//QUERY newDept
function addDept(createDept) {
    db.query(`
    INSERT INTO department name;`, createDept, (err, result)=>{
      if(err){
        console.log("Ups! Something went wrong when trying to connect to database");
      }
    });
  }