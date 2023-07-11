const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const {
  SERVER_PORT = 3000,
  MONGODB_CONNECTION = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

const usersRouter = require('./routes/users');

mongoose
  .connect(MONGODB_CONNECTION, {})
  .then(() => {
    console.log('Подключился к MongoDB:', MONGODB_CONNECTION);
  })
  .catch((err) => {
    console.log(`Не удалось подключиться к MongoDB. Ошибка:${err}`);
  });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', usersRouter);

app.listen(SERVER_PORT, (err) => {
  if (err) {
    console.log(`Ошибка подписки на порт. Ошибка:${err}`);
  }
  console.log('Подключились к порту: ', SERVER_PORT);
});
