const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const {
  SERVER_PORT = 3000,
  MONGODB_CONNECTION = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

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

//  Временная имитация передачи id пользователя
app.use('/', (req, res, next) => {
  req.user = {
    _id: '64ad2a7755a84ce9665669e6',
  };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

//  Если задан маршрут, на который нет соответствующего endpoint
app.use((req, res, next) => {
  res.status(404).send({ message: 'Такого маршрута не существует' });
  next();
});

app.listen(SERVER_PORT, (err) => {
  if (err) {
    console.log(`Ошибка подписки на порт. Ошибка:${err}`);
  }
  console.log('Подключились к порту: ', SERVER_PORT);
});
