const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const usersRouter = require('./routes/users');

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb', {})
  .then(() => {
    console.log('Подключился к MongoDB');
  })
  .catch((err) => {
    console.log(`Не удалось подключиться к MongoDB. Ошибка:${err}`);
  });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', usersRouter);

app.listen(PORT, () => {});
