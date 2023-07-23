const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const {
  handleError,
  checkResult,
  checkId,
  checkEmail,
} = require('./validation');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleError(err, res));
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => checkResult(user, res))
    .catch((err) => handleError(err, res));
};

module.exports.getUser = (req, res) => {
  checkId(req.params.userId)
    .then(() => User.findById(req.params.userId))
    .then((user) => checkResult(user, res))
    .catch((err) => handleError(err, res));
};

module.exports.createUser = (req, res) => {
  checkEmail(req.body)
    .then(() => bcrypt.hash(req.body.password, 10))
    .then((hash) => {
      req.body.password = hash;
      return User.create(req.body);
    })
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res));
};

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res));
};

module.exports.login = (req, res) => {
  checkEmail(req.body)
    .then(() => User.findUserByCredentials(req.body.email, req.body.password))
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'kilimanjaro', {
        expiresIn: '7d',
      });
      /* return res.cookie('jwt', token, {
        maxAge: 604800000,
        httpOnly: true,
      }); */
      return res.send(token);
    })
    .catch((err) => handleError(err, res));
};
