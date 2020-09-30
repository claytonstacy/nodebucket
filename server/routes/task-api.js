const express = require('express');
const Employee = require('../models/employee');
const Item = require('../models/item');

const router = express.Router();

class EmployeeResponse {
  constructor(message, statusCode, errorMessage) {
    this.message = message;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
  }
};

router.get('/:empId', async(req, res) => {
  try {
    Employee.findOne({'empId': req.params.empId }, 'empId todo done', function(err, employee) {
      if(err) {
        console.log(err);
        const mongodbError = new EmployeeResponse('internal server error', '500', err);
        res.status(500).send({
          data: mongodbError
        })
      } else {
        console.log(employee);
        res.json(employee)
      }
    })
  } catch (error) {
    res.status(500).send({
      'message': "internal server error"
    })
  }
});

router.post('/', async(req, res) => {
  const task = new Item({
    text: req.body.text
  });

  try {
    const newTask = await task.save()
    res.status(201).json(newTask)
  } catch (err) {
    res.status(400).send({
      'message': "Internal server error"
    })

  }
})

module.exports = router;
