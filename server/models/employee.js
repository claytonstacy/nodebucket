/*
============================================
Title: NodeBucket
Author: Clayton Stacy
Date: 24 Sept 2020
Modified by: Clayton Stacy
Description: Application to build to do lists
============================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('./item');


const employeeSchema = new Schema({
  empId: {type: String, unique: true, dropDups: true },
  firstName: {type: String },
  lastName: {type: String },
  todo: [Item],
  done: [Item]

}, { collection: 'employee' });

module.exports = mongoose.model('Employee', employeeSchema);
