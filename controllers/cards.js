const Card = require('../models/card');
const { handleError, checkResult, checkId } = require('./validation');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => handleError(err, res));
};

module.exports.deleteCard = (req, res) => {
  checkId(req.params.cardId)
    .then(() =>
      Card.findOneAndDelete({ _id: req.params.cardId, owner: req.user._id }),
    )
    .then((card) => checkResult(card, res))
    .catch((err) => handleError(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => handleError(err, res));
};

module.exports.likeCard = (req, res) => {
  checkId(req.params.cardId)
    .then(() =>
      Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } },
        {
          new: true,
          runValidators: true,
        },
      ),
    )
    .then((card) => checkResult(card, res))
    .catch((err) => handleError(err, res));
};

module.exports.dislikeCard = (req, res) => {
  checkId(req.params.cardId)
    .then(() =>
      Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } },
        {
          new: true,
          runValidators: true,
        },
      ),
    )
    .then((card) => checkResult(card, res))
    .catch((err) => handleError(err, res));
};
