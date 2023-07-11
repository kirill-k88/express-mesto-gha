const Card = require('../models/card');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) =>
      res
        .status(500)
        .send({ message: `Произошла ошибка чтения карточек. Ошибка ${err}` })
    );
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) =>
      res
        .status(500)
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
        .status(500)
        .send({ message: `Произошла ошибка создания карточки. Ошибка ${err}` })
    );
};
