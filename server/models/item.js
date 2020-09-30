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


let itemSchema = new Schema({
  text: {type: String }
});

module.exports = itemSchema;
