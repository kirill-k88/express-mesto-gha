/* const ValidationError = require('./ValidationError');
const CastError = require('./CastError'); */

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
    const err = new Error();
    err.name = 'CastError';
    return Promise.reject(err);
  }
  return res.send(data);
};

const chackId = (id) => {
  if (/[a-z0-9]{24}/.test(id)) {
    const err = new Error();
    err.name = 'ValidationError';
    return Promise.reject(err);
  }
  return Promise.resolve();
};

module.exports = {
  handleError,
  chackResult,
  chackId,
};
