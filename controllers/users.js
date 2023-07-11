const User = require('../models/user');
const { handleError, chackResult } = require('./handleError');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => handleError(err, res));
};

/* module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
}; */

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => chackResult(user, res))
    .catch((err) => handleError(err, res));
};

module.exports.createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};
