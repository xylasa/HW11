const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// 1. List All Todo
router.get('/todos', todoController.getAllTodos);

// 2. Detail Todo
router.get('/todos/:id', todoController.getTodoById);

// 3. Create Todo
router.post('/todos', todoController.createTodo);

// 4. Delete Todo (Soft Delete)
router.delete('/todos/:id', todoController.deleteTodo);

module.exports = router;