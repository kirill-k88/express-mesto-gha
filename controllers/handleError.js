module.exports.handleError = (err, res, objName) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send({
      message: `Переданы некорректные данные. Ошибка: ${err}`,
    });
  } else if (err.name === 'CastError') {
    return res.status(404).send({
      message: `Данных пл указанному _id не найдено. Ошибка: ${err}`,
    });
  }
  return res.status(500).send({ message: `Произошла ошибка. Ошибка: ${err}` });
};
