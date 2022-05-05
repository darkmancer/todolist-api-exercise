const express = require('express');

const todoController = require('../controllers/todoController');

const router = express.Router();

// Get All Todos: GET /todos
router.get('/', todoController.getAllTodos);

// Get Todo By Id: GET /todos/:id
// PARAM: id
router.get('/:id', todoController.getTodoById);

// Create Todo: POST /todos
// BODY: title(required), completed(default:false), dueDate
router.post('/', todoController.createTodo);

// Update Todo: PUT /todos/:id
// BODY: title(required), completed(default:false), dueDate
router.put('/:id', todoController.updateTodo);

// Delete Todo: DELETE /todos/:id
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
