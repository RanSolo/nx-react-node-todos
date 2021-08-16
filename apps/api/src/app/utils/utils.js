const { handle400, handle404 } = require('./errorHandlers/handlers');
const { getCategory, getTodo } = require('./getters/getters');

exports.handle400 = handle400;
exports.handle404 = handle404;
exports.getCategory = getCategory;
exports.getTodo = getTodo;
