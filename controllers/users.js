const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) =>
      res.status(500).send({
        message: `Произошла ошибка чтения пользователей. Ошибка ${err}`,
      })
    );
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res.status(500).send({
        message: `Произошла ошибка чтения пользователя. Ошибка ${err}`,
      })
    );
};

module.exports.createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res.status(500).send({
        message: `Произошла ошибка создания пользователя. Ошибка ${err}`,
      })
    );
};

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res.status(500).send({
        message: `Произошла ошибка обновления профиля. Ошибка ${err}`,
      })
    );
};
