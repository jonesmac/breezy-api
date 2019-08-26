const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../users');

module.exports = {
  setupPassport: function () {
    passport.use(new LocalStrategy(
      { usernameField: 'email' },
      (email, password, done) => {
        User.findOne({ where: { email } })
          .then(foundUser => {
            // TODO move to hash passwords and verifyPassword method on user model
            if (foundUser.password === password) {
              return done(null, foundUser)
            } else {
              return done(null, false, { message: 'Invalid credentials.\n' });
            }
          })
          .catch(err => {
            return done(null, false, { message: 'Invalid credentials.\n' });
          });
      }
    ));

    passport.serializeUser((user, done) => {
      console.log('Inside serializeUser callback. User id is save to the session file store here');
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      console.log('Inside deserializeUser callback')
      console.log(`The user id passport saved in the session file store is: ${id}`)
      const user = User.findOne({ where: { id }});
      user
        .then(foundUser => done(null, foundUser))
        .catch(err => done(null, false, { message: 'User not found' }))
    });
  },
  addPassport: function (app) {    
    app.use(passport.initialize());
    app.use(passport.session());
  }
};