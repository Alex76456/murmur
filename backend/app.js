require('dotenv').config();
const express = require('express');
// const cors = require('cors');
// const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
// const CorsError = require('./errors/cors-error');
// const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const { centralizedErrorHandler } = require('./middlewares/centralizedErrorHandler');

const { PORT = 3000 } = process.env;

// const whitelist = [
//   'http://localhost:3000',
// ];
// const corsOptions = {
//   origin(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new CorsError('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
//   allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
//   credentials: true,
// };

// Защита от DoS-атак. Ограничитель запросов.
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
// });

const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/murmur', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const validateUserSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().pattern(/[\wа-я\sё]{2,30}/i),
    about: Joi.string().pattern(/[\wа-я\sё]{2,30}/i),
    avatar: Joi.string().pattern(/^https?:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&\/=]*)?/i),
    email: Joi.string().email().required(),
    link: Joi.string().pattern(/^@[-a-zA-Z0-9]{1,10}/i),
    password: Joi.string().required(),
  }),
});

const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
  }),
});

// app.use(cors(corsOptions));
// app.use(helmet());
// Отметил, что добавление helmet ломает политику CORS. Возникает ошибка.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser);
// app.use(requestLogger);
// app.use(limiter);
app.post('/signin', validateUserLogin, login);
app.post('/signup', validateUserSignup, createUser);

app.use(auth);

app.use(router);

// app.use(errorLogger);
app.use(errors());
app.use(centralizedErrorHandler);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
