const express = require('express');
const todos = require('../routes/todos');
const categories = require('../routes/categories');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/todos', todos.default);
  app.use('/api/categories', categories.default);
};
