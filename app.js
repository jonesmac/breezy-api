if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Connect the db and models
require('./config/db').connect();
require('./models');

// Third Party Express Imports
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const parseJSON = require('express').json;
const strategy = require('./components/login/loginStrategy');
strategy.setupPassport();

// Import Routes
const usersRouter = require('./components/users/usersAPI');
const loginRouter = require('./components/login/loginAPI');

// Third Party Express Setup
const app = express();
app.use(logger('dev'));
app.use(parseJSON());
app.use(cookieParser());

// Custom Express Setup
require('./config/session').addSessions(app);
strategy.addPassport(app);

// Wire up Routes to Express
app.use('/api/v1/users', cors(), usersRouter);
app.use('/api/v1/login', cors(), loginRouter);
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
