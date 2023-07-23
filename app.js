const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const {
  SERVER_PORT = 3000,
  MONGODB_CONNECTION = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { createUser, login } = require('./controllers/users');

const auth = require('./middlewares/auth');

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
/* app.use('/', (req, res, next) => {
  req.user = {
    _id: '64ad2a7755a84ce9665669e6',
  };
  next();
}); */

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

//  Если запрошен endpoint, на который нет соответствующего роута
app.use((req, res, next) => {
  res.status(404).send({ message: 'был запрошен несуществующий роут' });
  next();
});

app.listen(SERVER_PORT, (err) => {
  if (err) {
    console.log(`Ошибка подписки на порт. Ошибка:${err}`);
  }
  console.log('Подключились к порту: ', SERVER_PORT);
});
