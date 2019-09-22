const dotenv = require('dotenv');

if (process.env && process.env.NODE_ENV) {
  dotenv.config({path: '.env.' + process.env.NODE_ENV});
} else {
  dotenv.config({path: '.env.local'});
}

// Connect the db and models
require('./config/db').connect();
require('./models');

// Catch Uncaught Exceptions
require('./config/globalErrorHandler')();

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
const locationsRouter = require('./components/locations/locationApi');

// Import Middleware
const auth = require('./util/auth');

// Third Party Express Setup
const app = express();
const corsOptions = {
  credentials: true,
  origin: process.env.CORS_ALLOWED_ORIGIN,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(parseJSON());
app.use(cookieParser());

// Custom Express Setup
require('./config/session').addSessions(app);
strategy.addPassport(app);
require('./config/graphql')(app);

// Wire up Routes to Express
app.use('/api/v1/login', loginRouter);
app.use('/api/v1/users', [auth], usersRouter);
app.use('/api/v1/locations', [auth], locationsRouter);
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
