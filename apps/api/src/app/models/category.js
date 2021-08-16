const Joi = require('joi');
const mongoose = require('mongoose');

const categorieschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
});

const Category = mongoose.model('Category', categorieschema);

function validateCategory(category) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });

    return schema.validate(category);
}

exports.categorieschema = categorieschema;
exports.Category = Category;
exports.validate = validateCategory;
