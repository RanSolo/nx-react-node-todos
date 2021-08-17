// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Category, validate } = require('../models/category');
const { handle400, handle404, getCategory } = require('../utils/utils');
const modelName = 'category';

router.get('/', async (req, res) => {
  const categories = await Category.find().sort('name');

  res.send(categories);
});

router.get('/:id', async (req, res) => {
  const category = await getCategory(req.params.id, res);

  res.send(category);
});

router.post('/', async (req, res) => {
  const category = new Category({ name: req.body.name });
  const error = validate(req.body);

  if (error) handle400(error, res);
  try {
    await category.save();
    res.send(category);
  } catch (error) {
    console.error('error: ', error.message);
  }
});

router.put('/:id', (req, res) => {
  const _id = req.params.id;
  const { name } = req.body;
  const error = validate(req.body);

  if (error) handle400(error, res);
  Category.findOneAndUpdate(
    { _id },
    { name },
    { new: true },
    function (error, category) {
      if (!category) handle404(res);
      if (category) res.send(category);
      if (error) res.send(error);
    }
  );
});

router.delete('/:id', async (req, res) => {
  Category.findByIdAndRemove(req.params.id, function (err, category) {
    if (err) console.error('ERROR: ', err);
    if (!category) handle404(res);
    if (category) res.send(category);
  });
});

export default router;
