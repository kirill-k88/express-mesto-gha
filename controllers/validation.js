const NotFoundError = require('./NotFoundError');
const ForbiddenError = require('./ForbiddenError');

module.exports.checkDeleteCardResult = (data) => {
  if (!data) {
    return Promise.reject(
      new ForbiddenError(
        'Карточка по указанному _id принадлежит другому пользователю',
      ),
    );
  }
  return data;
};

module.exports.checkResult = (data) => {
  if (!data) {
    return Promise.reject(
      new NotFoundError('Данных по указанному _id не найдено'),
    );
  }
  return data;
};
