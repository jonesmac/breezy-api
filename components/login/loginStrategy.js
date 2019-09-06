const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../users');

module.exports = {
  setupPassport: function () {
    passport.use(new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const currentUser = await User.findByEmail(email);
          const passwordMatch = await currentUser.verifyPassword(password);
          passwordMatch ? 
            done(null, currentUser) :
            done(null, false, { message: 'Invalid credentials.\n' });
        } catch (e) {
          done(null, false, { message: 'Invalid credentials.\n' });
        }
      }
    ));

    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      const user = User.find(id);
      user
        .then(currentUser => done(null, currentUser))
        .catch(err => done(null, false, { message: 'User not found' }))
    });
  },
  addPassport: function (app) {    
    app.use(passport.initialize());
    app.use(passport.session());
  }
};