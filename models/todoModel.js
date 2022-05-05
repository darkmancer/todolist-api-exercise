const { v4: uuidv4 } = require('uuid');
const { readTodos, writeTodos } = require('../services/todoService');

module.exports = class Todo {
  constructor(title, completed, dueDate) {
    this.title = title;
    this.completed = completed;
    this.dueDate = dueDate;
  }

  static findAll() {
    return readTodos();
  }

  static async create(todo) {
    const todos = await readTodos();
    todos.push({ id: uuidv4(), ...todo });
    await writeTodos(todos);
  }

  async save() {
    if (!this.id) {
      this.id = uuidv4();
    }

    const todos = await readTodos();
    todos.push(this);
    await writeTodos(todos);
  }

  destroy() {}
};

// static
// instance

// const obj = new Todo('Meeting', false, '2022-12-12')
// const obj2 = new Todo('Shopping', true, '2021-11-11')
// Todo.create({ title: 'Meeting', completed: false, dueDate: '2022-12-12' })
