const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mongoose = require('mongoose');
const router = express.Router();
const { Todo, validate } = require('../models/todo');
const {
  handle400,
  handle404,
  getCategory,
  getTodo,
} = require('../utils/utils');
const modelName = 'todo';

router.get('/', async (req, res) => {
  const todos = await Todo.find().sort('name');
  res.send(todos);
});

router.get('/:id/todos', async (req, res) => {
  const todos = await Todo.find().sort('name');
  res.send(todos);
});

router.get('/:id', async (req, res) => {
  const todo = await getTodo(req.params.id, res);
  if (todo) res.send(todo);
});

router.post('/', async (req, res) => {
  const error = validate(req.body);

  if (error) handle400(error, res);
  try {
    console.log('req', req.body);
    const todo = await createTodo(req.body, res);

    await todo.save();
    res.send(todo);
  } catch (error) {
    console.error(error);
  }
});

router.put('/:id', async (req, res) => {
  const _id = req.params.id;
  const { task, categoryId, description, completed } = req.body;
  const error = validate(req.body);

  if (error) handle400(error, res);
  const category = await getCategory(categoryId, res);

  Todo.findOneAndUpdate(
    { _id },
    { task, category, description, completed },
    { new: true },
    function (error, todo) {
      if (!todo) handle404(modelName, req.params.id, res);
      if (todo) res.send(todo);
      if (todo && error) res.send(error);
    }
  );
});

router.delete('/:id', (req, res) => {
  Todo.findByIdAndRemove(req.params.id, function (err, todo) {
    if (err) console.error('ERROR: ', err);
    if (!todo) handle404(modelName, req.params.id, res);
    if (todo) res.send(todo);
  });
});

const createTodo = async (reqBody, res) => {
  try {
    const category = await getCategory(reqBody.category, res);
    reqBody.categoryName = category.name;

    return await newTodo(reqBody);
  } catch (e) {
    console.error('error: ', e.message);
  }
};

const newTodo = (reqBody) => {
  const { task, categoryId, description, completed, categoryName } = reqBody;
  return new Todo({
    task,
    category: { categoryId, name: categoryName },
    description,
    completed,
  });
};

export default router;
