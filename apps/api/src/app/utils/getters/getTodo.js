const { Todo } = require('../../models/todo');
const utils = require('../utils');

const getTodo = (todoId, res) => {
  return Todo.findById(todoId, async function (error, todo) {
    if (!todo) return utils.handle404(res);
    if (todo.description === 0)
      return res.status(400).send(`${todo} Not In Stock `);

    const category = await utils.getCategory(todo.category._id, res);

    todo.category = category;
    if (error && todo) res.send(error);
  });
};

exports.getTodo = getTodo;
