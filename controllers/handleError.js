module.exports.handleError = (err, res) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send({
      message: `Переданы некорректные данные. Ошибка: ${err.message}`,
    });
  }
  if (err.name === 'CastError') {
    return res.status(404).send({
      message: `Данных по указанному _id не найдено. Ошибка: ${err.message}`,
    });
  }
  return res
    .status(500)
    .send({ message: `Ошибка по умолчанию: ${err.message}` });
};
