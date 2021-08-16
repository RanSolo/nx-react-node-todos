const mongoose = require('mongoose');

export const startDb = function () {
  mongoose
    .connect('mongodb://localhost/todos', {})
    .then((server) => {
      console.log('Server started');
      server.connections.forEach((c) => {
        console.log('name: ', c.name);
        console.log('host: ', c.host);
        console.log('port: ', c.port);
      });
    })
    .catch((e) => console.error('could not connect', e));
};
