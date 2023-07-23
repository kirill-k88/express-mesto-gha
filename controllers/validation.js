const validator = require('validator');

const customError = new Error();

module.exports.handleError = (err, res) => {
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
  if (err.name === 'LoginError') {
    return res.status(401).send({
      message: 'Неправильные почта или пароль',
    });
  }
  if (err.name === 'NoRightsError') {
    return res.status(401).send({
      message: 'Нет прав на совершение действия',
    });
  }
  console.log(err.name);
  return res.status(500).send({ message: 'На сервере произошла ошибка' });
};

module.exports.checkResult = (data, res) => {
  if (!data) {
    customError.name = 'CastError';
    return Promise.reject(customError);
  }
  return res.send(data);
};

module.exports.checkId = (id) => {
  const regexp = /[a-z0-9]{24}/;
  if (!regexp.test(id)) {
    customError.name = 'ValidationError';
    return Promise.reject(customError);
  }
  return Promise.resolve();
};

module.exports.checkEmail = (body) => {
  customError.name = 'ValidationError';
  if (!('email' in body)) return Promise.reject(customError);
  if (!validator.isEmail(body.email)) return Promise.reject(customError);

  return Promise.resolve();
};
