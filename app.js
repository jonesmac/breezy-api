if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Connect the db
require('./config/db').connect();

// Third Party Express Imports
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// Import Routes
const usersRouter = require('./components/users/usersAPI');

// Third Party Express Setup
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Custom Express Setup
require('./config/session').addSessions(app);

// Wire up Routes to Express
app.use('/api/v1/users', cors(), usersRouter);
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
