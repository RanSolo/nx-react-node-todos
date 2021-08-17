const handle400 = (error, res) => {
  return error.error ? res.status(400).send(`booty${error.error}`) : null;
};

exports.handle400 = handle400;
