const { People } = require('../../models/people');
const { handle404 } = require('../errorHandlers/handle404');

const getPeople = (peopleId, res) => {
    return People.findById(peopleId, function (error, people) {
        if (!people) handle404('people', peopleId, res);
        if (error && people) res.send(error);
    });
};

exports.getPeople = getPeople;
