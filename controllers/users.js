const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() =>
      res.status(500).send({ message: 'Произошла ошибка чтения пользователей' })
    );
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch(() =>
      res.status(500).send({ message: 'Произошла ошибка чтения пользователя' })
    );
};

module.exports.createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.send({ data: user }))
    .catch(() =>
      res
        .status(500)
        .send({ message: 'Произошла ошибка создания пользователя' })
    );
};
