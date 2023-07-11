const handleError = (err, res) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send({
      message: `Переданы некорректные данные`,
    });
  }
  if (err.name === 'CastError') {
    return res.status(404).send({
      message: `Данных по указанному _id не найдено`,
    });
  }
  return res.status(500).send({ message: `Ошибка по умолчанию` });
};

class CastError extends Error {
  constructor() {
    super();
    this.name = 'CastError';
  }
}

const chackResult = (data, res) => {
  if (!data) {
    throw new CastError();
  }
  res.send({ data });
};

module.exports = {
  handleError,
  chackResult,
};
