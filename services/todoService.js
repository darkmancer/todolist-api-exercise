const { readFile, writeFile } = require('../utils/file');

exports.readTodos = () => readFile('db/todo.json');

exports.writeTodos = todos => writeFile('db/todo.json', todos);
