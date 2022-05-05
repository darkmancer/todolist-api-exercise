const validator = require('validator');
const { v4: uuidv4 } = require('uuid');

const createError = require('../utils/createError');
const { readTodos, writeTodos } = require('../services/todoService');
const Todo = require('../models/todoModel');

exports.getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.findAll();
    res.json({ todos });
  } catch (err) {
    next(err);
  }
};

exports.getTodoById = async (req, res, next) => {
  try {
    const params = req.params;
    const todos = await readTodos();
    const todo = todos.find(el => el.id === params.id);
    res.json({ todo: todo ?? null });
  } catch (err) {
    next(err);
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    const { title, completed = false, dueDate = null } = req.body;
    if (typeof title !== 'string') {
      // return res.status(400).json({ message: 'title must be a string' });
      createError('title must be a string', 400);
    }

    if (validator.isEmpty(title)) {
      return res.status(400).json({ message: 'title is required' });
    }

    if (typeof completed !== 'boolean') {
      return res.status(400).json({ message: 'completed must be a boolean' });
    }

    if (dueDate !== null && !validator.isDate(dueDate + '')) {
      return res.status(400).json({ message: 'dueDate must be a date string' });
    }

    // const todo = {
    //   title,
    //   completed,
    //   dueDate: dueDate === null ? dueDate : new Date(dueDate) // dueDate && new Date(dueDate)
    // };

    // await Todo.create(todo);

    const todo = new Todo(
      title,
      completed,
      dueDate === null ? dueDate : new Date(dueDate)
    );
    await todo.save();

    res.json({ todo });
  } catch (err) {
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const params = req.params;

    const todos = await readTodos();
    const idx = todos.findIndex(el => el.id === params.id);
    if (idx === -1) {
      createError('todo is not found', 400);
    }

    const {
      title = todos[idx].title,
      completed = todos[idx].completed,
      dueDate = todos[idx].dueDate
    } = req.body;

    if (typeof title !== 'string') {
      // return res.status(400).json({ message: 'title must be a string' });
      createError('title must be a string', 400);
    }

    if (validator.isEmpty(title)) {
      return res.status(400).json({ message: 'title is required' });
    }

    if (typeof completed !== 'boolean') {
      return res.status(400).json({ message: 'completed must be a boolean' });
    }

    if (dueDate !== null && !validator.isDate(dueDate + '')) {
      return res.status(400).json({ message: 'dueDate must be a date string' });
    }

    todos[idx] = {
      id: params.id,
      title,
      completed,
      dueDate: dueDate === null ? dueDate : new Date(dueDate)
    };

    await writeTodos(todos);
    res.json({ todo: todos[idx] });
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const params = req.params;
    const todos = await readTodos();
    const idx = todos.findIndex(el => el.id === params.id);
    if (idx === -1) {
      createError('todo is not found', 400);
    }
    todos.splice(idx, 1);
    await writeTodos(todos);
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
