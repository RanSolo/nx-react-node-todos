const { Todo } = require('../../models/todo');
const utils = require('../utils');

const getTodo = (todoId, res) => {
    return Todo.findById(todoId, async function (error, todo) {
        if (!todo) utils.handle404('todo', todoId, res);
        if (todo.description === 0)
            return res.status(400).send(`${todo} Not In Stock `);

        const category = await utils.getCategory(todo.category.id, res);

        if (!category) {
            console.error('orphaned category');
            res.send('orphaned category');
        }
        todo.category = category;
        if (error && todo) res.send(error);
    });
};

exports.getTodo = getTodo;
