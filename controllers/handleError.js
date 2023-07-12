const ValidationError = require('./ValidationError');
const CastError = require('./CastError');

const handleError = (err, res) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send({
      message: 'Переданы некорректные данные',
    });
  }
  if (err.name === 'CastError') {
    return res.status(404).send({
      message: 'Данных по указанному _id не найдено',
    });
  }
  return res.status(500).send({ message: 'Ошибка по умолчанию' });
};

const chackResult = (data, res) => {
  if (!data) {
    return Promise.reject(new CastError());
  }
  return res.send(data);
};

const chackId = (id) => {
  if (id.length < 20) {
    return Promise.reject(new ValidationError());
  }
  return Promise.resolve();
};

module.exports = {
  handleError,
  chackResult,
  chackId,
};
