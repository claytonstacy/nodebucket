const express = require('express');
const Employee = require('../models/employee');
const Item = require('../models/item');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');

const router = express.Router();

router.get('/:empId', async(req, res) => {
  try {
    Employee.findOne({'empId': req.params.empId }, 'empId todo done', function(err, employee) {
      if(err) {
        console.log(err);
        const mongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(mongoDbErrorResponse.toObject())
      } else {
        console.log(employee);
        const employeeTasksResponse = new BaseResponse('200', 'Query Successful', employee)
        res.json(employee)
      }
    })
  } catch (error) {
    res.status(500).send({
      'message': "internal server error"
    })
  }
});

router.post('/:empId', async(req, res) => {
  try {
      Employee.findOne({'empId': req.params.empId}, function(err, employee) {
        if (err) {
          console.log(err);
          const createTaskMongoDBErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);
          res.status(500).send(createTaskMongoDBErrorResponse.toObject())
        } else {
          console.log(employee);
          const item = {
            text: req.body.text
          }
          employee.todo.push(item);
          employee.save(function(err, updatedEmployee) {
            if(err) {
              console.log(err);
              const createTaskOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);

              res.status(500).send(createTaskOnSaveMongoDbErrorResponse.toObject())
            } else {
              console.log(updatedEmployee);
              const createTaskOnSaveSuccessResponse= new BaseResponse('200', 'Successful Entry', updatedEmployee);
              res.json(createTaskOnSaveSuccessResponse.toObject())
            }
          })
        }
      })

  } catch (err) {
    console.log(e);
    const createTaskCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error', e.message);
    res.status(500).send(createTaskCatchErrorResponse.toObject())

  }
});

router.put('/:empId', async(req, res) => {
  try {
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {
      if(err) {
        console.log(err);
        const updateTaskMongoDbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);
        res.status(500).send(updateTaskMongoDbErrorResponse.toObject());
      } else {
        console.log(employee);
        employee.set({
          todo: req.body.todo,
          done: req.body.done
        });
        employee.save(function(err, updatedEmployee) {
          if(err) {
            console.log(err);
            const updateTaskOnSaveMongoDBErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);
            res.status(500).send(updateTaskOnSaveMongoDBErrorResponse.toObject());
          } else {
            console.log(updatedEmployee);
            const updatedTaskOnSaveSuccessResponse = new BaseResponse('200', 'Update Successful', updatedEmployee);
            res.json(updatedTaskOnSaveSuccessResponse.toObject())
          }
        });

      }
    })

  } catch (error) {
    console.log(error);
    const updateTaskCatchErrorResponse = new ErrorResponse('500', 'Internal Error', error.message);

    res.status(500).send(updateTaskCatchErrorResponse.toObject())

  }
});

router.delete('/:empId/:taskId', async(req, res) => {
  try {

    Employee.findOne({'empId': req.params.empId}, function(err, employee) {
      if (err) {
        console.log(err);
        const deleteTaskMongoDbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);
        res.status(500).send(deleteTaskMongoDbErrorResponse.toObject())
      } else {
        console.log(employee);
        console.log('Found employee tasks', JSON.stringify(employee.todo));
        const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);
        const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);
        if(todoItem) {
          employee.todo.id(todoItem._id).remove();
          employee.save(function(err, updatedTodoItem) {
            if(err) {
              console.log(err);
              const deleteTaskOnSaveMongoDbErrorMessage = new ErrorResponse('500', 'Internal Server Error', err);
              res.status(500).send(deleteTaskOnSaveMongoDbErrorMessage.toObject());
            } else {
              console.log(updatedTodoItem);
              const deleteTodoItemSuccessResponse = new BaseResponse('200', 'Removed item from todo list', updatedTodoItem);
              res.json(deleteTodoItemSuccessResponse.toObject());
            }
          })
        } else if (doneItem) {
          employee.done.id(doneItem._id).remove();
          employee.save(function(err, updatedDoneItem) {
            if(err) {
              console.log(err);
              const deleteDoneItemOnSaveMongoDbErrorResponse = new ErrorResponsed('500', 'Internal Server Error', err);
              res.status(500).send(deleteDoneItemOnSaveMongoDbErrorResponse.toObject);
            }else {
              console.log(updatedDoneItem);
              const deleteDoneItemSuccesResponse = new BaseResponse('500', 'Success', updatedDoneItem);
              res.status(200).send(deleteDoneItemSuccesResponse.toObject())
            }
          });
        } else {
          console.log('Invalid Task Id');

          const deleteTaskNotFoundResponse = new ErrorResponse('200', 'Unable to locate', null);
          res.status(200).send(deleteTaskNotFoundResponse.toObject())
        }

      }
    })

  } catch (error) {
    console.log(error);
    const deleteTaskCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error', error.message);
    res.status(500).send(deleteTaskCatchErrorResponse.toObject())
  }
})

module.exports = router;
