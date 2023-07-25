const NotFoundError = require('./NotFoundError');
const ForbiddenError = require('./forbiddenError');

module.exports.checkResult = (data, res) => {
  if (!data) {
    return Promise.reject(
      new NotFoundError('Данных по указанному _id не найдено'),
    );
  }
  return res.send(data);
};

module.exports.checkDeleteCardResult = (data, res) => {
  if (!data) {
    return Promise.reject(
      new ForbiddenError(
        'Карточки по указанному _id не найдено либо нет прав на ее удаление ',
      ),
    );
  }
  return res.send(data);
};
