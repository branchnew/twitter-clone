const express = require('express');
const createError = require('http-errors');

const usersRouter = require('./src/routes/users');
const tweetsRouter = require('./src/routes/tweets');

const app = express();

// body-parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/users', usersRouter);
app.use('/tweets', tweetsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, 'Page not found'));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
