const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const customError = new Error();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    select: false,
  },
});

userSchema.plugin(uniqueValidator);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        customError.name = 'LoginError';
        return Promise.reject(customError);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          customError.name = 'LoginError';
          return Promise.reject(customError);
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
