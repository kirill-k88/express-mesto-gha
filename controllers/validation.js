const validator = require('validator');
const bcrypt = require('bcryptjs');

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

module.exports.checkEmail = (email) => {
  if (!validator.isEmail(email)) {
    customError.name = 'ValidationError';
    return Promise.reject(customError);
  }
  return Promise.resolve();
};

module.exports.checkUser = (password, user) => {
  if (!user) {
    customError.name = 'ValidationError';
    return Promise.reject(customError);
  }
  return bcrypt.compare(password, user.password);
};

module.exports.checkPassword = (matched, user) => {
  if (!matched) {
    customError.name = 'ValidationError';
    return Promise.reject(customError);
  }
  return Promise.resolve('успешный вход');
};
