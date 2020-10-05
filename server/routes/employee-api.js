/*
============================================
Title: NodeBucket
Author: Clayton Stacy
Date: 24 Sept 2020
Modified by: Clayton Stacy
Description: Application to build to do lists
============================================
*/

const express = require('express');
const Employee = require('../models/employee');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');

const router = express.Router();

router.get('/:empId', async(req, res) => {
  try {
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {
      if(err) {
        console.log(err);

        const mongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);

        res.status(404).send(mongoDbErrorResponse.toObject())
      } else {
        console.log(employee);
        res.json(employee);
      }
    })

  } catch (e) {
    console.log(e);
    res.status(500).send({
      'message': 'Internal Server Error'
    })
  }
});

module.exports = router;

