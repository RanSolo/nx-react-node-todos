const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const { categorieschema } = require('./category');

const Todo = mongoose.model(
  'Todos',
  new mongoose.Schema({
    task: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    category: {
      type: categorieschema,
    },
    description: {
      type: String,
      required: true,
      min: 0,
      max: 255,
    },
    completed: {
      type: Boolean,
    },
  })
);

function validateTodo(todo) {
  const schema = Joi.object({
    task: Joi.string().min(5).max(50).required(),
    category: Joi.objectId(),
    description: Joi.string().min(0).required(),
    completed: Joi.boolean(),
  });

  return schema.validate(todo);
}

exports.Todo = Todo;
exports.validate = validateTodo;
