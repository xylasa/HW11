const { Todo } = require('../models');

// 1. List All Todo
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// 2. Detail Todo
exports.getTodoById = async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findByPk(id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// 3. Create Todo
exports.createTodo = async (req, res) => {
  const { title } = req.body;
  try {
    const todo = await Todo.create({ title });
    res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// 4. Delete Todo (Soft Delete)
exports.deleteTodo = async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findByPk(id);
    if (todo) {
      await todo.update({ deleted: true });
      res.json({ message: 'Todo deleted successfully' });
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
