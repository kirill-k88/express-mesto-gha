const Card = require('../models/card');

module.exports.getAllCards = (req, res) => {
  Card.find({ df: 'df' })
    .then((cards) => res.send({ data: cards }))
    .catch((err) =>
      res
        .status(404)
        .send({ message: `Произошла ошибка чтения карточек. Ошибка ${err}` })
    );
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) =>
      res
        .status(404)
        .send({ message: `Произошла ошибка удаления карточки. Ошибка ${err}` })
    );
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: { card } }))
    .catch((err) =>
      res
        .status(400)
        .send({ message: `Произошла ошибка создания карточки. Ошибка ${err}` })
    );
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send({ data: { card } }))
    .catch((err) =>
      res
        .status(404)
        .send({ message: `Произошла ошибка при лайке карточки. Ошибка ${err}` })
    );
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send({ data: { card } }))
    .catch((err) =>
      res.status(500).send({
        message: `Произошла ошибка при дизлайке карточки. Ошибка ${err}`,
      })
    );
};
