const Card = require('../models/card');
const { handleError, chackResult, chackId } = require('./handleError');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => handleError(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(err, res));
};

module.exports.likeCard = (req, res) => {
  chackId(req.params.cardId)
    .then(() => Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      {
        new: true,
        runValidators: true,
      },
    ))
    .then((card) => chackResult(card, res))
    .catch((err) => handleError(err, res));
};

module.exports.dislikeCard = (req, res) => {
  chackId(req.params.cardId)
    .then(() => Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      {
        new: true,
        runValidators: true,
      },
    ))
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(err, res));
};
