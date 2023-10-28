const express = require('express');
const app = express();
const { Todo } = require('./models');
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 1. List All Todo
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 2. Detail Todo
app.get('/todos/:id', async (req, res) => {
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
});

// 3. Create Todo
app.post('/todos', async (req, res) => {
  const { title } = req.body;
  try {
    const todo = await Todo.create({ title });
    res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 4. Delete Todo (Soft Delete)
app.delete('/todos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findByPk(id);
    if (todo) {
      await todo.update({ deleted: true });
      res.json({ message: 'Todo deleted succesfully' });
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Error Handler 
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  });
  



module.exports = app;
