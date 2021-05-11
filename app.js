
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')

const indexRouter = require('./routes/index');
const authRouter = require('./routes/users');

mongoose
  .connect('mongodb://localhost:27017/digital-commerces', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to DB 🚀');
  })
  .catch(error => {
    console.log('error ', error);
  });


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/digital-commerces',
      // mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60,
    }),
    secret: 'Digitalcommerces', // should be inside .env
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

app.use('/', indexRouter);
app.use('/', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

