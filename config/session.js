const session = require('express-session');
const uuid = require('uuid/v4');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./db').sequelize;

const store = new SequelizeStore({
  db: sequelize
});

module.exports = {
  addSessions: (app) => {
    app.use(session({
      genid: (req) => {
        console.log('Inside the session middleware');
        console.log(req.sessionID);
        return uuid();
      },
      secret: process.env.SESSION_SECRET,
      store,
      resave: false,
      saveUninitialized: true
    }))
    
    store.sync();
  }
}