const { Category } = require('../../models/category');
const { handle404, handle400 } = require('../errorHandlers/handle404');

const getCategory = (categoryId, res) => {
    return Category.findById(categoryId, function (error, category) {
        if (!category) return handle404('category', categoryId, res);
        if (error) return handle400(error, res);
        if (error && category) res.send(error);
    });
};

exports.getCategory = getCategory;
