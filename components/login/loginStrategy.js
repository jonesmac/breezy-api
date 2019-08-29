const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../users');

module.exports = {
  setupPassport: function () {
    passport.use(new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        const currentUser = await User.findOne({ where: { email } })
        if (currentUser.id) {
          const passwordMatch = await currentUser.verifyPassword(password);
          return passwordMatch ? 
            done(null, currentUser) :
            done(null, false, { message: 'Invalid credentials.\n' });
        } else {
          return done(null, false, { message: 'Invalid credentials.\n' });
        }
      }
    ));

    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      const user = User.findOne({ where: { id } });
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