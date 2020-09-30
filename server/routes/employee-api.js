const express = require('express');
const Employee = require('../models/employee');

const router = express.Router();

router.get('/:empId', async(req, res) => {
  try {
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {
      if(err) {
        console.log(err);
        res.status(404).send({
          'message': 'Internal Server Error'
        })
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

